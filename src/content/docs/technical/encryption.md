---
title: Encryption Architecture
description: techincal documenation highlight the cryptographic structure flow used.
---

Kosh uses a modern, hybrid encryption model combining **Argon2id**, **Curve25519 ECDH**, and **ChaCha20-Poly1305 AEAD**.
This design ensures that stored credentials are encrypted securely, with forward secrecy properties for every entry.

Kosh separates encryption into two distinct layers:

1. **Vault Encryption** — protects the vault metadata using a *master password*.
2. **Credential Encryption** — each stored entry uses an *ephemeral asymmetric key pair* to derive a unique per-entry symmetric key.

This provides:

* Strong master password protection
* Forward secrecy (one leaked credential key doesn’t compromise others)
* No long-term symmetric key stored on disk
* Modern cryptographic primitives only

This document explains how keys are derived, how secrets are encrypted, and how decryption happens during retrieval.

---

## 1. Master Password Derivation (Argon2id)

The master password is never used directly.
Instead, it is fed into **Argon2id**, a memory-hard KDF:

```go
func GenerateSymmetricKey(secret, salt []byte) []byte {
    return argon2.IDKey(secret, salt, keyTime, keyMemory, keyThreads, keyLength)
}
```

Parameters:

| Parameter     | Value      |
| ------------- | ---------- |
| Time cost     | `1`        |
| Memory cost   | `64 MB`    |
| Threads       | `4`        |
| Output length | `32 bytes` |

Argon2id defends against GPU brute force attacks.
The vault stores:

* The **salt**
* An encrypted “vault secret”
* A **nonce**

During unlock (`kosh add`, `kosh get`, etc.), Kosh regenerates this key and attempts to decrypt the vault secret to verify correctness.

---

## 2. Asymmetric Encryption for Credentials (Curve25519)

Each credential uses a **fresh ephemeral key pair**:

```go
privateKey, publicKey := crypto.GenerateAsymmetricKeyPair()
```

Internally:

```go
func GenerateAsymmetricKeyPair() (privateKey, publicKey []byte) {
    privateKey = make([]byte, 32)
    rand.Read(privateKey)
    publicKey, _ = curve25519.X25519(privateKey, curve25519.Basepoint)
    return privateKey, publicKey
}
```

The vault stores a **long-term Curve25519 public key**.
To encrypt a credential:

1. Generate ephemeral private key `a`.
2. Compute shared secret `S = X25519(a, vaultPublicKey)`.
3. Hash it to a 32-byte encryption key:

```go
key := sha256.Sum256(encryptionKey)
```

This ensures constant-length key material and avoids weak shared secrets.

### Why ephemeral keys?

* Every credential gets a unique key.
* Compromise of one credential does **not** leak others.
* Vault’s private key is stored encrypted by the master password.

---

## 3. Symmetric Encryption (ChaCha20-Poly1305)

After deriving the per-credential key:

```go
cipher, nonce := crypto.EncryptSecret(key[:], []byte(secret))
```

Under the hood:

```go
aead, _ := chacha20poly1305.NewX(key)
nonce := random(aead.NonceSize())
cipher := aead.Seal(nil, nonce, secret, nil)
```

Properties:

* AEAD: encryption + authentication
* 192-bit nonce (extended variant via `NewX`)
* Safe for random nonces

Stored fields per credential:

* `Ephemeral` (public key)
* `Nonce`
* `Secret` (ciphertext)

---

## 4. Decrypting a Credential

When running:

```bash
kosh get <label> <user>
```

Steps:

1. Prompt for master password.
2. Derive unlock key with Argon2id.
3. Decrypt vault secret (verifies password).
4. Load credential: `(EphemeralPub, Nonce, Cipher)`.
5. Recompute shared secret:

```go
shared, _ := curve25519.X25519(vaultPrivateKey, EphemeralPub)
key := sha256.Sum256(shared)
```

6. Decrypt using ChaCha20-Poly1305:

```go
secret, err := aead.Open(nil, nonce, cipher, nil)
```

7. Copy plaintext password to OS clipboard.

---

## 5. Security Properties

#### Forward Secrecy

Each credential uses a unique ephemeral ECDH key pair.

#### Password Guessing Resistance

Argon2id with 64MB RAM requirement.

#### Authenticated Encryption

ChaCha20-Poly1305 prevents tampering.

#### No Long-Term Symmetric Keys

Only the vault’s private key is stored, encrypted with the master password.

#### Offline Always

No external APIs; no key material leaves the device.

---

## 6. Stored Encryption Metadata Summary

| Layer      | Stored Data                                           | Purpose                                        |
| ---------- | ----------------------------------------------------- | ---------------------------------------------- |
| Vault      | `Salt`, encrypted `Secret`, `Nonce`, vault public key | Master password verification & vault unlocking |
| Credential | `Ephemeral`, `Nonce`, `Secret`                        | Per-credential encryption using ephemeral ECDH |

---

## 7. Threat Model Summary

Kosh assumes:

* Attacker has full access to the vault file
* Attacker **cannot** guess master password within feasible time
* System clipboard is trusted (OS-level)
* User’s runtime environment is not compromised (no keyloggers or debugging injection)
