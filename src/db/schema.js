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
    accountId: text().notNull()
    .references(() => accountTable.id, {
        onDelete: 'cascade'
    })
})

export const collectionTable = sqliteTable("collection", {
    id: text().primaryKey().$defaultFn(() => randomUUID()),
    title: text('title', { length: 50 }).notNull(),
    description: text('description', { length: 250 }),
    isPublic: integer('is_public', { mode: 'boolean' }).notNull().default(false),
    ownerId: text('owner_id')
        .notNull()
        .references(() => accountTable.id, {
            onDelete: 'cascade'
        })
})

export const flashcardTable = sqliteTable("flashcard", {
    id: text().primaryKey().$defaultFn(() => randomUUID()),
    collectionId: text('collection_id')
        .notNull()
        .references(() => collectionTable.id, {
            onDelete: 'cascade'
        }),
    frontText: text('front_text', { length: 50 }).notNull(),
    backText: text('back_text', { length: 50 }).notNull(),
    frontUrl: text('front_url', { length: 50 }).notNull(),
    backUrl: text('back_url', { length: 50 }).notNull(),
})

export const nextRevisionDateTable = sqliteTable("next_revision_date", {
    id: text().primaryKey().$defaultFn(() => randomUUID()),
    accountId: text('account_id')
        .notNull()
        .references(() => accountTable.id, {
            onDelete: 'cascade'
        }),

    flashcardId: text('flashcard_id')
        .notNull()
        .references(() => flashcardTable.id, {
            onDelete: 'cascade'
        }),
    nextRevisionDate: integer('next_revision_date', {node: 'timestamp'}).notNull().$defaultFn(() => new Date()),
    lastRevisionDate: integer('last_revision_date', {node: 'timestamp'}).notNull().$defaultFn(() => new Date()),
    level: integer('level').notNull()
})