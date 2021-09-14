import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { withEnvironment } from '../extensions/with-environment'
import * as actions from './msg-actions'

export const MsgStoreModel = types
  .model('MsgStore')
  .props({
    lastSeen: types.optional(types.number, 0),
    messages: types.frozen(),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    getMessages: async (forceMore: boolean): Promise<any> => await actions.getMessages(self as MsgStore, forceMore),
    seeChat: async (id: number): Promise<any> => await actions.seeChat(self as MsgStore, id),
  }))
  .views((self) => ({
    filterMessagesByContent(id, something): any {
      return []
    },
  }))

type MsgStoreType = Instance<typeof MsgStoreModel>
export interface MsgStore extends MsgStoreType {}
type MsgStoreSnapshotType = SnapshotOut<typeof MsgStoreModel>
export interface MsgStoreSnapshot extends MsgStoreSnapshotType {}
export const createMsgStoreDefaultModel = () => types.optional(MsgStoreModel, {})
