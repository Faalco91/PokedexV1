
import React, { useEffect, useState } from 'react'
import './scss/App.scss'
import axios from 'axios'
import PokemonCollection from './components/PokemonCollection'
import { Pokemon } from './interface'

interface Pokemons {
  name: string
  url: string
}



function App() {

  const [pokemons, SetPokemons] = useState<Pokemon[]>([])
  const [nextURL, setNextURL] = useState<string>("")

  useEffect(() => {
    const getPokemon = async () => {

      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=20");
      setNextURL(res.data.next)

      res.data.results.forEach(async(pokemon: Pokemons) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)

        SetPokemons ((p) => [...p, poke.data])

      });

    }
    getPokemon();
  }, [])

  const nextPage = async () => {

    let res = await axios.get(nextURL)
    setNextURL(res.data.next)

    res.data.results.forEach(async(pokemon: Pokemons) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)

      SetPokemons ((p) => [...p, poke.data])
    });

  }

  return <div className='App'>
    <div className="container">
      <header className='pokemon-header'>POKEDEX</header>
      <PokemonCollection pokemons = {pokemons}/>
      <button onClick={nextPage}> Charger </button>
    </div>
  </div>

}

export default App
