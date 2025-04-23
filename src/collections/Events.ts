import type { CollectionConfig } from 'payload'
import { admins } from '../access/admins'
import adminsAndUser from '../access/adminsAndUser'

export const Events: CollectionConfig = {
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
    read: admins, // TODO: implement createdBy
    // - **Update**: Owner updates all events; Staff only their own (via createdBy)
    update: admins, // TODO: implement createdBy
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
