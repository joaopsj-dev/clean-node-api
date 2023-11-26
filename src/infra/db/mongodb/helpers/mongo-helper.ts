import { MongoClient, type Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string) {
    this.client = await MongoClient.connect(uri, {
      retryWrites: true,
      w: 'majority'
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  async clear () {
    const collections = await this.client.db().collections()

    for (const collection of collections) {
      await collection.deleteMany();
    }
  }
}
