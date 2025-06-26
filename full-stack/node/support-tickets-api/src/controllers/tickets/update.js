export function update({ request, response, database }) {
  const { id } = request.params
  const { equipment, description, user_name } = request.body

  database.update("tickets", id, {
    equipment,
    description,
    user_name,
    updated_at: new Date(),
  })

  return response.end()
}