import { useState, useEffect } from 'react'
import Logo from './assets/img/logo.png'
import Filtrar from './Components/Filter'
import Card from './Components/Card'

const MiApi = () => {
    const [personajes, setPersonajes] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('')

    useEffect(() => {
        const getPersonajes = async () => {
            try {
                const response = await fetch(
                    'https://rickandmortyapi.com/api/character'
             )
                const data = await response.json()
                setPersonajes(data.results)
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        getPersonajes()
    }, [])

    const personjesFiltrados = personajes.filter((personaje) =>
        personaje.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    )

    return (
        <div className='container'>
            <figure className='logo'>
                <img src={Logo} alt='Logo de Rick & Morty' />
            </figure>
            {/* form filtrar */}
            <Filtrar filter={filter} setFilter={setFilter} />
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
                        No se encontro personajes con la busqueda{' '}
                        <strong>"{filter}"</strong>.
                    </p>
                )}
            </section>
            {/* section personajes */}
        </div>
    )
}

export default MiApi;