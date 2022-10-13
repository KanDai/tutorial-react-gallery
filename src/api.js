const fetchImages = async (breed, limit = 12) => {
    const responce = await fetch(
        `https://dog.ceo/api/breed/${breed}/images/random/${limit}`
    )
    const data = await responce.json()
    return data.message
}

export { fetchImages }