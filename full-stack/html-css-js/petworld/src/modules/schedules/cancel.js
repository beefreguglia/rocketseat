import { scheduleCancel } from "../../services/schedule-cancel.js";
import { schedulesDays } from "./load.js"

const periods = document.querySelectorAll(".period");

periods.forEach((period) => {
  period.addEventListener("click", async (event) => {
    if(event.target.classList.contains("btn-link")) {
      const item = event.target.closest("li");
      const { id } = item.dataset;
      if(id) {
        const isConfirm = confirm("Tem certeza que deseja cancelar o agendamento?");

        if (isConfirm) {
          await scheduleCancel({ id: Number(id) });
          schedulesDays();
        }
      }
    }
  })
})