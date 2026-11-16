# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Use **Node.js 22.12 or newer** (Node.js 22 LTS is supported). Check your version with `node -v`. Older Node versions cannot run this project's Vite toolchain. Install Node from [nodejs.org](https://nodejs.org/) or use `nvm install` followed by `nvm use`.

Unzip the download into a new folder, open that folder in VS Code, and open its terminal. Make sure `package.json`, `.npmrc`, and `.env` are in that folder; preserve hidden files when extracting.

```sh
npm install
npm run dev
```

Open the **Local** address printed in the terminal (normally `http://localhost:8080`). Keep the terminal running. Internet access is required for the existing videos, comments, photo, and admin sign-in.

### Troubleshooting

- **`vite` is not recognized / command not found:** `npm install` must finish successfully before `npm run dev`.
- **`Cannot read properties of null (reading 'edgesOut')` or a peer-dependency installation error:** the included `.npmrc` enables the compatible npm resolver. If using the original ZIP, run `npm install --legacy-peer-deps`, then `npm run dev`.
- **`EBADENGINE`, `crypto.hash is not a function`, or an unsupported Node message:** upgrade to Node.js 22.12 or newer, close and reopen VS Code, and check `node -v` again.
- **`ENOENT` mentioning `package.json`:** open the terminal in the extracted folder containing `package.json`, not its parent or the ZIP itself.
- **Port already in use:** run `npm run dev -- --port 3000` and open the new Local address.
- **Missing environment variable message:** ensure the included `.env` was extracted beside `package.json`. It contains this website's public connection settings; never place private credentials in `VITE_` variables.

The corrected download includes `package-lock.json`; subsequent clean installs can use `npm ci` to keep the tested dependency versions. `.npmrc` must stay with it. No database migrations or private service keys are needed to run this existing website locally.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
