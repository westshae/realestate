CREATE TABLE "users" (
	"email" varchar PRIMARY KEY NOT NULL,
	"hashed_password" text,
	"is_admin" boolean,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
