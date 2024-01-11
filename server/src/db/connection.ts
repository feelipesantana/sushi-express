import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "../env";

import * as schema from "./schemas";

const client = postgres(env.URL_DB, { max: 1 });

export const db = drizzle(client, { schema });
