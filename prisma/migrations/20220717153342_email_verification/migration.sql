-- CreateTable
CREATE TABLE "VerifiedEmails" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "VerifiedEmails_pkey" PRIMARY KEY ("id")
);
