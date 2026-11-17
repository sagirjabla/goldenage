CREATE TABLE "daily_prices" (
	"date" text PRIMARY KEY,
	"open" double precision NOT NULL,
	"high" double precision NOT NULL,
	"low" double precision NOT NULL,
	"close" double precision NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
