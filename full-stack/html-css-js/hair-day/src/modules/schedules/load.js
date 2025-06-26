import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js";
import { scheduleShow } from "./show.js";
import { hoursLoad } from "../form/hours-load.js";

// Seleciona o input de data
const selectedDateInput = document.getElementById("date");

export async function schedulesDays() {
  // Obtém a data do input
  const selectedDate = selectedDateInput.value;

  // Busca na API os agendamentos para carregar do lado direito na tela.
  const dailySchedules = await scheduleFetchByDay({  date: selectedDate });
 
  // Exibe os agendamentos.
  scheduleShow({ dailySchedules });

  //Renderiza as horas disponíveis.
  hoursLoad({ date: selectedDate, dailySchedules });
  

  // Os horários disponíveis (horário futuro + não agendado).

}