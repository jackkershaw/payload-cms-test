import type { Access } from 'payload/'

import { checkRole } from './checkRole'

const adminsAndCreatedBy: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin'], user)) {
      return true
    } else {
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
