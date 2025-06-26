import dayjs from "dayjs";

import { schedulesDays } from "./schedules/load";

const selectedDate = document.getElementById("date");

const inputToday = dayjs(new Date()).format("YYYY-MM-DD");

selectedDate.value = inputToday;

document.addEventListener("DOMContentLoaded", () => {
  schedulesDays();
});