import "https://deno.land/x/dotenv/load.ts";

const APP_HOST = Deno.env.get("APP_HOST") || "127.0.0.1";
const APP_PORT = Deno.env.get("APP_PORT") || 4000;
const FRONTEND_HOST = Deno.env.get("FRONTEND_HOST") || "*";

export { APP_HOST, APP_PORT, FRONTEND_HOST };
