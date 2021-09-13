import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { withEnvironment } from '../extensions/with-environment'
import * as actions from './ui-actions'

export const UiStoreModel = types
  .model('UiStore')
  .props({
    extraTextContent: types.string,
    replyUUID: types.string,
    searchTerm: types.string,
    tribesSearchTerm: types.string,
  })
  .extend(withEnvironment)
  .actions((self) => ({}))

type ArrayObject = { [k: string]: string }
type UiStoreType = Instance<typeof UiStoreModel>
export interface UiStore extends UiStoreType {}
type UiStoreSnapshotType = SnapshotOut<typeof UiStoreModel>
export interface UiStoreSnapshot extends UiStoreSnapshotType {}
export const createUiStoreDefaultModel = () => types.optional(UiStoreModel, {})
