---
title: Getting Started
description: A guide for new users to quickly setup and start using kosh cli.
---

Kosh is a **local-first**, **end-to-end encrypted**, **offline-only** CLI password manager.  
You own your data — nothing leaves your machine.

---
## Quick Start

After installing `kosh` we first have to setup a master password by initializing the vault, as follow:

### Initialize Your Encrypted Vault

Create a new encrypted SQLite vault in your current directory:

```bash
kosh init
```

You’ll be prompted for a **master password** which derives your encryption key using **Argon2id**.

:::caution
Once master password is setup it cannot be changed in anyway. If you forget your master password all the stored
are forever encrypted and inaccessible. Thus, it is highly recommended to **note down you master password and keep it
somewhere safe**.
:::