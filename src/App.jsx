import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchImages, fetchBreedList } from './api'

const Header = () => {
    return (
        <header className="hero is-dark is-bold">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">Cute Dog Images</h1>
                </div>
            </div>
        </header>
    )
}

const Image = (props) => {
    return (
        <div className="card">
            <div className="card-image">
                <figure
                    className="image"
                    style={{
                        aspectRatio: '1/1',
                    }}
                >
                    <img
                        src={props.src}
                        alt="cute dog"
                        style={{
                            aspectRatio: '1/1',
                            objectFit: 'cover',
                        }}
                    />
                </figure>
            </div>
        </div>
    )
}

const Loading = () => {
    return <p>Loading…</p>
}

const Gallery = (props) => {
    const { urls } = props
    if (urls === null) {
        return <Loading />
    }
    return (
        <div className="columns is-vcentered is-multiline">
            {urls.map((url) => {
                return (
                    <div key={url} className="column is-3">
                        <Image src={url} />
                    </div>
                )
            })}
        </div>
    )
}

const Form = (props) => {
    const [breeds, setBreeds] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        const { breed, limit } = e.target.elements
        props.onFormSubmit(breed.value, limit.value)
    }

    useEffect(() => {
        fetchBreedList().then((list) => {
            setBreeds(list)
        })
    }, [])

    return (
        <div>
            {breeds.length > 0 && (
                <form onSubmit={handleSubmit}>
                    <div className="columns">
                        <div className="column">
                            <div className="select is-fullwidth">
                                <select name="breed" defaultValue="shiba">
                                    {breeds.map((breed) => {
                                        return (
                                            <option
                                                key={breed}
                                                value={breed.replace(' ', '/')}
                                            >
                                                {breed}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="column">
                            <div className="select is-fullwidth">
                                <select name="limit" defaultValue="12">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                            </div>
                        </div>
                        <div className="column">
                            <button type="submit" className="button is-dark">
                                Reload
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    )
}

const Main = () => {
    const [urls, setUrls] = useState(null)

    const loadImages = useCallback(
        (breed, limit) => {
            fetchImages(breed, limit).then((urls) => {
                setUrls(urls)
            })
        },
        [fetchImages, setUrls]
    )

    useEffect(() => loadImages('shiba'), [])

    return (
        <main>
            <section className="section">
                <div className="container">
                    <Form onFormSubmit={loadImages} />
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <Gallery urls={urls} />
                </div>
            </section>
        </main>
    )
}

const Footer = () => {
    return (
        <footer className="footer">
            <div className="content has-text-centered">
                <p>Dog images are retrieved from Dog API</p>
                <p>
                    <a href="https://dog.ceo/dog-api/about">
                        Donate to Dog API
                    </a>
                </p>
            </div>
        </footer>
    )
}

const App = () => {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateRows: 'auto 1fr auto',
                gridTemplateColumns: '100%',
                minHeight: '100vh',
            }}
        >
            <Header />
            <Main />
            <Footer />
        </div>
    )
}

export default App
