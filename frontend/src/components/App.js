import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';

import Login from './Login';
import Register from './Register';

import {api} from '../utils/api';
import * as auth from '../utils/auth';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';

import successImage from '../images/success.svg';
import failImage from '../images/fail.svg';

function App() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    const [currentUser, setCurrentUser] = React.useState({});
    const [emailValue, setEmailValue] = React.useState('');

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

    const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
    const [infoPopupStatus, setInfoPopupStatus] = React.useState({ path: '', text: '' })

    const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
    const [cards, setCards] = React.useState([]);

    const history = useHistory();

    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.getContent(jwt).then((res) => {
                if (res) {
                    setEmailValue(res.data.email);
                    setCurrentUser(res);
                }
                setIsLoggedIn(true);
                history.push('/');
            })
                .catch(err => console.log(err))
        }

    }, [isLoggedIn, history])


    React.useEffect(() => {
        api.getUserData()
            .then((data) => {
                setCurrentUser(data);
            })
            .catch((err) => console.log(err));
    }, [])


    // <---------- Registration & Auth ---------->

    function registration(email, password) {
        auth.register(email, password)
            .then(() => {
                changeInfoPopup({
                    path: successImage,
                    text: 'Вы успешно зарегистрировались!',
                })
                console.log('yes')
                setTimeout(history.push, 3000, "/sign-in");
            })
            .catch(() => {
                changeInfoPopup({
                    path: failImage,
                    text: 'Что-то пошло не так! Попробуйте ещё раз.',
                })
                console.log('no');
            })
            .finally(() => {
                handleInfoPopupOpen();
                setTimeout(closeAllPopups, 3000);
            })
    }

    function authorization(email, password) {
        auth.authorize(email, password)
            .then((data) => {
                localStorage.setItem('jwt', data.token);
                setIsLoggedIn(true);
                history.push('/');
            })
            .catch(() => {
                changeInfoPopup({
                    path: failImage,
                    text: 'Что-то пошло не так! Попробуйте ещё раз.',
                })
                console.log('no');
            })
    }


    function signOut() {
        localStorage.removeItem('jwt');
        history.push('/sign-in');
    }

    // <---------- Open & Close ---------->

    function changeInfoPopup({ path, text }) {
        setInfoPopupStatus({
            path: path,
            text: text,
        })
    }

    function handleInfoPopupOpen() {
        setIsInfoPopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsInfoPopupOpen(false);

        setSelectedCard({ name: '', link: '' });
    }

    React.useEffect(() => {
        const closeByEsc = (e) => {
            if (e.key === 'Escape') {
                closeAllPopups();
            }
        }
        document.addEventListener('keydown', closeByEsc);

        return () => document.removeEventListener('keydown', closeByEsc)
    }, [])



    // <---------- Update User & Avatar ---------->

    function handleUpdateUser(data) {
        const jwt = localStorage.getItem('jwt');

        api.editProfile(data, jwt)
            .then((data) => {
                setCurrentUser(data);
                setIsEditProfilePopupOpen(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar(data) {
        const jwt = localStorage.getItem('jwt');

        api.changeAvatar(data, jwt)
            .then((data) => {
                setCurrentUser(data);
                setIsEditAvatarPopupOpen(false);
            })
            .catch((err) => console.log(err));
    }


    // <---------- PhotoCards Actions ---------->

    function handleAddPlaceSubmit(card) {
        const jwt = localStorage.getItem('jwt');

        api.addCard(card, jwt)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                setIsAddPlacePopupOpen(false);
            })
            .catch((err) => console.log(err));
    }

    function handleCardLike(card) {
        const jwt = localStorage.getItem('jwt');
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        const changeLike = (newCard) => {
            const newCards = cards.map((item) => item._id === card._id ? newCard : item);
            setCards(newCards);
        }

        if (!isLiked) {
            api.setLike(card._id, jwt)
                .then((newCard) => {
                    changeLike(newCard);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    function handleCardDelete(card) {
        const jwt = localStorage.getItem('jwt');

        api.deleteCard(card._id, jwt)
            .then(() => {
                const newCard = cards.filter((c) => c._id !== card._id);
                setCards(newCard);
                closeAllPopups();
            })
            .catch((err) => console.log(err));
    }

    function handleCardClick(selectedCard) {
        setSelectedCard({ name: selectedCard.name, link: selectedCard.link });
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="root">
                <Header
                    email={emailValue}

                    signOut={signOut}
                />

                <Switch>

                    <ProtectedRoute
                        exact path="/"
                        isLoggedIn={isLoggedIn}
                        component={Main}

                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}

                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}

                        cards={cards}
                    />

                    <Route path="/sign-in">
                        <Login authorization={authorization} />
                    </Route>

                    <Route path="/sign-up">
                        <Register registration={registration} />
                    </Route>

                    <Route path="/">
                        {
                            isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />
                        }
                    </Route>
                </Switch>

                <Footer />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}

                    onUpdateAvatar={handleUpdateAvatar}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}

                    onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}

                    onAddPlace={handleAddPlaceSubmit}
                />

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

                <InfoTooltip
                    isOpen={isInfoPopupOpen}
                    onClose={closeAllPopups}

                    infoPopupStatus={infoPopupStatus}
                />

            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
