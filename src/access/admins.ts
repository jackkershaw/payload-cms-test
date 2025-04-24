import type { Access } from 'payload'
import { checkRole } from './checkRole'

export const admins: Access = ({ req: { user } }) => {
  // if no user, return false
  if (!user) {
    return false
  } else {
    // return true if user role is admin
    return checkRole(['admin'], user)
  }
}
