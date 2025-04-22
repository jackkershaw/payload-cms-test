# How to run locally

1. `cp .env.example .env` to copy the example environment variables to a new .env file
2. `pnpm install` to install dependencies
3. `pnpm dev` to run dev server
4. open `http://localhost:3000` to open the app in your browser
5. Follow the on-screen instructions to create your first admin user.

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
  - Implemented access controls using three functions to check the user's role as an admin or not, using the above two examples as a guide. I then set the CRUD permissions appropiately. I am not sure if this is the best solution, as I found something simpler online [here](https://dev.to/aaronksaunders/access-control-in-payload-cms-cheat-sheet-4fn) which might have suited my use case, but I decided to trust the more robust looking example on the Payload Github.
  - I reused the check role function to allow access to the admin panel only to the admin.
