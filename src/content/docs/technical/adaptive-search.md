---
title: Kosh Adaptive Search Algorithm
description: A deterministic, weighted fuzzy-retrieval engine for credentials
---

Kosh provides a custom **Adaptive Search Algorithm** designed to return the most relevant credential based on how users naturally search: by label, by username, or both.
It combines **fuzzy string matching**, **recency decay**, and **frequency weighting** in a single scoring pipeline.

The goal is simple:
**Find the credential the user *most likely* wants, without requiring exact matching.**

---

The search system ranks all credentials in the vault using four independent feature classes:

| Feature                  | Description                                             | Weight |
| ------------------------ | ------------------------------------------------------- | ------ |
| **String match (label)** | Fuzzy match between `queryLabel` and credential label   | 0.60   |
| **String match (user)**  | Fuzzy match between `queryUser` and credential username | 0.20   |
| **Recency**              | How recently the credential was accessed                | 0.12   |
| **Frequency**            | How often the credential has been accessed              | 0.05   |

After computing the weighted score, all credentials are sorted descending and the **best match** is selected if it clears a minimum threshold (`0.2`).

The system is deterministic, fast, and independent of database indexing behavior.

## 1. Query Modes

### **Single-argument search**

```bash
kosh search git
# or
kosh git
```

* The argument is treated as the **label query**.
* The algorithm compares it against:

  * label
  * user (also considered, but with lower weighting)

### **Two-argument search**

```bash
kosh search github personal
```

* First argument → label query
* Second argument → user query

This allows structured filtering such as targeting specific accounts under the same label (`github work`, `github personal`, etc.)

## 2. Scoring Model

The scoring of a credential is:

```
TOTAL_SCORE =
    LABEL_WEIGHT * labelScore +
    USER_WEIGHT  * userScore +
    RECENCY_WEIGHT * recencyScore +
    FREQUENCY_WEIGHT * frequencyScore
```

Where each component is a normalized value ∈ [0, MAX_STRING_SCORE].

## 3. String Matching

### Fuzzy Match Score

For each of label/user:

```go
labelScore = stringScore(queryLabel, label)
userScore  = stringScore(queryUser, user)
```

`stringScore()` evaluates relevance using:

1. **Exact match → MAX_STRING_SCORE (5.0)**
2. **Levenshtein similarity**

   * Converted to normalized similarity:

     ```
     similarity = 1 - (lev(query, target) / maxLen)
     ```
3. **Prefix and substring boosts**

   * `+1.0` if target starts with query
   * `+0.5` if target contains query anywhere
4. Final score is **clamped to MAX_STRING_SCORE**

This makes Kosh robust to common user behaviors:

* Mistyped queries (`githb`)
* Partial queries (`git`)
* Cross-field behavior (`git` matching username)

## 4. Recency Scoring

Recent credentials should rank higher.
Kosh uses a **quick-decay function** with ~12h half-life:

```
recency = 1 / (1 + hoursSinceLastAccess / 12)
```

Properties:

* Zero for never-used items
* Drops quickly with time
* Ensures daily-use credentials rise automatically

## 5. Frequency Scoring

Frequently used credentials should rank higher.

```
frequency = log(accessCount + 1) / 5
```

This provides:

* Fast growth early (1 → 2 → 3 → 5 uses)
* Flattening later (logarithmic), preventing spam dominance

## 6. Thresholding and Sorting

Only results with score ≥ `0.2` are considered.

Sorting priority:

1. **Higher score first**
2. If tied → higher access count
3. If still tied → lexicographically smaller label

Ensures stability and predictability of results.

## 7. Complexity

For *N* credentials:

```
O(N * L) time
```


Where *L* is the max label/user string length.

Given typical vault sizes (tens–hundreds of entries), this is effectively **instantaneous**.

## 8. Example Flow

Search request:

```bash
kosh git
```

Algorithm executes:

1. Lowercase normalize `git`
2. For each credential:

   * compute stringScore("git", label)
   * compute stringScore("git", user)
   * compute recencyScore
   * compute frequencyScore
3. Combine weighted score
4. Discard results < threshold
5. Sort remaining by score/frequency/label
6. Return best match

If the user accepts, the credential is:

* Decrypted using Curve25519-derived key
* Copied to clipboard
* Frequency +1
* Updated `accessed_at=now`

## 9. Why This Algorithm Works Well

* **More intelligent than substring search**
  Handles typos, partial queries, and score-based ranking.
* **Respects human usage patterns**
  Items you used recently appear first automatically.
* **Deterministic and predictable**
  Same inputs → same outputs.
* **No reliance on external libraries**
  Fully implemented in Go for portability.
