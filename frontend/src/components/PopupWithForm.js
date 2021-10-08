import React from 'react';

function PopupWithForm({ title, name, buttonText, children, isOpen, onClose, onSubmit }) {
    return (
        <div className={`popup popup-${name} ${isOpen && 'popup_opened'}`}>

            <button className={`button-close popup__cross popup__cross_btn_close-${name}`}
                type="button" onClick={onClose}></button>
            <form
                onSubmit={onSubmit}
                id="popup__form" className={`popup__form popup__form_${name}`}
                method="get" name={`${name}-form`} noValidate
            >

                <h2 className="popup__title">{title}</h2>

                {children}

                <button className="popup__button popup__save" type="submit">{buttonText}</button>

            </form>

        </div>
    )
}

export default PopupWithForm