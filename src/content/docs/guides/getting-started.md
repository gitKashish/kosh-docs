---
title: Getting Started
description: A guide for new users to quickly set up and start using the Kosh CLI.
---

Kosh is a **local-first**, **end-to-end encrypted**, and **offline-only** CLI password manager.  
You own your data — nothing ever leaves your machine.

---

## Quick Start

After installing `kosh`, the first step is to initialize your encrypted vault and set a master password.

If you haven’t installed Kosh yet, follow the [installation guide](/guides/installation).

---

### Initialize Your Encrypted Vault

Create a new encrypted SQLite vault in your current directory:

```bash
kosh init
````

You’ll be prompted to create a **master password**, which is used to derive your encryption key using **Argon2id**.
