import { Chat, ChatsStore } from '../'

export const gotChat = async (self: ChatsStore, chat: Chat) => {
  console.tron.log('gotChat placeholder')
  // const existingIndex = self.chats.findIndex((ch) => ch.id === chat.id)
  // if (existingIndex > -1) {
  //   self.chats[existingIndex] = self.parseChat(chat)
  // } else {
  //   self.chats.unshift(self.parseChat(chat))
  // }
}
