import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js";
import { scheduleShow } from "./show.js";

const selectedDateInput = document.getElementById("date");

export async function schedulesDays() {
  const selectedDate = selectedDateInput.value;

  const dailySchedules = await scheduleFetchByDay({  date: selectedDate });
 
  scheduleShow({ dailySchedules });
}