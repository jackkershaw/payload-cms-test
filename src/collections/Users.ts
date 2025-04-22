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
    //  only admins can access the admin UI
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
    {
      name: 'Name',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['user'],
      saveToJWT: true,
      options: [
        {
          label: 'Owner',
          value: 'admin',
        },
        {
          label: 'Staff',
          value: 'user',
        },
      ],
    },
  ],
}
