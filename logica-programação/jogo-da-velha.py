# tabuleiro = [
#   [' ', ' ', ' '],
#   [' ', ' ', ' '],
#   [' ', ' ', ' '],
# ]
import os

tabuleiro = [[' ' for _ in range(3)] for _ in range(3)]

jogador = 'X'

def exibeTabuleiro():
  for linha in tabuleiro:
    print('|'.join(linha))
    print('-' * 5)

def jogada(linha, coluna):
  if (
    linha < 0 or linha > 2 or 
    coluna < 0 or coluna > 2 or 
    tabuleiro[linha][coluna] != ' '
  ):
    print('Jogada inválida')
    return jogador
  tabuleiro[linha][coluna] = jogador
  return 'O' if jogador == 'X' else 'X'

def temGanhador():
  for linha in range(3):
    if(
      tabuleiro[linha][0] != ' ' and
      tabuleiro[linha][0] == tabuleiro[linha][1] and
      tabuleiro[linha][0] == tabuleiro[linha][2]
    ):
      print(f'{tabuleiro[linha][0]} Ganhou!')
      return True
    
  for coluna in range(3):
    if(
      tabuleiro[0][coluna] != ' ' and
      tabuleiro[0][coluna] == tabuleiro[1][coluna] and
      tabuleiro[0][coluna] == tabuleiro[2][coluna]
    ):
      print(f'{tabuleiro[0][coluna]} Ganhou!')
      return True
    
  if(
    tabuleiro[1][1] != ' ' and
    (
      tabuleiro[0][0] == tabuleiro[1][1] and
      tabuleiro[0][0] == tabuleiro[2][2]
    ) or
    (
      tabuleiro[0][2] == tabuleiro[1][1] and
      tabuleiro[1][1] == tabuleiro[2][2]
    )
  ):
    print(f'{tabuleiro[1][1]} Ganhou!')
    return True

def temEmpate():
  for linha in range(3):
    for coluna in range(3):
      if tabuleiro[linha][coluna] == ' ':
        return False
  print('Acabou empatando!')
  return True

os.system('clear')

while True:
  print('')
  print(f'Jogador da vez: {jogador}')
  print('')
  try:
    linha = int(input('Digite a Linha: '))
    coluna = int(input('Digite a coluna: '))
    os.system('clear')
    jogador = jogada(linha, coluna)
    print('')
    exibeTabuleiro()
  except (ValueError, IndexError):
    print('Digite valores numéricos entre 0 e 2.')
  if temGanhador() or temEmpate():
    break