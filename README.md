# How to run locally

1. `cp .env.example .env` to copy the example environment variables to a new .env file
2. `pnpm install` to install dependencies
3. `pnpm dev` to run dev server
4. open `http://localhost:3000` to open the app in your browser
5. Follow the on-screen instructions to create your first admin user.

# How I built this project

1. Ran `pnpx create-payload-app@latest` to create new Payload website, selecting MongoDB. Since this is a project to learn and demonstrate the basics of Payload, I chose to use the blank template rather than adding it to a Next.js project.
2. Ran `pnpm dev` to run dev server
