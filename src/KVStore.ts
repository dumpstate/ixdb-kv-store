const VERSION = 1
const KV_STORE_NAME = 'kv_pairs'

function ixdb() {
    if (typeof window != 'undefined') {
        return window.indexedDB
    }

    if (typeof self != 'undefined') {
        return self.indexedDB
    }

    throw Error('Unable to acquire IndexedDB')
}

export class KVStore {
    private db: IDBDatabase

    private constructor(db: IDBDatabase) {
        this.db = db
    }

    public static async create(name: string): Promise<KVStore> {
        return new Promise<KVStore>((resolve, reject) => {
            const req = ixdb().open(name, VERSION)

            req.onerror = (evt) => {
                reject(new Error(`IndexedDB error: ${(evt?.target as any)?.errorCode}`))
            }

            req.onsuccess = (evt) => {
                const db: IDBDatabase = (evt?.target as any)?.result

                if (!db) {
                    reject(new Error('Failed to instantiate IndexedDB'))
                } else {
                    resolve(new KVStore(db))
                }
            }

            req.onupgradeneeded = (evt) => {
                const db: IDBDatabase = (evt?.target as any)?.result

                db.createObjectStore(KV_STORE_NAME)
            }
        })
    }

    public static async tryCreate(name: string): Promise<KVStore | null> {
        try {
            const kvStore = await KVStore.create(name)

            return kvStore
        } catch (err) {
            console.error('Can\'t use IndexedDB')

            return null
        }
    }

    get<T = any>(key: string): Promise<T> {
        const store = this.db
            .transaction(KV_STORE_NAME, 'readonly')
            .objectStore(KV_STORE_NAME)

        return new Promise<T>((resolve, reject) => {
            const req = store.get(key)

            req.onsuccess = () => {
                resolve(req.result)
            }

            req.onerror = (evt) => {
                reject(new Error(`Failed to fetch from IndexedDB: ${(evt?.target as any)?.errorCode}`))
            }
        })
    }

    set<T = any>(key: string, value: T): Promise<void> {
        const store = this.db
            .transaction(KV_STORE_NAME, 'readwrite')
            .objectStore(KV_STORE_NAME)

        return new Promise<void>((resolve, reject) => {
            const req = store.put(value, key)

            req.onsuccess = () => resolve()

            req.onerror = (evt) => {
                reject(new Error(`Failed to persist in IndexedDB: ${(evt?.target as any)?.errorCode}`))
            }
        })
    }
}
