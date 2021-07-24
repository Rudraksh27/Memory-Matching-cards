import React, { useState, useEffect } from 'react';
import './App.css';

const pokemon = [
  { id: 1, name: 'bulbasaur' },
  { id: 4, name: 'charmander' },
  { id: 7, name: 'squirtle' },
  { id: 25, name: 'pikachu' },
  { id: 39, name: 'jigglypuff' },
  { id: 129, name: 'magikarp' },
];

const doublePokemon = shuffle([...pokemon, ...pokemon]);

export default function App() {
  const [opened, setOpened] = useState([]); //using index
  const [matched, setMatched] = useState([]); //pokemon.id
  const [moves, setMoves] = useState(0);

  //check if there is a match
  //if there are 2 in the opened array, check if they match
  useEffect(() => {
    if (opened.length < 2) return;

    const firstPokemon = doublePokemon[opened[0]];
    const secondPokemon = doublePokemon[opened[1]];

    if (firstPokemon.name === secondPokemon.name)
      setMatched((matched) => [...matched, firstPokemon.id]);
  }, [opened]);

  //clear cars after 2 have been selected
  useEffect(() => {
    if (opened.length === 2) setTimeout(() => setOpened([]), 800);
  }, [opened]);

  //check if there is a winner
  useEffect(() => {
    if (matched.length === pokemon.length) alert('CONGRATS! You completed the game!');
  }, [matched]);



  function flipCard(index) {
    //PROBLEM FIXED
    //if same card was clicked
    if (opened.includes(index)) return;

    setMoves((moves) => moves + 1);
    setOpened(opened => [...opened, index]);
  }

  return (
    <div className="app">
      <h4 className="title">Select all the matching cards to WIN!</h4>
      <p className="moves"><strong>moves</strong>{moves}</p>
      <p className="match"><strong>matched</strong>{matched.length}</p>

      <div className="cards">
        {doublePokemon.map((pokemon, index) => {
          let isFlipped = false;

          //logic to see if opened
          if (opened.includes(index)) isFlipped = true;
          if (matched.includes(pokemon.id)) isFlipped = true;

          return (
            <PokemonCard
              key={index}
              index={index}
              pokemon={pokemon}
              isFlipped={isFlipped}
              flipCard={flipCard}
            />
          );
        })}
      </div>
    </div>
  );
}

//function to shuffle
function shuffle(array) {
  var currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function PokemonCard({ index, pokemon, isFlipped, flipCard }) {
  return (

    <button
      className={`pokemon-card ${isFlipped ? 'flipped' : ''}`}
      onClick={() => flipCard(index)}
    >
      <div className="inner">
        <div className="front">
          <img
            src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
            width="100"
          />
        </div>
        <div className="back">?</div>
      </div>
    </button>
  );
}
