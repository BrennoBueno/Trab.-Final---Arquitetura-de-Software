/*
  Warnings:

  - Added the required column `brand` to the `cars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fine_amount` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cars" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "daily_rate" REAL NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "license_plate" TEXT NOT NULL,
    "fine_amount" REAL NOT NULL,
    "brand" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_cars" ("available", "daily_rate", "description", "id", "license_plate", "name") SELECT "available", "daily_rate", "description", "id", "license_plate", "name" FROM "cars";
DROP TABLE "cars";
ALTER TABLE "new_cars" RENAME TO "cars";
CREATE UNIQUE INDEX "cars_license_plate_key" ON "cars"("license_plate");
CREATE TABLE "new_rentals" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "carId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" DATETIME,
    "expectedReturnDate" DATETIME NOT NULL,
    "total" REAL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "rentals_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_rentals" ("carId", "endDate", "expectedReturnDate", "id", "startDate", "total", "userId") SELECT "carId", "endDate", "expectedReturnDate", "id", "startDate", "total", "userId" FROM "rentals";
DROP TABLE "rentals";
ALTER TABLE "new_rentals" RENAME TO "rentals";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
