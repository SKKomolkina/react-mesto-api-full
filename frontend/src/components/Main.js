import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Card from './Card.js';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div className="profile__container">
                    <div className="profile__photo-wrapper" onClick={onEditAvatar}>
                        <img name="avatar"
                            src={currentUser.avatar}
                            alt="Ваше фото" className="profile__photo" />
                    </div>

                    <div className="profile__info">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="profile__btn-edit" type="button" value="" onClick={onEditProfile}></button>
                        <p className="profile__about">{currentUser.about}</p>
                    </div>

                    <button className="profile__btn-add" type="button" onClick={onAddPlace}></button>
                </div>
            </section>

            <section className="photos">
                {cards.map(card => (
                <Card
                    card={card}
                    key={card._id}
                    onCardClick={onCardClick}
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete}  
                    />
                    )
                    )}
            </section>
        </main>
    )
}

export default Main