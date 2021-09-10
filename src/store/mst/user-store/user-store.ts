import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { UserInvite, UserInviteModel } from './user-models'
import { withEnvironment } from '../extensions/with-environment'
import * as actions from './user-actions'

export const UserStoreModel = types
  .model('UserStore')
  .props({
    alias: types.optional(types.string, ''),
    authToken: types.optional(types.string, 'EOqzXhndpa9XyMcCUAPK'),
    // authToken: types.optional(types.string, ''),
    code: types.optional(types.string, ''),
    currentIP: types.optional(types.string, 'http://box-5.arcade.city:3001'),
    invite: types.optional(UserInviteModel, {}),
    // currentIP: types.optional(types.string, ''),
    myid: types.optional(types.number, 1),
    // myid: types.maybeNull(types.number),
    publicKey: types.optional(types.string, ''),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    finishInvite: async (): Promise<boolean> =>
      await actions.finishInvite(self as UserStore),
    generateToken: async (pwd: string): Promise<string> =>
      await actions.generateToken(self as UserStore, pwd),
    signupWithCode: async (code: string): Promise<ArrayObject> =>
      await actions.signupWithCode(self as UserStore, code),
    signupWithIP: async (ip: string): Promise<string | null> =>
      await actions.signupWithIP(self as UserStore, ip),
    setAuthToken: (authToken: string) => {
      self.authToken = authToken
    },
    setAlias: (alias: string) => {
      self.alias = alias
    },
    setCurrentIP: (ip: string) => {
      self.currentIP = ip
    },
    setInvite: (invite: UserInvite) => {
      self.invite = invite
    },
    setMyID: (id: number) => {
      self.myid = id
    },
  }))

type ArrayObject = { [k: string]: string }
type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserStoreDefaultModel = () =>
  types.optional(UserStoreModel, {})
