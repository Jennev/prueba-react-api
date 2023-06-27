import { useState, useEffect } from 'react'
import Logo from '../assets/img/logo.png'
import Buscador from './Buscador'
import Card from './Card'

const MiApi = () => {
    const [personajes, setPersonajes] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('')

    useEffect(() => {
        const getPersonajes = async () => {
            try {
                const response = await fetch('https://rickandmortyapi.com/api/character');
                const data = await response.json();
                const sortedData = data.results.sort((a, b) => a.name.localeCompare(b.name));
                setPersonajes(sortedData);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getPersonajes();
    }, []);

    const personjesFiltrados = personajes.filter((personaje) =>
        personaje.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );

    return (
        <div className='container'>
            <figure className='logo'>
                <img src={Logo} alt='Logo de Rick & Morty' />
            </figure>
            {/* form filtrar */}
            <Buscador filter={filter} setFilter={setFilter} />
            {/* form filtrar */}

            {/* section personajes */}
            <section className='lista-personajes'>
                {loading ? (
                    <p>Cargando...</p>
                ) : personjesFiltrados.length > 0 ? (
                    personjesFiltrados.map((personaje) => (
                        <Card key={personaje.id} personaje={personaje} />
                    ))
                ) : (
                    <p>
                        No se encontraron personajes con la búsqueda <strong>"{filter}"</strong>.
                    </p>
                )}
            </section>
            {/* section personajes */}
        </div>
    );
};

export default MiApi;