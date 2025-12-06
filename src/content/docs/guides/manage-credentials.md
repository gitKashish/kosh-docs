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
Deleted credentials can in no way be recovered. They are wiped completely of the database, and for security the freed up
memory is re-written with 0s.
:::

## What’s Next?

* Read the **Command Reference**
* Learn how the **encryption system** works
* Explore the **adaptive search scoring**
* Understand the **SQLite vault design**
