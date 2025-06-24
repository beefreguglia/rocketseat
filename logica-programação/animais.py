import os

perguntas = [
  ['Seu animal gosta de bananas?', 'macaco']
]

os.system('clear')

while True:
  print('Pense em um animal...')

  os.system('clear')
  acertou = False

  for pergunta in perguntas:
    resposta = input(f'{pergunta[0]} (s/n): ')
    if resposta.lower() == 's':
      print(f'Você pensou em {pergunta[1]}!')
      acertou = True
      break

  animal = input('Desisto! Em qual animal você pensou?')
  novaPergunta = input('Qual pergunta você faria para diferenciar esse animal?')

  perguntas.append([novaPergunta, animal])

  resposta = input('Quer jogar novamente? (s/n): ')
  if resposta.lower() != 's':
    break