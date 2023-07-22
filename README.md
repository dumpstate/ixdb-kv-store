# ixdb-kv-store

IndexedDB API is hard to work with. Key-Value store-like wrapper to make it super easy.

## Installation

Package is published to GitHub Packages NPM registry. Add to your `.npmrc`:

```
@dumpstate:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=<GITHUB_TOKEN_WITH_READ_PACKAGES_SCOPE>
```

install package:

```sh
npm install @dumpstate/ixdb-kv-store --save
```

## Usage

Create the store:

```ts
const store = await KVStore.create("my_store")
```

add values:

```ts
await store.set("a-key", "a-value")
```

fetch values by key:

```ts
await store.get("a-key")
```
