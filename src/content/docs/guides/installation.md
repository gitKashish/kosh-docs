---
title: Install Kosh
description: A guide to install kosh.
---
## Install Kosh
Kosh can be installed in two ways:

1. **Using Go Install** (recommended)  
2. **Building from source**

---

## Using Go Install (Recommended)

The simplest and fastest way to install Kosh:

```bash
go install github.com/gitKashish/kosh@latest
````

This will place the `kosh` binary in your Go bin directory (typically `~/go/bin`).
Ensure that this directory is included in your `PATH`:

```bash
export PATH="$PATH:$(go env GOPATH)/bin"
```

---

## Install From Source

If you prefer manual builds or want to modify the project:

```bash
git clone https://github.com/gitKashish/kosh.git
cd kosh
go build
```

This compiles the binary for your current platform and outputs `kosh` in the project root.

---

## Verify Installation

Run:

```bash
kosh help
```

You should see the list of available commands:

```text
kosh help               Show help and usage
kosh init               Initialize a new encrypted vault
kosh add                Add or update a credential
kosh list               List credentials
kosh get <label> <user> Retrieve a credential
kosh search <query>     Adaptive fuzzy search
kosh delete <id>        Delete a credential
```

---

Kosh is now installed!
