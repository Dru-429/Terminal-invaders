import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config"; 
import PG from "pg";
import { PrismaClient } from "@prisma/client/extension";

const pool = new PG.Pool({ 
  connectionString: process.env.DATABASE_URL 
});

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });