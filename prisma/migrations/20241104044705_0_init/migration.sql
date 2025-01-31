-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "profile_picture" TEXT,
    "phone_number" TEXT,
    "is_email_verified" BOOLEAN NOT NULL DEFAULT false,
    "is_phone_verified" BOOLEAN NOT NULL DEFAULT false,
    "email_verification_code" TEXT NOT NULL,
    "phone_verification_code" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "date_of_birth" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "last_login" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_number_key" ON "User"("phone_number");

-- CreateIndex
CREATE INDEX "index_email" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_verification_code_key" ON "User"("email_verification_code");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_verification_code_key" ON "User"("phone_verification_code");