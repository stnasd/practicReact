import { clearInput } from "./FoundCharactersPage.slice";
import { useAllSelectors } from "../../selectors/selectors";
import CharsList from "../../CharsList/CharsList";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";
import Spinner from "../../Spinner/Spinner";
import { useLazyGetInfoUserQuery } from "../../../apiFirebase/apiFireBase.Slice";
import { useUpdateFavoriteMutation } from "../../../apiFirebase/apiFireBase.Slice";
import { useDeleteFavoriteMutation } from "../../../apiFirebase/apiFireBase.Slice";
import { fetchCharacter } from "../MainPage/MainPage.Slice";
import "./FoundCharactersPage.scss";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const FoundCharactersPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [updateFavoriteFn] = useUpdateFavoriteMutation();
    const [deleteFavoriteFn] = useDeleteFavoriteMutation();
    const [triggerGetinfo] = useLazyGetInfoUserQuery();
    const {
        charsLoadingStatus,
        userEmail,
        userOnlineFavorite,
        userOnline,
        foundСharacters,
    } = useAllSelectors();

    useEffect(() => {
        if (!userOnline) {
            navigate("/");
        }
    }, [userOnline, navigate]);

    useEffect(() => {
        dispatch(clearInput());
        triggerGetinfo(userEmail);
    }, [triggerGetinfo, userEmail, dispatch]);

    if (charsLoadingStatus === "loading") {
        return <Spinner />;
    } else if (charsLoadingStatus === "error") {
        return <h5>Ошибка загрузки</h5>;
    }

    const onChangeTargetCharacter = (e) => {
        dispatch(fetchCharacter(e));
        navigate("/info");
    };

    const onAddNewFavorite = (newFavorite) => {
        updateFavoriteFn({ userEmail, newFavorite });
    };
    const onDeleteFavorite = (favoriteItem) => {
        deleteFavoriteFn({ userEmail, favoriteItem });
    };

    return (
        <motion.div
            className="app__search"
            initial={{ opacity: 0, transition: { duration: 0.1 } }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
            <div className="app__search-text">По вашему запросу найдено</div>
            <div className="search__block">
                <div className="search__block-grid">
                    <ErrorBoundary>
                        <CharsList
                            charactersList={foundСharacters}
                            favorite={userOnlineFavorite}
                            onChangeTargetCharacter={onChangeTargetCharacter}
                            onAddNewFavorite={onAddNewFavorite}
                            onDeleteFavorite={onDeleteFavorite}
                            userOnline={userOnline}
                        />
                    </ErrorBoundary>
                </div>
            </div>
        </motion.div>
    );
};

export default FoundCharactersPage;
