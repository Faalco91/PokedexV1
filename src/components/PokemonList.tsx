import pokeball from "../assets/pokeball.png"
import './pokemonStyle.css'

interface Props {
   // name: string
    id: number
    image: string
    type: string

}

function PokemonList(props: Props){
    const { id, image, type } = props
    return <div>
        <section className={`pokemon-list-container ${type}`}>
            <div className="top-pokemon-card">
                <img className="pokeball-card" src={pokeball}></img>
                <p className="pokemon-number-card">No.0{id}</p>
            </div>
            <div className="content-pokemon-card">
                <img className="pokemon-img-card" src={image} />
            </div>
        </section>
    </div>
}

export default PokemonList;