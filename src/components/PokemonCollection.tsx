import { Pokemon } from '../interface';
import PokemonList from './PokemonList';
import './pokemonStyle.css';



interface Props {
  pokemons: Pokemon[]
}

function PokemonCollection(props: Props) {
    const { pokemons } = props
    return (
        <section className='collection-container'> 
        {pokemons.map((pokemon) => {
            return (
                <PokemonList 
                key={pokemon.id} 
                nom={pokemon.name} 
                id={pokemon.id} 
                image = {pokemon.sprites.front_default}
                type={pokemon.types[0].type.name}
                />
            )
        })}
        </section>
    )
}

export default PokemonCollection;