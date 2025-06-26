import dayjs from "dayjs";

import { scheduleNew } from "../../services/schedule-new.js";
import { schedulesDays } from "../schedules/load.js";

const form = document.querySelector("form");
const clientNameInput = document.getElementById("client");
const selectedDate = document.getElementById("date");

// Data atual para o input.
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

// Carrega data atual
selectedDate.value = inputToday;

// Define a data mínima como sendo a data atual.
selectedDate.min = inputToday;

form.onsubmit = async (event) => {
  // Previne o comportamento padrão de recarregar a página
  event.preventDefault();
  try {
    // Recuperando o nome do cliente
    const name = clientNameInput.value.trim();

    if (!name) {
      return alert("Informe o nome do cliente!");
    }

    // Recupera o horário selecionado.
    const hourSelected = document.querySelector(".hour-selected");

    if (!hourSelected) {
      return alert("Selecione a hora!");
    } 

    // Recupera somente a hora.
    const [hour] = hourSelected.innerText.split(":");
    
    //Insere a hora na data.
    const when = dayjs(selectedDate.value).add(hour, "hour");

    //Gera um ID.
    const id = new Date().getTime();

    // Faz o agendamento.
    await scheduleNew({
      id,
      name,
      when,
    });
    
    // Recarrega os agendamentos
    await schedulesDays();

    // Limpa o input de nome do cliente.
    clientNameInput.value = "";
  } catch (error) {
    alert("Não foi possível realizar o agendamento");
    console.log(error);
  }
}