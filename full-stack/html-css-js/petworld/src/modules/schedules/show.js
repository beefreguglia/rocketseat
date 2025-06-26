import dayjs from "dayjs";

const periodMorning = document.getElementById("period-morning");
const periodAfternoon = document.getElementById("period-afternoon");
const periodNight = document.getElementById("period-night");

export async function scheduleShow({ dailySchedules }) {
  try {
    periodMorning.innerHTML = "";
    periodAfternoon.innerHTML = "";
    periodNight.innerHTML = "";

    dailySchedules.forEach((schedule) => {
      const item = document.createElement("li");
      const time = document.createElement("strong");
      const div = document.createElement("div");
      const name = document.createElement("p");
      const description = document.createElement("p");
      const petName = document.createElement("strong");
      const cancelButton = document.createElement("button");
      
      const hour = dayjs(schedule.when).format("HH:mm");
      item.setAttribute("data-id", schedule.id);
      time.textContent = hour;
      
      petName.textContent = schedule.pet_name;
      name.append(petName);
      name.innerHTML = ` <strong>${schedule.pet_name}</strong> / ${schedule.tutor}`;

      div.append(time, name);
      description.textContent = schedule.description;

      cancelButton.classList.add("btn-link");
      cancelButton.textContent = "Remover agendamento";
      cancelButton.type = "button";

      item.append(div, description, cancelButton);

      const [hourNumber] = hour.split(":")
      if (Number(hourNumber) <= 12) {
        periodMorning.appendChild(item);
      } else if (Number(hourNumber) > 12 && Number(hourNumber) <=18) {
        periodAfternoon.appendChild(item);
      } else {
        periodNight.appendChild(item);
      }
    });
  } catch (error) {
    console.log(error);
    alert("Não foi possível exibir os agendamentos.");
  }
}