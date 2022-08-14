import { KVStore } from '../src'

describe('KVStore', () => {
    async function testStore() {
        return KVStore.create('foo')
    }

    [
        'a string',
        123,
        null,
        undefined,
        {an: 'object'},
        ['an', {array: 'of things'}],
    ].forEach(value => it('should set and get a value', async () => {
        const store = await testStore()
        const key = 'key-1'

        await store.set(key, value)

        expect(await store.get(key)).to.eql(value)
    }))

    it('should override same key', async () => {
        const store = await testStore()
        const key = 'key-2'

        await store.set(key, 'value 1')
        await store.set(key, 'value 2')

        expect(await store.get(key)).to.be('value 2')
    })

    it('should return undefined when unknown key', async () => {
        const store = await testStore()

        expect(await store.get('unknown key')).to.be(undefined)
    })
})
