import { useState, useEffect } from 'react';


const MiApi = () => {
    const [characters, setCharacters] = useState([]);

    const getApi = async () => {
        try {
            const res = await fetch("https://rickandmortyapi.com/api/character");
            const data = await res.json();

            console.log(data.results);

            setCharacters(data.results);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getApi();
    }, []);

    return (
        <div className="App">
        <h1>Prueba React </h1>
        <h2>Personajes serie Rick and Morty</h2>
        
        {
          characters.map((characters) =>
            <div key={characters.id}>
              <h3>{characters.name}</h3>
              <img src={characters.image} alt="" />
              <p>{characters.species}</p>
            </div>)
        }
      </div>
    )
}

export default MiApi;