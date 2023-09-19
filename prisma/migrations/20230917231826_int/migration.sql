-- CreateTable
CREATE TABLE "vehicle" (
    "id" SERIAL NOT NULL,
    "plate_number" TEXT NOT NULL,
    "plate_state" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "delete_at" TIMESTAMP(3),

    CONSTRAINT "vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip_code" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "delete_at" TIMESTAMP(3),

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservation" (
    "id" SERIAL NOT NULL,
    "external_key" TEXT NOT NULL,
    "start_time" TIMESTAMP(3),
    "end_time" TIMESTAMP(3),
    "space_number" TEXT,
    "active" BOOLEAN NOT NULL,
    "locationId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "delete_at" TIMESTAMP(3),

    CONSTRAINT "reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_plate_number_key" ON "vehicle"("plate_number");

-- CreateIndex
CREATE UNIQUE INDEX "reservation_external_key_key" ON "reservation"("external_key");

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
