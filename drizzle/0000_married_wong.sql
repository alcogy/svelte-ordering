CREATE TABLE "order" (
	"id" serial PRIMARY KEY NOT NULL,
	"ordered_date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "particular" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer DEFAULT 0 NOT NULL,
	"product_id" integer DEFAULT 0 NOT NULL,
	"sort" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar DEFAULT '' NOT NULL,
	"manufacturer" varchar DEFAULT '' NOT NULL,
	"price" integer DEFAULT 0 NOT NULL
);
