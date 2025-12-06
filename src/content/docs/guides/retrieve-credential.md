---
title: Retrieve Your Credentials
---
In kosh retrieving a credential always refers to decrypting a store credential using the vault's master password and
copying it to the system clipboard.
### Retrieve a Credential

```bash
kosh get github pluto
```
You will prompted to enter the master password. On entering the correct master password, 
kosh decrypts and copies the password to your clipboard.

---

### Search Your Vault

Use adaptive fuzzy search:

```bash
kosh search git
```

Or the shorthand:

```bash
kosh git
```

Searches *both* label and user, weighted by recency, frequency, and fuzzy match score.
On finding a good enough match it will prompt you for master password to decrypt and copy the credential to your clipboard.

---