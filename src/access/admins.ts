import type { Access } from 'payload'
import { checkRole } from './checkRole'

export const admins: Access = ({ req: { user } }) => {
  if (!user) {
    return false
  } else {
    return checkRole(['admin'], user)
  }
}
