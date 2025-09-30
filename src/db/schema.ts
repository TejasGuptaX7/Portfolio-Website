import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  message: text('message').notNull(),
  createdAt: text('created_at').notNull(),
});

export const contactMessages = sqliteTable('contact_messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  createdAt: text('created_at').notNull(),
});