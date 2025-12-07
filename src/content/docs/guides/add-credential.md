---
title: Adding Your First Credential
description: A guide to adding credentials after vault initialization.
---

## Add a Credential Interactively

To add your first credential, run:

```bash
kosh add
````

You’ll be prompted for:

* **Label** (example: `github`)
* **Username**
* **Password** (hidden input)
* **Confirm Password** (hidden input)

---

## Updating an Existing Entry

If a credential already exists with the same label and username, simply run:

```bash
kosh add
```

Enter the same label and username again — Kosh will securely **update (overwrite)** the existing entry.
