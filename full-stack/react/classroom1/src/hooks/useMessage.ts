export function useMessage(name: string, age: number) {
  function show(message: string) {
    console.log(name, age, message)
  }

  return { show }
}