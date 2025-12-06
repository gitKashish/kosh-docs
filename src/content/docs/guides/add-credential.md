---
title: Adding Your First Credential
description: A guide to add a credential after vault initialization.
---

## Add a credential interactively
```bash
kosh add
```

You’ll be prompted for:

- Label (example: github)
- Username
- Password (hidden input)
- Confirm Password (hidden input)

## Overwriting / Updating an Entry
If a credential already exists, simply run:
```bash
kosh add
```
Select the same label and username — Kosh will update / override the existing entry securely.