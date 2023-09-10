import { useEffect, useState } from 'react'
import './scss/App.scss'
import axios from 'axios'
import PokemonCollection from './components/PokemonCollection'
import { Pokemon } from './interface'
import Pokeball_loading from './assets/ezgif.com-gif-maker (1).gif'
import Pikachu from '../src/assets/pikachu-run-unscreen.gif'
import Pokedex from '../src/assets/pokedex-banner.png'

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [nextURL, setNextURL] = useState<string>("")

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=12&offset=0")
      setNextURL(res.data.next)

      const initialPokemons: Pokemon[] = []

      // Charger les 10 premiers pokémons
      for (const pokemon of res.data.results) {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        initialPokemons.push(poke.data)
      }

      setPokemons(initialPokemons)
    }

    getPokemon() // Appel de getPokemon lors du montage initial
  }, [])

  const nextPage = async () => {
    if (nextURL) {
      const res = await axios.get(nextURL)
      setNextURL(res.data.next)

      const newPokemons: Pokemon[] = []

      for (const pokemon of res.data.results) {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)

        if (!newPokemons.some((p) => p.id === poke.data.id)) {
          newPokemons.push(poke.data)
        }
      }

      setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons])
    }
  }

  return (
    <div className='App'>
      <div className="container">
        <header className='pokemon-header'> <img className='pokedex-banner' src={Pokedex} /> </header>
        <PokemonCollection pokemons={pokemons} />
        <button className='loading-button' onClick={nextPage}> <img id="pokeball-loading" src={Pokeball_loading} /> </button>
        <img className='pikachu' src={Pikachu}/>
      </div>
    </div>
  )
}

export default App