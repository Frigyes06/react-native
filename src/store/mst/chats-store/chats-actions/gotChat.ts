import { Chat, ChatsStore } from '../chats-store'

export const gotChat = async (self: ChatsStore, chat: Chat) => {
  const existingIndex = self.chats.findIndex((ch) => ch.id === chat.id)
  if (existingIndex > -1) {
    self.chats[existingIndex] = self.parseChat(chat)
  } else {
    self.chats.unshift(self.parseChat(chat))
  }
}
