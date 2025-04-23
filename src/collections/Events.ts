import type { CollectionConfig } from 'payload'
import { admins } from '../access/admins'
import adminsAndUser from '../access/adminsAndUser'
import adminsAndCreatedBy from '@/access/adminsAndCreatedBy'

export const Events: CollectionConfig = {
  // Add a beforeChange hook in events to set createdBy to the current user's ID on creation
  hooks: {
    beforeChange: [
      async ({ req, operation, data }) => {
        {
          if (req.user) {
            if (operation === 'create') {
              data.createdBy = req.user?.id
              return data
            }
          }
        }
      },
    ],
  },
  slug: 'events',
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: 'title',
  },
  access: {
    //     - **Create**: Allowed for Owner and Staff
    create: adminsAndUser,
    // - **Read**: Owner accesses all events; Staff only their own (via createdBy)
    read: adminsAndCreatedBy,
    // - **Update**: Owner updates all events; Staff only their own (via createdBy)
    update: adminsAndCreatedBy,
    // - **Delete**: Allowed only for Owner
    delete: admins,
  },
  fields: [
    // - **Title** (String Text): Required
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    // - **Event Date** (Date Picker): Date, Required
    {
      name: 'eventDate',
      type: 'date',
      required: true,
    },
    // - **Location** (String Text): Required
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    // - **Created By** (Relationship): Links to users, Required, Tracks event creator
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      //     - Make the createdBy field in events read-only after creation (use field-level access) //
      access: {
        create: () => true,
        read: () => true,
        update: () => false,
      },
    },
  ],
}
