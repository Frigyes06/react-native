import * as ipc from './ipc'

export async function decrypt(data: string, password: string) {
  const obj = { data, password }
  if (!data || !password) return ''
  const ret = await ipc.send('decrypt', obj)
  console.log('ret:', ret)
  return ret
}

export async function decrypt64(data: string, password: string) {
  const obj = { data, password }
  if (!data || !password) return ''
  const ret = await ipc.send('decrypt-64', obj)
  return ret
}

export function decryptSync(data: string, password: string) {
  const obj = { data, password }
  if (!data || !password) return ''
  const ret = ipc.sendSync('decryptSync', obj)
  return ret
}

export async function encryptSymmetric(data: string, password: string) {
  const obj = { data, password }
  if (!data || !password) return ''
  const ret = await ipc.send('encrypt-symmetric', obj)
  return ret
}
