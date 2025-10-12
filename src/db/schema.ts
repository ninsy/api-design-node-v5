import { pgTable, varchar, serial, timestamp } from 'drizzle-orm/pg-core';

export const userTable = pgTable("users", {
    // id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    id: serial('id').primaryKey(),
    username: varchar('username', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    // TODO: write migration to make this notNull & update existing records?
    firstName: varchar('firstName', { length: 255 }),
    lastName: varchar('lastName', { length: 255 }),
    password: varchar('password', { length: 64 }).notNull(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});
