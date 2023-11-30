import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  let mongo: MongoMemoryServer
  beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    await sut.connect(uri)
  })

  afterAll(async () => {
    await sut.disconnect()
    await mongo.stop()
  })

  test('Should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
