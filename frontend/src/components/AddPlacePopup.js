import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [nameValue, setNameValue]= React.useState('');
    const [linkValue, setLinkValue] = React.useState('');

    React.useEffect(() => {
        setLinkValue('')
        setNameValue('')
    }, [onClose])

    function handleChangeNameValue(evt) {
        evt.preventDefault();

        setNameValue(evt.target.value);
    }

    function handleChangeLinkValue(evt) {
        evt.preventDefault();

        setLinkValue(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onAddPlace({
            name: nameValue,
            link: linkValue,
        });
    }

    return (
        <PopupWithForm
            name='photo'
            title='Новое место'
            buttonText='Создать'

            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >

            <input
                onChange={handleChangeNameValue}
                value={nameValue}
                id="popup__input_type_title"
                className="popup__input popup__input_type_title" 
                type="text" name="name"
                placeholder="Название"
                minLength="1"
                maxLength="30"
                required
            />
            <span id="popup__input_type_title-error" className="popup__error"></span>

            <input
                onChange={handleChangeLinkValue}
                value={linkValue}
                id="popup__input_type_image"
                className="popup__input popup__input_type_image"
                type="url" name="link"
                placeholder="Ссылка на картинку"
                required
            />
            <span id="popup__input_type_image-error" className="popup__error"></span>

        </PopupWithForm>
    )
}

export default AddPlacePopup;