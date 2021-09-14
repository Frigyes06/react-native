import { Instance, types } from 'mobx-state-tree'
import { InviteModel } from '../contacts-store/contacts-models'

export const ChatModel = types.model('Chat').props({
  id: types.identifierNumber,
  uuid: types.string,
  name: types.string,
  photo_url: types.string,
  type: types.number,
  status: types.number,
  contact_ids: types.array(types.number), // should be references
  is_muted: types.boolean,
  created_at: types.string,
  updated_at: types.string,
  deleted: types.boolean,
  feed_url: types.string,
  app_url: types.string,
  group_key: types.string,
  host: types.string,
  price_to_join: types.number,
  price_per_message: types.number,
  escrow_amount: types.number,
  escrow_millis: types.number,
  owner_pubkey: types.string,
  unlisted: types.boolean,
  private: types.boolean,
  pending_contact_ids: types.array(types.number),
  invite: types.maybeNull(InviteModel),
  pricePerMinute: types.number,
  meta: types.frozen(),
  my_alias: types.string,
  my_photo_url: types.string,
})

export interface Chat extends Instance<typeof ChatModel> {}
