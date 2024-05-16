import React, { useState, useEffect } from 'react';

export default function DisplayPokemon() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await fetch('/api/pokemon');
    const data = await res.json();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderEvolutions = (evolution) => {
    if (!evolution ) {
      return null;
    }

    return (
      <div key={evolution.pokedex_id} className="evolution-container">
        <p className="evolution-name">{evolution.name === undefined ? "" : `Pokémon : ${evolution.name}`}</p>
        <p className="evolution-condition">{evolution.condition === undefined ? "" : `Condition d'évolution : ${evolution.condition}`}</p>
        {evolution.next && evolution.next.length > 0 && (
          <div className="next-evolution">
            <p className="next-evolution-label">Évolution suivante:</p>
            {renderEvolutions(evolution.next[0])}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="pokemon-container">
        <div className="pokemon-infos-global">            
            <h1 className="pokemon-title">Pokémon</h1>
            {data && <p className="pokemon-info"><img className="pokemon-image" width="200px" src={data.sprites.regular} alt=""></img></p>}
            {data && <p className="pokemon-info pokemon-name">Nom : {data.name.fr}</p>}
            {data && <p className="pokemon-info pokemon-height">Hauteur : {data.height}</p>}
            {data && <p className="pokemon-info pokemon-weight">Poids : {data.weight}</p>}
            {data && 
                <p className="pokemon-info pokemon-type">
                    <p className="pokemon-type-label">Type 1 :</p>
                    <div className="pokemon-type-image-container">
                        <p className="pokemon-type">{data.types[0].name}</p>
                        <img width="25px" class="pokemon-image" src={data.types[0].image} alt={data.types[0].name} />
                    </div>
                </p>}
            {data && 
                <p className="pokemon-info pokemon-type">
                    <p className="pokemon-type-label">Type 2 :</p>
                    {data.types[1] === undefined ? "Aucun" : data.types[1].name}
                    <div className="pokemon-type-image-container">
                        {data.types[1] === undefined ? "" : <img width="25px" class="pokemon-image" src={data.types[1] === undefined ? "" : data.types[1].image} alt={data.types[1] === undefined ? "" : data.types[1].name}></img>}
                    </div>
                </p>}
       
        </div>
      {data && data.evolution && renderEvolutions(data.evolution)}
      <button className="pokemon-button" onClick={fetchData}>Recharger</button>
    </div>
  );
}