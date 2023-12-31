import { useHttp } from "../components/hooks/http.hook";

const useCharService = () => {
    const { request } = useHttp();
    const _apiBase = "https://rickandmortyapi.com/api/character";
    const _pageBase = 1;

    const getAllCharacters = async (page = _pageBase) => {
        const res = await request(`${_apiBase}/?page=${page}`);
        return res.results.map(_transformCharacter);
    };
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}/${id}`);
        return _transformCharacter(res);
    };

    const getFavoriteCharacters = async (id) => {
        const res = await request(`${_apiBase}/${id}`);
        return res.map(_transformCharacter);
    };
    const getSearchCharacters = async (name) => {
        if (name === "") {
            return [];
        }
        const res = await request(`${_apiBase}/?name=${name}`);
        return res.results.map(_transformCharacter);
    };

    const _transformCharacter = (char) => {
        return {
            name: char.name,
            species: char.species,
            image: char.image,
            status: char.status,
            location: char.location.name,
            id: char.id,
            type: char.type,
            origin: char.origin.name,
        };
    };

    return {
        getSearchCharacters,
        getFavoriteCharacters,
        getAllCharacters,
        getCharacter,
    };
};

export default useCharService;
