import { ChatsStore } from '../chats-store'
import { relay } from '../../../api'

export const getChats = async (self: ChatsStore) => {
  const chats = await relay.get('chats')
  if (!(chats && chats.length)) return false
  const parsedChats = chats.map((c) => self.parseChat(c))
  self.setChats(parsedChats)
  return true
}
