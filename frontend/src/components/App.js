import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';

import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
    const [currentUser, setCurrentUser] = React.useState({});

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

    const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });

    const [cards, setCards] = React.useState([]);


    React.useEffect(() => {
        api.getUserData()
            .then((data) => {
                setCurrentUser(data);
            })
            .catch((err) => console.log(err));
    }, []);

    React.useEffect(() => {
        api.getInitialCards()
            .then((cards) => {
                setCards(cards);
            })
            .catch((err) => {
                console.log(err);
            })

    }, []);

    React.useEffect(() => {
        const closeByEsc = (e) => {
            if (e.key === 'Escape') {
                closeAllPopups();
            }
        }
        document.addEventListener('keydown', closeByEsc);

        return () => document.removeEventListener('keydown', closeByEsc)
    }, []);


    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleUpdateUser({ name, about }) {
        api.editProfile(name, about)
            .then((data) => {
                setCurrentUser(data);
                setIsEditProfilePopupOpen(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardClick(selectedCard) {
        setSelectedCard({ name: selectedCard.name, link: selectedCard.link });
    }

    function handleUpdateAvatar({ avatar}) {
        api.changeAvatar(avatar)
            .then((data) => {
                setCurrentUser(data);
                setIsEditAvatarPopupOpen(false);
            })
            .catch((err) => console.log(err));
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        const changeLike = isLiked ? api.deleteLike(card._id) : api.setLike(card._id)
        changeLike.then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch((err) => console.log(err));
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                const newCard = cards.filter((c) => c._id !== card._id);
                setCards(newCard);
            })
            .catch((err) => console.log(err));
    }

    function handleAddPlaceSubmit(card) {
        api.addCard(card.name, card.link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                setIsAddPlacePopupOpen(false);
            })
            .catch((err) => console.log(err));
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);

        setSelectedCard({ name: '', link: '' });
    }



    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="root">
                <Header />

                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}

                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}

                    cards={cards}
                />

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

                <Footer />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
