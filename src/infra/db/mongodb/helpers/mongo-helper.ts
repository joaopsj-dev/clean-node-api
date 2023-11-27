import { MongoClient, type Document, type WithId } from 'mongodb'

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

  async getCollection (name: string): Promise<any> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map (collection: WithId<Document>): any {
    const { _id, ...accountWithoutId } = collection
    return {
      id: _id.toHexString(),
      ...accountWithoutId
    }
  }
}
