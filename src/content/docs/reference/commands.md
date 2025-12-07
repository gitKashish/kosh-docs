---
title: Command Reference
description: A reference documentation to all the kosh commands.
---

Kosh provides a small, focused set of commands designed for secure, local-first credential management.
This page documents all CLI commands, their arguments, behaviors, and examples.


| Command                                | Purpose                          |
| -------------------------------------- | -------------------------------- |
| `kosh help`                            | Show help and usage              |
| `kosh init`                            | Initialize a new encrypted vault |
| `kosh add`                             | Add or update a credential       |
| `kosh list`                            | List stored credentials          |
| `kosh get <label> <user>`              | Retrieve (decrypt) a credential  |
| `kosh search <query>` / `kosh <query>` | Adaptive fuzzy search            |
| `kosh delete <id>`                     | Permanently delete a credential  |

---

## `kosh help`

Display help, available commands, and usage details.

```bash
kosh help
```

---

## `kosh init`

Initialize a new encrypted SQLite vault in the current directory.

```bash
kosh init
```

**Prompts you for:**

* Master password (used to derive your encryption key via Argon2id)

**Notes:**

* The vault is created as a local SQLite file.
* Master password **cannot be changed** after initialization.

---

## `kosh add`

Add a new credential or update an existing one.

```bash
kosh add
```

**Interactive prompts:**

* Label
* Username
* Password (hidden input)
* Confirm password

If a credential with the same *label + username* already exists, it will be securely **overwritten**.

---

## `kosh list`

List credentials stored in the vault.

#### List all entries

```bash
kosh list
```

#### Substring filter

```bash
kosh list github
```

Matches label or user via simple substring matching.

#### Field-specific filters

```bash
kosh list --label github
kosh list --user pluto
```

#### Combined filters

```bash
kosh list --label github --user pluto
```

Shows entries where **both** label and user contain the given substrings.

---

## `kosh get <label> <user>`

Retrieve (decrypt) a credential by exact match.

```bash
kosh get github pluto
```

**Behavior:**

1. Prompts for master password.
2. Decrypts the credential.
3. Copies the password to your clipboard.

---

## `kosh search <query>`
#### Single-Argument Search
Search your vault using Kosh’s adaptive fuzzy matching.

```bash
kosh search git
```

Or use the shorthand:

```bash
kosh git
```

**Searches across:**

* Label
* Username

Returns the **best-scoring** match based on fuzzy distance, prefix/substr boosts, recency, and usage frequency.

#### Two-Argument Search

Provide separate fuzzy queries for label and user:

```bash
kosh search github pluto
kosh search mail personal
```

Equivalent to fuzzy-matching both fields independently.

---

## `kosh delete <id>`

Permanently delete a credential from the vault.

```bash
kosh delete 42
```

**Process:**

1. Prompts for master password
2. Shows the exact credential to be deleted
3. Requires a typed confirmation phrase (`delete <label> <user>`)
4. Securely deletes the row and overwrites freed memory

**Warning:** Deletion is **irreversible**.

---

## Exit Codes

Kosh uses standard exit code conventions:

* `0` – success
* `1` – general errors
* `2` – invalid arguments
* `3` – authentication failure (incorrect master password)
* `4` – vault not found

---

## Environment Notes

* Clipboard handling is platform-specific but abstracted away internally.
* Vault is always local; Kosh never performs any network requests.
* Works on Linux, macOS, and Windows.
