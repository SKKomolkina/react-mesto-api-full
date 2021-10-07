import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeDescription(evt) {
        setDescription(evt.target.value);
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen])

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            buttonText='Сохранить'

            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                onChange={handleChangeName}
                value={name || ''}

                id="popup__input_type_name"
                className="popup__input popup__input_type_name"
                type="text"
                name="name"
                minLength="2"
                maxLength="40"
                placeholder="Имя"
                required
            />
            <span id="popup__input_type_name-error" className="popup__error"></span>

            <input
                onChange={handleChangeDescription}
                value={description || ''}

                id="popup__input_type_about"
                className="popup__input popup__input_type_about"
                type="text"
                name="about"
                minLength="2"
                maxLength="200"
                placeholder="О себе"
                required
            />
            <span id="popup__input_type_about-error" className="popup__error"></span>

        </PopupWithForm>
    )
}

export default EditProfilePopup;