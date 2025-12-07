---
title: Install Kosh
description: How to install Kosh, the local-first encrypted password manager.
---

:::note[Prerequisites]
- Go **1.24+**
:::

Kosh can be installed in two ways:

1. **Using `go install`** (recommended)  
2. **Building from source**

---

## Using Go Install (Recommended)

The quickest way to install Kosh is:

```bash
go install github.com/gitKashish/kosh@latest
````

This installs the `kosh` binary into your Go bin directory (usually `~/go/bin`).
Make sure this directory is part of your `PATH`.

If it isn’t, add it manually:

```bash
export PATH="$PATH:$(go env GOPATH)/bin"
```

---

## Install from Source

If you want to build Kosh manually or modify the code:

```bash
git clone https://github.com/gitKashish/kosh.git
cd kosh
go build
```

This will produce a `kosh` binary in the project root for your current platform.

---

## Verify Installation

Run:

```bash
kosh help
```

If the installation was successful, you should see:

```text
kosh help                 Show help and usage
kosh init                 Initialize a new encrypted vault
kosh add                  Add or update a credential
kosh list                 List credentials
kosh get <label> <user>   Retrieve a credential
kosh search <query>       Adaptive fuzzy search
kosh delete <id>          Delete a credential
```

---

Kosh is now ready to use!

