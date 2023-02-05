-- RedefineIndex
DROP INDEX "day_habit_day_id_habit_id_key";
CREATE UNIQUE INDEX "day_habits_day_id_habit_id_key" ON "day_habits"("day_id", "habit_id");
