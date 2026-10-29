import { 
  pgTable, uuid, varchar, text, timestamp, integer, 
  boolean, pgEnum, index, uniqueIndex 
} from 'drizzle-orm/pg-core';

// 1. Enum Reaksi Emoji (8 Reaksi Ekspresif ala GitHub/Slack untuk Pengguna Umum)
export const reactionTypeEnum = pgEnum('reaction_type', [
  'THUMBS_UP',   // 👍 Setuju / Mantap
  'THUMBS_DOWN', // 👎 Kurang Setuju
  'LAUGH',       // 😄 Lucu / Ngakak
  'HOORAY',      // 🎉 Keren / Selamat / Pesta
  'CONFUSED',    // 😕 Bingung / Heran
  'HEART',       // ❤️ Suka / Sayang
  'ROCKET',      // 🚀 Semangat / Hype
  'EYES'         // 👀 Menarik / Menyimak
]);

// 2. Users Table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('username', { length: 30 }).notNull().unique(),
  displayName: varchar('display_name', { length: 60 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }),
  googleId: varchar('google_id', { length: 100 }).unique(),
  bio: varchar('bio', { length: 160 }).default(''),
  avatarUrl: text('avatar_url'),
  isVerified: boolean('is_verified').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  uniqueIndex('users_username_uidx').on(table.username),
  index('users_email_idx').on(table.email),
]);

// 3. Posts & Threads Table (Alur Utas Bersambung ala Threads)
export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  authorId: uuid('author_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(), // Teks postingan (max 500 karakter dengan format teks ringan)
  
  // Hierarki Balasan (Threads Vertical Connector Tree)
  replyToPostId: uuid('reply_to_post_id'),
  rootPostId: uuid('root_post_id'),
  depthLevel: integer('depth_level').default(0).notNull(),
  
  // Agregasi Counter (Disinkronkan secara asinkron via Redis)
  repliesCount: integer('replies_count').default(0).notNull(),
  repostsCount: integer('reposts_count').default(0).notNull(),
  reactionsCount: integer('reactions_count').default(0).notNull(),
  
  isDeleted: boolean('is_deleted').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index('posts_author_created_idx').on(table.authorId, table.createdAt),
  index('posts_reply_to_idx').on(table.replyToPostId),
  index('posts_root_post_idx').on(table.rootPostId),
  index('posts_created_at_idx').on(table.createdAt),
]);

// 4. Post Media Table (Lampiran Gambar hingga 4 foto per post)
export const postMedia = pgTable('post_media', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  mediaUrl: text('media_url').notNull(),
  mediaType: varchar('media_type', { length: 50 }).notNull(), // 'image/webp', 'image/jpeg'
  width: integer('width'),
  height: integer('height'),
  orderIndex: integer('order_index').default(0).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  index('post_media_post_id_idx').on(table.postId),
]);

// 5. Reactions Table (8 Reaksi Ekspresif per user per post)
export const reactions = pgTable('reactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  postId: uuid('post_id').notNull().references(() => posts.id, { onDelete: 'cascade' }),
  reactionType: reactionTypeEnum('reaction_type').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  uniqueIndex('reactions_user_post_type_uidx').on(table.userId, table.postId, table.reactionType),
  index('reactions_post_id_type_idx').on(table.postId, table.reactionType),
]);

// 6. Follows Table
export const follows = pgTable('follows', {
  followerId: uuid('follower_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  followingId: uuid('following_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  uniqueIndex('follows_pair_uidx').on(table.followerId, table.followingId),
  index('follows_following_idx').on(table.followingId),
]);

// 7. User Daily Activity (Untuk Visualisasi Keaktifan & Streak Harian)
export const userDailyActivity = pgTable('user_daily_activity', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  activityDate: timestamp('activity_date', { mode: 'date' }).notNull(),
  postCount: integer('post_count').default(0).notNull(),
  replyCount: integer('reply_count').default(0).notNull(),
  reactionCount: integer('reaction_count').default(0).notNull(),
}, (table) => [
  uniqueIndex('user_activity_date_uidx').on(table.userId, table.activityDate),
]);
