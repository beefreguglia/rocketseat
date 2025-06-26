import { apiConfig } from "./api-config.js";

export async function scheduleNew({ id, tutor, pet, description, phoneNumber, when }) {
  try {
    await fetch(`${apiConfig.baseURL}/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      
      body: JSON.stringify({
        id: String(id),
        when,
        tutor,
        phone_number: phoneNumber,
        pet_name: pet,
        description,
      })
    });
    
    alert("Agendamento realizado com sucesso!");
  } catch (error) {
    console.log(error);
    alert("Não foi possível agendar, tente novamente mais tarde");
  }
}