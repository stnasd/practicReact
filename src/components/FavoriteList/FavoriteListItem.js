import dataTextButtonsOnline from "../context/context";
import { useContext } from "react";

const FavoriteList = ({
    favoriteIdCharacters,
    onDeleteFavorite,
    onChangeTargetCharacter,
}) => {
    const textButtonsContext = useContext(dataTextButtonsOnline);
    const { deleted } = textButtonsContext;
    const renderItems = (arr) => {
        return arr.map((item) => {
            const { image, name, id, origin } = item;
            const buttonDelete = (
                <button
                    className="button__char-add"
                    onClick={() => onDeleteFavorite(id)}
                >
                    {deleted}
                </button>
            );
            return (
                <div className="char__item" timeout={700} key={id + name}>
                    <img src={`${image}`} alt={name} />
                    <div className="char__name">name : {name}</div>
                    <div className="char__item-playedby">Origin : {origin}</div>
                    {buttonDelete}
                    <button
                        className="char__info-button"
                        onClick={() => onChangeTargetCharacter(id)}
                    >
                        Больше информации
                    </button>
                </div>
            );
        });
    };
    const favoriteItems = renderItems(favoriteIdCharacters);

    return <>{favoriteItems}</>;
};

export default FavoriteList;
