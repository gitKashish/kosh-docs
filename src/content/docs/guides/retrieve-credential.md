---
title: Retrieve Your Credentials
description: How to decrypt and retrieve credentials using Kosh.
---

In Kosh, *retrieving a credential* means securely decrypting a stored entry using your master password and copying the password to your system clipboard.

Kosh provides **two ways** to retrieve credentials:

1. **Exact match retrieval** using `kosh get`  
2. **Adaptive fuzzy search** using `kosh search` (default command)

---

## Retrieve a Credential (Exact Match)

Use `kosh get` when you know the exact **label** and **username**:

```bash
kosh get github pluto
````

You’ll be prompted for your master password.
Once verified, Kosh decrypts the stored password and copies it directly to your clipboard.

This is the fastest option when you know exactly what you’re looking for.

---

## Search Your Vault (Fuzzy Retrieval)

If you don’t remember the exact label or username, use Kosh’s adaptive fuzzy search:

```bash
kosh search git
```

Or simply use the shorthand:

```bash
kosh git
```

Search works across **both** label and username fields.
It returns the best-matching entry based on Kosh’s adaptive ranking algorithm.

You will then be prompted for your master password, and the matched credential will be decrypted and copied to your clipboard.

---

## Two-Argument Search

You can also provide separate fuzzy queries for the label and username:

```bash
kosh search mail personal
```

or:

```bash
kosh search github pluto
```

Kosh treats the first argument as the **label query** and the second as the **user query**, applying fuzzy matching to both.

---

## About the Adaptive Search

Kosh’s search is powered by a custom ranking algorithm that considers:

* Fuzzy match quality (Levenshtein distance)
* Prefix / substring boosts
* Recent usage
* Frequency of access

The highest-scoring entry is returned first.

*A detailed explanation of the scoring algorithm can be found in the dedicated Search Algorithm section.*
