# ixdb-kv-store

IndexedDB API is hard to work with. Key-Value store-like wrapper to make it super easy.

## Installation

Install package:

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
