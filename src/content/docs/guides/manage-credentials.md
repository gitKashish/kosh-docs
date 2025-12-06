---
title: List and Manage Credentials
description: Guide to manage your stored credentials.
---

## List Store Credentials

List everything:

```bash
kosh list
```

List by fuzzy filter:

```bash
kosh list github
```

## Delete Stored Credential

```bash
kosh delete 42
```

You will be then prompted to write a confirmation text to affirm your decision to delete the credential.
:::caution
When you delete a credential in Kosh, it is permanently and irreversibly removed.
The entry is wiped from the encrypted database, and the freed memory is securely overwritten to prevent any possibility of recovery.
:::

## What’s Next?

* Read the **Command Reference**
* Learn how the **encryption system** works
* Explore the **adaptive search scoring**
* Understand the **SQLite vault design**
