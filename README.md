This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
## Supabase Setup

- Copy `.env.example` to `.env.local` and fill your keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY # server-side only
```

- Utilities are available under:
	- [lib/supabase/browser.ts](lib/supabase/browser.ts)
	- [lib/supabase/server.ts](lib/supabase/server.ts)
	- [lib/supabase/admin.ts](lib/supabase/admin.ts)
	- [services/auth.ts](services/auth.ts)
	- [services/db.ts](services/db.ts)
	- [services/storage.ts](services/storage.ts)
	- [services/functions.ts](services/functions.ts)

### Usage Examples

- Client auth (in a Client Component):

```ts
import { signInWithPassword, signOut } from '@/services/auth'

await signInWithPassword('email@example.com', 'password')
await signOut()
```

- Server user (in a Server Component / action):

```ts
import { getServerUser } from '@/services/auth'

const user = await getServerUser()
```

- CRUD (client-side; pass server/admin client for server usage):

```ts
import { select, insert, updateById, deleteById } from '@/services/db'

const rows = await select('profiles')
await insert('profiles', { full_name: 'Ada' })
await updateById('profiles', 1, { full_name: 'Lovelace' })
await deleteById('profiles', 1)
```

- Storage:

```ts
import { upload, getPublicUrl } from '@/services/storage'

await upload('avatars', 'user-1.png', file)
const url = getPublicUrl('avatars', 'user-1.png')
```

- Edge Function:

```ts
import { invoke } from '@/services/functions'

const result = await invoke('my-function', { hello: 'world' })
```
