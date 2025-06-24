print('Olá, eu sou a sua assistente, Pytrina. O que você quer fazer hoje?')

comando = input('Digite um comando: ')

match comando:
  case 'oi' | 'olá':
    print('Oi, como vai você?')
  case 'tchau' | 'fim' | 'sair':
    print('Tchau, foi bom conversar com você!')
  case 'piada':
    print('PIU!')
  case 'clima':
    print('Ta bem frio')
  case _:
    print('Desculpe, não entendi o comando...')