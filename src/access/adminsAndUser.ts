import type { Access } from 'payload/'

import { checkRole } from './checkRole'

const adminsAndUser: Access = ({ req: { user } }) => {
  if (user) {
    // check role is admin or user and return true
    if (checkRole(['admin', 'user'], user)) {
      return true
    }
  }
  // if not admin or user return false
  return false
}

export default adminsAndUser
