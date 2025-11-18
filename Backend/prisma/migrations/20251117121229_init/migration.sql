-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
