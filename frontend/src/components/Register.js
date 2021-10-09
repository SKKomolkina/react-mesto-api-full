import React from 'react';
import { Link } from 'react-router-dom';

function Register({ registration }) {
    const [emailValue, setEmailValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');

    function handleChangeEmail(evt) {
        setEmailValue(evt.target.value);
    }

    function handleChangePassword(evt) {
        setPasswordValue(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        const email = emailValue;
        const password = passwordValue;

        registration(email, password);
    }

    return (
        <div className="auth">
            <h2 className="auth__title">Регистрация</h2>

            <form
                className="auth__form"
                onSubmit={handleSubmit}
            >
                <input
                    className="auth__input"
                    type="email"
                    placeholder="Email"
                    onChange={handleChangeEmail}
                    value={emailValue}
                />

                <input
                    className="auth__input"
                    type="password"
                    placeholder="Пароль"
                    onChange={handleChangePassword}
                    value={passwordValue}
                />

                <button
                    className="auth__button"
                    type="submit">
                    Зарегистрироваться
                </button>
            </form>

            <Link className="auth__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
        </div>
    )
}

export default Register;