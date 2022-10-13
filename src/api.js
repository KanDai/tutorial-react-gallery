const fetchImages = async (breed, limit = 12) => {
    const response = await fetch(
        `https://dog.ceo/api/breed/${breed}/images/random/${limit}`
    )
    const data = await response.json()
    return data.message
}

const fetchBreedList = async () => {
    const response = await fetch(
        `https://dog.ceo/api/breeds/list/all`
    )
    const data = await response.json()
    const breeds = data.message

    return Object.keys(breeds).flatMap(breed => {
        if (breeds[breed].length > 0) {
            return breeds[breed].map(subBreed => {
                return `${breed} ${subBreed}`
            })
        } else {
            return breed
        }
    })
}

export { fetchImages, fetchBreedList }