import type { CollectionConfig } from 'payload'
import { admins } from '../access/admins'
import adminsAndUser from '../access/adminsAndUser'

export const Pages: CollectionConfig = {
  slug: 'pages',
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: 'title',
  },
  access: {
    //     - **Create**: Allowed for Owner and Staff
    create: adminsAndUser,
    // - **Read**: Allowed for Owner and Staff
    read: adminsAndUser,
    // - **Update**: Allowed for Owner and Staff
    update: adminsAndUser,
    // - **Delete**: Allowed only for the Owner
    delete: admins,
  },
  fields: [
    // - **Title** (String Text): Required
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    // - **Content** (Rich Text): Optional
    {
      name: 'content',
      type: 'richText',
    },
  ],
}
