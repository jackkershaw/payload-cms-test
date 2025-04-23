# How to run locally

1. Install MongoDB if not already installed. Instructions [here](https://www.mongodb.com/docs/manual/installation/).
2. `cp .env.example .env` to copy the example environment variables to a new .env file
3. For dev MongoDB usage locally you can set your DATABASE_URI to something like "mongodb://127.0.0.1/payloadcms".
4. `pnpm install` to install dependencies
5. `pnpm dev` to run dev server
6. open `http://localhost:3000` to open the app in your browser
7. Follow the on-screen instructions to create your first admin user.

# How I built this project (summary of my approach)

1. Ran `pnpx create-payload-app@latest` to create new Payload website, selecting MongoDB. Since this is a project to learn and demonstrate the basics of Payload, I chose to use the blank template rather than adding it to a Next.js project.
2. Ran `pnpm dev` to run dev server
3. Made an admin user.
4. Read up on Payload, starting from the [Getting Started](https://payloadcms.com/docs/getting-started/installation) guide then progressing onto reading about key concepts such as [The Payload Config](https://payloadcms.com/docs/configuration/overview).
5. I used the page on [Access Controls](https://payloadcms.com/docs/access-control/overview) to help me set up access controls for the admin panel.

- Cloned the access control demo repo to get an idea of how access controls work in Payload.
- Edited the Users.ts file
  - Made sure auth:true was set to enable authentication for the admin panel.
  - I tried implementing access controls as in the example above, but I had an issue with the types as how types are stored has changed within Payload version 3. I found a solution on the [Payload Discord](https://discord.com/channels/967097582721572934/1357468938564403382/1357468938564403382) but this only got me halfway as this example was no longer fully up to date so I found another [example](https://discord.com/channels/967097582721572934/1306486478859145256/1306849389511184456) that did work.
  - Implemented access controls using three functions to check the user's role as an admin or not, using the above two examples as a guide. I then set the CRUD permissions appropiately.
  - I reused the check role function to allow access to the admin panel only to the admin.
  - I edited these three access functions considerably to satisfy typescript - if the user is undefined they will each return false.
  - Added fields to the Users collection, making sure to set the right options:
    - name, required and string - type:text
    - email is already added by default
    - Added roles fields with the options:
      - setting options based on the example from the access docs and our specifications: Select, Required
      - labels for roles - admin is Owner and user is Staff
      - set the default role to Staff (user)

6. Read the docs on [collection configs](https://payloadcms.com/docs/configuration/collections)
7. Added a pages.ts collection:

- Cloned the Users collection to use as a base
- Added it as a collection to payload config file
- Set up access controls as before
- Added fields for title and content, making sure to specify the right options.

8. Added an events.ts collection:

- Cloned the Users collection to use as a base
- Added it as a collection to payload config file
- Added necessary fields, referring to the docs to add right config options
- Made the createdBy field read only after creation using [Field Level Access](https://payloadcms.com/docs/access-control/fields). Used simple arrow functions as in the [Access Control Demo](https://github.com/payloadcms/access-control-demo/blob/master/src/collections/ContactRequests.ts) to return false for update and true for create and read.
- Read up on [beforeChange hooks](https://payloadcms.com/docs/hooks/beforechange) and implemented a beforeChange hook to set the createdBy field to the current user's ID on creation. This involved figuring out how to pass the user id and operation type (create) to the hook. The example [here](https://payloadcms.com/community-help/github/how-to-add-audit-info-like-createdby-and-updatedby-similar-to-createdat-and-updatedat) was helpful in figuring out what to pass in and out of the hook.
- I went back and edited the access controls for events so that staff could access their own events via createdBy. I did this by adding a new access function. I wrote this by duplicating the AdminsAndUser access function, passing data argument into it (I checked Access args) and then checking if user.id = data.createdby, and returning true if so. I liked being able to compartmentalise this logic into a separate function here.

9. Switched to a new local MongoDB database, restarted my local dev and set up two users for testing purposes: one Owner (admin) and one Staff (user).

10. Tested as follows:

## Troubleshooting

I made use of the Payload [Discord](https://discord.com/invite/payload) to help me troubleshoot (mostly issues with the examples in the docs). In future I might use [Github Discussions](https://github.com/payloadcms/payload/discussions), the [Community Help section](https://payloadcms.com/community-help) or the [Reddit](https://www.reddit.com/r/PayloadCMS/). It makes me confident to use Payload in future given there is such a strong community behind it.

## If I had more time

- I really enjoyed working with Payload and will continue to use it in future. I am particularly interested in experimenting with the following features:
  - SEO features
  - Search function with SSR
  - Email functionality with Nodemailer
  - Live preview
  - Layout builder
  - Seeding databases (as in the Access Control demo)
