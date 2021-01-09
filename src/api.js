const fetchImages = async (breed) => {
    const responce = await fetch(
        `https://dog.ceo/api/breed/${breed}/images/random/12`
    )
    const data = await responce.json()
    return data.message
}

export { fetchImages }