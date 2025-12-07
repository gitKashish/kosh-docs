---
title: List and Manage Credentials
description: Learn how to list, filter, and delete stored credentials in Kosh.
---

## List Stored Credentials

To view everything in your vault:

```bash
kosh list
````

You can also list credentials using fuzzy filters:

```bash
kosh list github
```

Or use more precise field filters:

```bash
kosh list --label github
kosh list --user pluto
kosh list --label github --user pluto
```

These filters apply substring-based matching on labels and usernames.

---

## Delete a Stored Credential

To remove a credential, use its **ID** (visible in `kosh list`):

```bash
kosh delete 42
```

You will be prompted to:

1. Enter your **master password**, and
2. Type a confirmation phrase (e.g., `delete <label> <user>`) to finalize deletion.

---

## What’s Next?

* Browse the **[Command Reference](reference/commands)**
* Learn how Kosh's **encryption system** works
* Explore the **adaptive search algorithm**
* Understand the **SQLite vault design**
