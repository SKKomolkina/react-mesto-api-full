import React from 'react';

function InfoTooltip({ isOpen, onClose, infoPopupStatus }) {

    return (
        <div className={`popup popup-info ${isOpen && 'popup_opened'}`}>
            <button
                className="button-close popup__cross popup__cross_btn_close-profile "
                type="button"
                onClick={onClose}
                />

            <div className="popup__info-container">
                <img className="popup-info__img" src={infoPopupStatus.path} alt="" />
                <h2 className="popup-info__title">{infoPopupStatus.text}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip;
