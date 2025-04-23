import type { Access } from 'payload/'

import { checkRole } from './checkRole'

const adminsAndCreatedBy: Access = ({ req: { user }, data }) => {
  if (user) {
    if (checkRole(['admin'], user)) {
      return true
    }
    if (user.id === data.createdBy) {
      return true
    }
  }
  return false
}

export default adminsAndCreatedBy
