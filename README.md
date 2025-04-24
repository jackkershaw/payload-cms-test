# How to run locally

1. Install MongoDB if not already installed. Instructions [here](https://www.mongodb.com/docs/manual/installation/).
2. `cp .env.example .env` to copy the example environment variables to a new .env file
3. For dev MongoDB usage locally you can set your DATABASE_URI to something like "mongodb://127.0.0.1/payloadcms".
4. `pnpm install` to install dependencies
5. `pnpm dev` to run dev server
6. open `http://localhost:3000` to open the app in your browser
7. Follow the on-screen instructions to create your first admin user.

# How I built this project

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

10. Started testing, by signing into the Owner account in Firefox and Staff account in Safari. I tested each, collection by collection, to meet the following test scenarios:

- Owner :

  - ✅ Can create, read, update, and delete any event, user, or page.

    - ✅ Create users
      ![alt text](<testing-screenshots/CleanShot 2025-04-24 at 12.58.48@2x.png>)
    - ✅ Read users
      ![alt text](<testing-screenshots/CleanShot 2025-04-24 at 12.57.49@2x.png>)
    - ✅ Update users
      ![alt text](<testing-screenshots/CleanShot 2025-04-24 at 12.59.55@2x.png>)
    - ✅ Delete users
      ![alt text](<testing-screenshots/CleanShot 2025-04-24 at 13.00.25@2x.png>)
    - ✅ Create Events
      ![alt text](<testing-screenshots/CleanShot 2025-04-24 at 21.12.43@2x.png>)
    - ✅ Read Events
      ![alt text](<testing-screenshots/CleanShot 2025-04-24 at 21.12.16@2x.png>)
    - ✅ Update Events
      ![alt text](<testing-screenshots/CleanShot 2025-04-24 at 21.17.35@2x.png>)
    - ✅ Delete Events
      ![alt text](<testing-screenshots/CleanShot 2025-04-24 at 21.27.05@2x.png>)
    - ✅ Create Pages
      ![alt text](<testing-screenshots/CleanShot 2025-04-24 at 21.26.19@2x.png>)
    - ✅ Read Pages
      ![alt text](<testing-screenshots/CleanShot 2025-04-24 at 21.27.40@2x.png>)
    - ✅ Update Pages
      ![alt text](<testing-screenshots/CleanShot 2025-04-24 at 21.28.08@2x.png>)
    - ✅ Delete Pages
      ![alt text](<testing-screenshots/CleanShot 2025-04-24 at 21.29.16@2x.png>)

  - ✅ Accesses admin UI for all collections
    - ![Payload CMS Admin UI, with Users, Media, Pages and Events collections shown](<testing-screenshots/CleanShot 2025-04-24 at 12.47.44@2x.png>)

- Staff :

  - Testing this was slightly harder, as this would normally require a custom frontend for editors or to use Postman. Whilst that approach would be more robust, and something I would do if I had more time/was making a production app, I hacked this by temporarily commenting out my function for only giving admins access to the admin panel. This way I could test with the admin panel and provide easy-to-understand admin screenshots.

  - ✅Can create events (auto-assigned via createdBy).
    ![alt text](<testing-screenshots/CleanShot 2025-04-24 at 21.34.43@2x.png>)
    ![alt text](<testing-screenshots/CleanShot 2025-04-24 at 21.34.59@2x.png>)

  - ✅ Can read and update only their own events.

    - ✅ Read own events
      ![alt text](<testing-screenshots/CleanShot 2025-04-24 at 21.11.11@2x.png>)
    - ✅ Update own events
      ![alt text](<testing-screenshots/CleanShot 2025-04-24 at 21.15.55@2x.png>)

  - Can create, read, and update pages but not delete.
    - ✅ Create pages
      ![alt text](<testing-screenshots/CleanShot 2025-04-24 at 16.55.11@2x.png>)
    - ✅ Read pages
      ![alt text](<testing-screenshots/CleanShot 2025-04-24 at 21.30.49@2x.png>)
    - ✅ Update pages
      ![alt text](<testing-screenshots/CleanShot 2025-04-24 at 21.31.30@2x.png>)
    - ✅ Not delete pages
      ![alt text](<testing-screenshots/CleanShot 2025-04-24 at 21.31.54@2x.png>)
  - ✅ Cannot access admin UI for users.
    ![alt text](<testing-screenshots/CleanShot 2025-04-24 at 16.48.31@2x.png>)

- Unauthenticated User :

  - ✅ No access to any operations or admin UI.
    ![Payload CMS login screen](<testing-screenshots/CleanShot 2025-04-24 at 12.50.51@2x.png>)
  - ✅ Verify security and functionality.
    - ✅ No access to anything but the frontpage.
      ![A Payload CMS template frontpage](<testing-screenshots/CleanShot 2025-04-24 at 12.52.02@2x.png>)

11. During testing I found the following issues and debugged them:

- Noticed an issue where the dashboard wasn't loading for staff - this was because data was null. Added a question mark to the adminsandcreatedby access function to allow null values for data on load.
- Events weren't showing up for the staff user so I debugged and realised the AdminsAndCreatedBy access function wasn't set up correctly. Instead of just returning true or false, I needed to filter the events based on user id, so i used a similar structure as the admins and user function to match where createdby equalled the user id. This solved all issues with events - whether creating or viewing them.
- Pages weren't showing up for the staff user either, so I realised I needed to fix the AdminsAndUSer access function. This was as simple as just adding user to the list of checked roles next to admin - returning true for user as well as admin.

## If I had more time

- Custom frontend for Staff to edit the site without the admin panel.
- Add alt text to the testing screenshots in this README to improve accessibility.
- Add more comments to explain code.
- Add error handling to the beforeChange hook.
- I really enjoyed working with Payload and will continue to use it in future. I am particularly interested in experimenting with the following features:
  - SEO features
  - Search function with SSR
  - Email functionality with Nodemailer
  - Live preview (I've heard this is a much easier process than in a traditional (PHP) CMS)
  - Layout builder
  - Seeding databases (as in the Access Control demo)

## Troubleshooting tips

I made use of the Payload [Discord](https://discord.com/invite/payload) to help me troubleshoot (mostly issues with the examples in the docs). In future I might use [Github Discussions](https://github.com/payloadcms/payload/discussions), the [Community Help section](https://payloadcms.com/community-help) or the [Reddit](https://www.reddit.com/r/PayloadCMS/). It makes me confident to use Payload in future given there is such a strong community behind it.
