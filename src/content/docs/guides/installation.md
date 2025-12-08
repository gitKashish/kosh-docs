---
title: Install Kosh
description: How to install Kosh, the local-first encrypted password manager.
---

Kosh can be installed in three ways:

1. **Download a prebuilt binary (easiest)**
2. **Using `go install`**
3. **Building from source**

---

## Download Prebuilt Binary (Easiest)

Prebuilt binaries are available for **macOS**, **Linux**, and **Windows**.

1. Visit the releases page:  
   **https://github.com/gitKashish/kosh/releases**

2. Download the appropriate file for your platform, e.g.:

   - `kosh-vX.Y.Z-darwin-arm64` (macOS Apple Silicon)
   - `kosh-vX.Y.Z-darwin-amd64` (macOS Intel)
   - `kosh-vX.Y.Z-linux-amd64` (Linux x86_64)
   - `kosh-vX.Y.Z-linux-arm64` (Linux ARM)
   - `kosh-vX.Y.Z-windows-amd64.exe` (Windows)

3. Make it executable (macOS/Linux):

    ```bash
    chmod +x kosh-*
    ```

4. Move it somewhere in your `PATH`, for example:

   ```bash
   sudo mv kosh-* /usr/local/bin/kosh
   ```
---

## Using Go Install (Recommended for Go Users)

:::note[Prerequisites]
- Go **1.24+** — [Installation Guide](https://go.dev/doc/install)
:::

The quickest way to install Kosh is:

```bash
go install github.com/gitKashish/kosh@latest
```

This installs the `kosh` binary into your Go bin directory (usually `~/go/bin`).
Make sure this directory is part of your `PATH`:

```bash
export PATH="$PATH:$(go env GOPATH)/bin"
```

---

## Install from Source

:::note[Prerequisites]
- Go **1.24+** — [Installation Guide](https://go.dev/doc/install)
:::

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
