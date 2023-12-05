import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoHelper } from '../helpers/mongo-helper'
import { type Collection } from 'mongodb'
import { LogMongoRepository } from './log'

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository()
}

describe('Log Mongo Repository', () => {
  let mongo: MongoMemoryServer
  let errorCollection: Collection
  beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();
    await MongoHelper.connect(uri)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
    await mongo.stop()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.logError('any_error')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
