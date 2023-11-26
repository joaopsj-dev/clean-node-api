import { type ObjectId } from 'mongodb'
import { type AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { type AccountModel } from '../../../../domain/models/account'
import { type AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const { insertedId } = await accountCollection.insertOne(accountData)
    const { _id, ...accountWithoutId } = await accountCollection.findOne<{ _id: ObjectId } & Omit<AccountModel, 'id'>>({ _id: insertedId })
    const account: AccountModel = {
      id: _id.toHexString(),
      ...accountWithoutId
    }
    return new Promise(resolve => resolve(account))
  }
}
