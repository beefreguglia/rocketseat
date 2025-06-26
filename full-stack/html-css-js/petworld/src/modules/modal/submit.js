import dayjs from 'dayjs';
import { scheduleNew } from '../../services/schedule-new';
import { schedulesDays } from '../schedules/load';

const form = document.getElementById("modal");
const tutorInput = document.getElementById("tutor");
const petInput = document.getElementById("pet");
const phoneInput = document.getElementById("phone");
const descriptionTextArea = document.getElementById("description");
const dateInput = document.getElementById("schedule-date");
const hourInput = document.getElementById("hour");
const modalOverlay = document.getElementById("overlay");

phoneInput.addEventListener("input", () => {
  let phoneNumber = phoneInput.value;
  phoneNumber = phoneNumber.replace(/\D/g, '');
  phoneNumber = phoneNumber.toString().replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
  phoneInput.value = phoneNumber;
})

form.onsubmit = async (event) => {
  event.preventDefault();
  try {
    const tutorName = tutorInput.value.trim();
    const petName = petInput.value.trim();
    const phoneNumber = phoneInput.value;
    const description = descriptionTextArea.value;
    const date = dateInput.value;
    const hours = hourInput.value;
    
    if (!tutorName) {
      return alert("Informe o nome do tutor.");
    }

    if (!petName) {
      return alert("Informe o nome do pet.");
    }

    if (!phoneNumber) {
      return alert("Informe o número de contato.");
    }

    if (!description) {
      return alert("Informe a descrição do atendimento.")
    }

    if (!date) {
      return alert("Informe a data do atendimento.");
    }

    if (!hours) {
      return alert("Informe a hora do atendimento.")
    }

    const [hour, minutes] = hours.split(":");
    let when = dayjs(date).add(hour, "hour");
    when = when.add(minutes, "minutes")
    const id = new Date().getTime();

    await scheduleNew({
      id,
      tutor: tutorName,
      pet: petName,
      phoneNumber,
      description,
      when,
    });

    await schedulesDays();

    modalOverlay.classList.add("hide");

    tutorInput.value = ""
    petInput.value = "";
    phoneInput.value = "";
    descriptionTextArea.value = "";
    dateInput.value = "";
    hourInput.value = "";
  } catch (error) {
    alert("Não foi possível realizar o agendamento");
    console.log(error);
  }
}