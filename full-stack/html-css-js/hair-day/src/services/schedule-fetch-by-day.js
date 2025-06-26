import dayjs from "dayjs";
import { apiConfig } from "./api-config";

export async function scheduleFetchByDay({ date }) {
  try {
    // Fazendo a requisição para enviar os dados do agendamento.
    const response = await fetch(`${apiConfig.baseURL}/schedules`);

    // Converte para JSON a requisição.
    const data = await response.json();

    // Filtra os agendamentos pelo dia selecionado.
    const dailySchedules = data.filter((schedule) => 
      dayjs(date).isSame(schedule.when, "day")
    );
    
    return dailySchedules;
  } catch (error) {
    console.log(error);
    alert("Não foi possível buscar os agendamentos do dia selecionado.")
  }
}