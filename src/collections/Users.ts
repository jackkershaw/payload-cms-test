import type { CollectionConfig } from 'payload'
import { admins } from '../access/admins'
import adminsAndUser from '../access/adminsAndUser'
import { checkRole } from '../access/checkRole'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    // Create: Allowed only for Owner
    create: admins,
    //Read: Allowed only for Owner or the user themselves
    read: adminsAndUser,
    //Update: Allowed for Owner or the user themselves
    update: adminsAndUser,
    // Only admins can delete
    delete: admins,
    // only admins can access the admin UI
    admin: ({ req: { user } }) => {
      if (!user) {
        return false
      } else {
        return checkRole(['admin'], user)
      }
    },
  },

  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}

// Events Access

// - **Create**: Allowed for Owner and Staff
// - **Read**: Owner accesses all events; Staff only their own (via createdBy)
// - **Update**: Owner updates all events; Staff only their own
// - **Delete**: Allowed only for Owner

// Pages Access

// - **Create**: Allowed for Owner and Staff
// - **Read**: Allowed for Owner and Staff
// - **Update**: Allowed for Owner and Staff
// - **Delete**: Allowed only for the Owner
