import { Instance, SnapshotOut, types } from 'mobx-state-tree'
import { withEnvironment } from '../extensions/with-environment'
import * as actions from './details-actions'

export const DetailsStoreModel = types
  .model('DetailsStore')
  .props({})
  .extend(withEnvironment)
  .actions((self) => ({}))

type DetailsStoreType = Instance<typeof DetailsStoreModel>
export interface DetailsStore extends DetailsStoreType {}
type DetailsStoreSnapshotType = SnapshotOut<typeof DetailsStoreModel>
export interface DetailsStoreSnapshot extends DetailsStoreSnapshotType {}
export const createDetailsStoreDefaultModel = () => types.optional(DetailsStoreModel, {})
