/*
  Warnings:

  - You are about to drop the `TaskHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskHistory" DROP CONSTRAINT "TaskHistory_changed_by_fkey";

-- DropForeignKey
ALTER TABLE "TaskHistory" DROP CONSTRAINT "TaskHistory_task_id_fkey";

-- DropTable
DROP TABLE "TaskHistory";

-- CreateTable
CREATE TABLE "task_histories" (
    "id" SERIAL NOT NULL,
    "old_status" "TaskStatus" NOT NULL,
    "new_status" "TaskStatus" NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "task_id" INTEGER NOT NULL,
    "changed_by" INTEGER NOT NULL,

    CONSTRAINT "task_histories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "task_histories" ADD CONSTRAINT "task_histories_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_histories" ADD CONSTRAINT "task_histories_changed_by_fkey" FOREIGN KEY ("changed_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
