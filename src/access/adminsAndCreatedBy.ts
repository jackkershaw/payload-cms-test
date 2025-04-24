import type { Access } from 'payload/'

import { checkRole } from './checkRole'

const adminsAndCreatedBy: Access = ({ req: { user } }) => {
  if (user) {
    // admins can see everything - returns true for everything
    if (checkRole(['admin'], user)) {
      return true
    } else {
      // non admins can only see what they created - where createdBy = user.id
      return {
        createdBy: {
          equals: user.id,
        },
      }
    }
  }
  return false
}

export default adminsAndCreatedBy
