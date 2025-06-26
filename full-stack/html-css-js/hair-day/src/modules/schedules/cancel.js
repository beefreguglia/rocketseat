import { scheduleCancel } from "../../services/schedule-cancel.js";
import { schedulesDays } from "./load.js"

const periods = document.querySelectorAll(".period");

// Gera evento de click para cada lista (manhã, tarde e noite).
periods.forEach((period) => {
  period.addEventListener("click", async (event) => {
    if(event.target.classList.contains("cancel-icon")) {
      // Obtém a li pai do elemento clicado
      const item = event.target.closest("li");

      // Pegamos o id do agendamento para remover.
      const { id } = item.dataset;

      // Confirma se o id foi selecionado.
      if(id) {
        // Confirma se o usuário quer cancelar.
        const isConfirm = confirm("Tem certeza que deseja cancelar o agendamento?");

        if (isConfirm) {
          // Faz a requisição para cancelar um agendamento.
          await scheduleCancel({ id: Number(id) });

          // Recarrega os agendamentos.
          schedulesDays();
        }
      }
    }
  })
})