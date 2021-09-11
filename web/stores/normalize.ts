import { Contact, ContactModel } from './contacts-store/contacts-models'

export const normalizeContact = (raw: any) => {
  const normalized: Contact = ContactModel.create({
    alias: raw.alias,
    auth_token: raw.auth_token,
    contact_key: raw.contact_key,
    created_at: raw.created_at,
    deleted: parseBool(raw.deleted),
    device_id: raw.device_id,
    from_group: parseBool(raw.from_group),
    id: raw.id,
    is_owner: parseBool(raw.is_owner),
    node_alias: raw.node_alias,
    photo_url: raw.photo_url,
    private_photo: parseBool(raw.private_photo),
    public_key: raw.public_key,
    remote_id: raw.remote_id,
    route_hint: raw.route_hint,
    status: raw.status,
    updated_at: raw.updated_at,
  })
  return normalized
}

const parseBool = (zeroorone: number) => {
  return Boolean(Number(zeroorone))
}
