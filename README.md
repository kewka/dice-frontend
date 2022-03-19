<p align="center">
    <img src="docs/dice.svg" height="128" />
</p>

# Dice

Dice is a crypto PvP game.

Supported chains:

- BSC Testnet

## Game Rules

The first player (creator) creates a new game with the specified number of players and bet.
The game goes into **pending** status.
After joining the required number of players, all players roll the dice.
Whoever gets the highest score wins.
The total bet amount gets distributed among the winners.
In case of tie, the players get their money back.
Payouts occur and the game goes into **finished** status.

## Tech Stack

- react
- react-cosmos
- emotion
- ethers
- web3-react
- i18next
- react-query

## Links

- [Figma Template](https://www.figma.com/file/NocUQFLKEjxGjvEWlrDgJc/Dice)
- [Dice Contracts](https://github.com/kewka/dice-contracts)
