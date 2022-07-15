-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "balance" DECIMAL(16,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Asset" (
    "id" SERIAL NOT NULL,
    "ticker" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAsset" (
    "userId" INTEGER NOT NULL,
    "assetId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "UserAsset_pkey" PRIMARY KEY ("userId","assetId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Asset_ticker_key" ON "Asset"("ticker");

-- AddForeignKey
ALTER TABLE "UserAsset" ADD CONSTRAINT "UserAsset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAsset" ADD CONSTRAINT "UserAsset_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
