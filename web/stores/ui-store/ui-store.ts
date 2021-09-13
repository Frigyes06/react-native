import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { ChatModel } from 'stores/chats-store'
import { withEnvironment } from '../extensions/with-environment'
import * as actions from './ui-actions'

export const UiStoreModel = types
  .model('UiStore')
  .props({
    extraTextContent: types.optional(types.string, ''),
    replyUUID: types.optional(types.string, ''),
    searchTerm: types.optional(types.string, ''),
    selectedChat: types.maybe(types.reference(ChatModel)),
    // selectedChat: types.optional(ChatModel, {}),
    tribesSearchTerm: types.optional(types.string, ''),
  })
  .extend(withEnvironment)
  .actions((self) => ({}))

type ArrayObject = { [k: string]: string }
type UiStoreType = Instance<typeof UiStoreModel>
export interface UiStore extends UiStoreType {}
type UiStoreSnapshotType = SnapshotOut<typeof UiStoreModel>
export interface UiStoreSnapshot extends UiStoreSnapshotType {}
export const createUiStoreDefaultModel = () => types.optional(UiStoreModel, {})
