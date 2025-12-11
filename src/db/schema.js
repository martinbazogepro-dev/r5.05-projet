import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { randomUUID } from 'crypto';

export const accountTable = sqliteTable("account", {
    id: text().primaryKey().$defaultFn(() => randomUUID()),
    mail: text('mail', { length:100 }).notNull(),
    nickname: text('nickname', { length: 50 }).notNull(),
    firstname: text('firstname', { length: 50 }).notNull(),
    lastname: text('lastname', { length: 50 }).notNull(),
    pass: text('pass', {length: 80 }).notNull(),
    creationDate: integer('creation_date').notNull().$defaultFn(() => Math.floor(new Date().getTime() / 1000))
})

export const adminTable = sqliteTable("admin", {
    accountId: integer().notNull()
})

export const collectionTable = sqliteTable("collection", {
    id: integer().primaryKey().$defaultFn(() => randomUUID),
    title: text('title', { length: 50 }).notNull(),
    description: text('description', { length: 250 }),
    isPublic: integer('is_public', { mode: 'boolean' }).notNull().default(false),
    ownerId: integer('owner_id').notNull()
})

export const flashcardTable = sqliteTable("flashcard", {
    id: integer().primaryKey().$defaultFn(() => randomUUID),
    collectionId: integer().notNull(),
    frontText: text('front_text', { length: 50 }).notNull(),
    backText: text('back_text', { length: 50 }).notNull(),
    frontUrl: text('front_url', { length: 50 }).notNull(),
    backUrl: text('back_url', { length: 50 }).notNull(),
})

export const nextRevisionDateTable = sqliteTable("next_revision_date", {
    id: integer().primaryKey().$defaultFn(() => randomUUID),
    account_id: integer().notNull(),
    flashcard_id: integer().notNull(),
    nextRevisionDate: integer('next_revision_date', {node: 'timestamp'}).notNull().$defaultFn(() => new Date()),
    lastRevisionDate: integer('last_revision_date', {node: 'timestamp'}).notNull().$defaultFn(() => new Date()),
    level: integer('level').notNull()
})