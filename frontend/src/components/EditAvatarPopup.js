import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ name, isOpen, onClose, onUpdateAvatar }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [avatar, setAvatar] = React.useState('');

    React.useEffect(() => {
        setAvatar('');
    }, [currentUser, isOpen]);

    function handleChangeAvatar(evt) {
        setAvatar(evt.target.value);
    }
    
    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateAvatar({
            avatar,
        });
    }

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар'
            buttonText='Сохранить'

            isOpen={isOpen}
            onClose={onClose}
            onUpdateAvatar={handleSubmit}

            onSubmit={handleSubmit}
        >

            <input
                onChange={handleChangeAvatar}
                value={avatar || ''}

                id={`"popup__input_type_${name}"`}
                className="popup__input popup__input_type_avatar"
                name="link"
                placeholder="Ссылка на картинку"
                type="url"
                required
            />
            <span id={`"popup__input_type_${name}-error"`} className="popup__error"></span>

        </PopupWithForm>
    )
}

export default EditAvatarPopup;