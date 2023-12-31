import {
    useLazyGetInfoUserQuery,
    useDeleteHistoryMutation,
} from "../../../apiFirebase/apiFireBase.Slice";
import { getSearhHandleCharactersFetch } from "../FoundCharactersPage/FoundCharactersPage.slice";
import "./HistoryPage.scss";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const HistoryPage = () => {
    const dispatch = useDispatch();
    const [deleteHistoryFn] = useDeleteHistoryMutation();
    const [triggerGetinfo] = useLazyGetInfoUserQuery();
    const navigate = useNavigate();
    const userOnline = useSelector((state) => state.login.userOnline);
    const userHistory = useSelector((state) => state.login.userOnlineHistory);
    const email = useSelector((state) => state.login.userEmail);
    useEffect(() => {
        triggerGetinfo(email);
    }, [triggerGetinfo, dispatch, email]);

    useEffect(() => {
        if (!userOnline) {
            navigate("/");
        }
    }, [userOnline, navigate]);

    const onHandleClick = (item) => {
        dispatch(getSearhHandleCharactersFetch(item));
        navigate("/search");
    };
    const onDeleteItem = (newHistory, e) => {
        e.stopPropagation();
        deleteHistoryFn({ email, newHistory });
    };

    const renderSearchHistoyItemsFn = (itemsHistory) => {
        if (itemsHistory.length !== 0) {
            return itemsHistory.map((item) => {
                return (
                    <div
                        className="history__items-url"
                        key={item}
                        onClick={() => onHandleClick(item)}
                    >
                        {item}
                        <button
                            className="history__items-button"
                            onClick={(e) => onDeleteItem(item, e)}
                        >
                            Delete
                        </button>
                    </div>
                );
            });
        } else {
            return (
                <div className="history__items-url">
                    Истории поиска пока нет..
                </div>
            );
        }
    };
    const renderHistoryItems = renderSearchHistoyItemsFn(userHistory);
    return (
        <motion.div
            className="app__history"
            initial={{ opacity: 0, transition: { duration: 0.1 } }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
            <div className="app__history-block">
                <div className="history__text">История поиска</div>
                <div className="history__items">{renderHistoryItems}</div>
            </div>
        </motion.div>
    );
};

export default HistoryPage;
