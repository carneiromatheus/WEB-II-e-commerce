import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const isProduction = process.env.NODE_ENV === "production";

const configDatabase = {
    connectionString:
        isProduction ?
            process.env.DATABASE_PROD_URL :
            process.env.DATABASE_DEV_URL,
    ssl: true
};

export const db = new Pool(configDatabase);
