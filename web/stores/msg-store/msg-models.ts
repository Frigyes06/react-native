import { Instance, types } from 'mobx-state-tree'
import { ChatModel } from 'stores/chats-store'

export const BoostMsgModel = types.model('BoostMsg').props({})

export const MsgModel = types.model('Msg').props({
  id: types.identifierNumber,
  chat_id: types.number, // will need to be reference
  type: types.number,
  uuid: types.optional(types.string, ''),
  sender: types.number,
  receiver: types.number,
  amount: types.number,
  amount_msat: types.number,
  payment_hash: types.string,
  payment_request: types.string,
  date: types.string,
  expiration_date: types.string,
  message_content: types.string,
  remote_message_content: types.string,
  status: types.number,
  status_map: types.frozen(),
  parent_id: types.number,
  subscription_id: types.number,
  media_type: types.string,
  media_token: types.string,
  media_key: types.string,
  seen: types.boolean,
  created_at: types.string,
  updated_at: types.string,
  sender_alias: types.string,
  sender_pic: types.string,

  original_muid: types.string,
  reply_uuid: types.string,

  text: types.string,

  chat: ChatModel,

  sold: types.boolean, // this is a marker to tell if a media has been sold
  showInfoBar: types.boolean, // marks whether to show the date and name

  reply_message_content: types.string,
  reply_message_sender_alias: types.string,
  reply_message_sender: types.number,

  boosts_total_sats: types.number,
  boosts: types.frozen(), // types.array(BoostMsgModel)
})

export interface Msg extends Instance<typeof MsgModel> {}
export interface BoostMsg extends Instance<typeof BoostMsgModel> {}

/**

export interface Msg {
  id: number
  chat_id: number
  type: number
  uuid: string
  sender: number
  receiver: number
  amount: number
  amount_msat: number
  payment_hash: string
  payment_request: string
  date: string
  expiration_date: string
  message_content: string
  remote_message_content: string
  status: number
  status_map: { [k: number]: number }
  parent_id: number
  subscription_id: number
  media_type: string
  media_token: string
  media_key: string
  seen: boolean
  created_at: string
  updated_at: string
  sender_alias: string
  sender_pic: string

  original_muid: string
  reply_uuid: string

  text: string

  chat: Chat

  sold: boolean // this is a marker to tell if a media has been sold
  showInfoBar: boolean // marks whether to show the date and name

  reply_message_content: string
  reply_message_sender_alias: string
  reply_message_sender: number

  boosts_total_sats: number
  boosts: BoostMsg[]
}

 */
