import './FavoritePage.scss'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import inkognito from '../../../images/inkognito.jpg'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const FavoritePage = () => {
    const navigate = useNavigate()
    const userOnline = useSelector(state => state.login.userOnline)

    useEffect(() => {
        if (!userOnline) {
            navigate('/')
        }
    }, [userOnline, navigate])


    return (
        <motion.div
            className="app__favorite"
            initial={{ opacity: 0, transition: { duration: 0.1 } }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
        >
            <div className="app__favorite-text">Ваши избранные персонажи
                <button >Очистить все</button>
            </div>
            <div className="app__favorite-grid">
                <div
                    className="char__item  favorite__item"
                    timeout={700}
                >
                    <button className="favorite__item-delete">Удалить</button>
                    <img src={inkognito} alt='inkognito' className='' />
                    <div className="char__name">name</div>
                    <div className="char__item-playedby">Кто играл :</div>
                    <Link to="/info"><button>Больше информации</button></Link>
                </div>
                <div
                    className="char__item favorite__item"
                    timeout={700}
                >
                    <button className="favorite__item-delete">Удалить</button>
                    <img src={inkognito} alt='inkognito' className='' />
                    <div className="char__name">name</div>
                    <div className="char__item-playedby ">Кто играл :</div>
                    <Link to="/info"><button>Больше информации</button></Link>
                </div>
            </div>
        </motion.div>
    )
}

export default FavoritePage;