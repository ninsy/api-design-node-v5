import { relations } from 'drizzle-orm';
import { pgTable, varchar, uuid, timestamp, primaryKey, text, integer, boolean } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

// Table definitions

export const userTable = pgTable("users", {
    // id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    id: uuid('id').primaryKey().defaultRandom(),
    username: varchar('username', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    // TODO: write migration to make this notNull & update existing records?
    firstName: varchar('firstName', { length: 255 }),
    lastName: varchar('lastName', { length: 255 }),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

export const habitTable = pgTable("habits", {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => userTable.id, { onDelete: 'cascade' }).notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    frequency: varchar('frequency', { length: 20 }).notNull(),
    targetCount: integer('target_count').default(1),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

export const entriesTable = pgTable("entries", {
    id: uuid('id').primaryKey().defaultRandom(),
    habitId: uuid("habit_id").references(() => habitTable.id, { onDelete: 'cascade' }).notNull(),
    completionDate: timestamp('completion_date').defaultNow().notNull(),
    note: text('note'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

export const tagsTable = pgTable("tags", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 50 }).notNull(),
    color: varchar('color', { length: 7 }).default('#6b7280'),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    updatedAt: timestamp('updatedAt').notNull().defaultNow(),
});

export const habitTagsTable = pgTable(
    "habitTags",
    {
        habitId: uuid("habit_id").references(() => habitTable.id, { onDelete: 'cascade' }).notNull(),
        tagId: uuid("tag_id").references(() => tagsTable.id, { onDelete: 'cascade' }).notNull(),
    },
    (t) => [
        primaryKey({ columns: [t.habitId, t.tagId]})
    ]
);

// Relations definitions

export const userRelations = relations(userTable, ({ many }) => ({
    habits: many(habitTable)
}))

export const habitRelations = relations(habitTable, ({one, many}) => ({
    user: one(userTable, {
        fields: [habitTable.userId],
        references: [userTable.id],
    }),
    entries: many(entriesTable),
    habitTags: many(habitTagsTable),
}))

export const entriesRelations = relations(entriesTable, ({ one  }) => ({
    habit: one(habitTable, {
        fields: [entriesTable.habitId],
        references: [habitTable.id],
    }),
}));

export const tagsRelations = relations(tagsTable, ({ many }) => ({
    habitTags: many(habitTagsTable)
}));

export const habitTagsRelations = relations(habitTagsTable, ({ one }) => ({
    habit: one(habitTable, {
        fields: [habitTagsTable.habitId],
        references: [habitTable.id],
    }),
    tag: one(tagsTable, {
        fields: [habitTagsTable.tagId],
        references: [tagsTable.id],
    }),
}));

export type User = typeof userTable.$inferSelect;
export type Habit = typeof habitTable.$inferSelect;
export type Entry = typeof entriesTable.$inferSelect;
export type Tag = typeof tagsTable.$inferSelect;
export type HabitTag = typeof habitTagsTable.$inferSelect;

export const insertUserSchema = createInsertSchema(userTable);
export const selectUserSchema = createSelectSchema(userTable);
