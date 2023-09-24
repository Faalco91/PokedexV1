import pokeball from "../assets/pokeball.png"
import './pokemonStyle.css'

interface Props {
    nom: string
    id: number
    image: string
    type: string

}

function PokemonList(props: Props){
    const { id, image, type, nom } = props
    return <div className="card-container">
        <section className="pokemon-list-container">
            <div className="top-pokemon-card">
                <img className="pokeball-card" src={pokeball}></img>
                <p className="pokemon-number-card">No.0{id}</p>
            </div>
            <div className="content-pokemon-card">
                <img className="pokemon-img-card" src={image} />
            </div>
            <div className="content-pokemon-info-card">
                <p className="pokemon-name-card">{nom}</p>
                <p className={`pokemon-type-card ${type}`}>{type}</p>
            </div>
        </section>
    </div>
}

export default PokemonList;