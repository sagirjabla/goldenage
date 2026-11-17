import { doublePrecision, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const dailyPrices = pgTable('daily_prices', {
  date: text('date').primaryKey(), // YYYY-MM-DD in Asia/Dubai
  open: doublePrecision('open').notNull(),
  high: doublePrecision('high').notNull(),
  low: doublePrecision('low').notNull(),
  close: doublePrecision('close').notNull(), // USD per troy ounce
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})
