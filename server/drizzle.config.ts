import type { Config } from 'drizzle-kit'

import { env } from "./src/env";

export default {
  schema:'./src/db/schemas/*',
  out:'./drizzle',
  driver: 'pg',
  dbCredentials:{
    connectionString: env.URL_DB
  },
}satisfies Config