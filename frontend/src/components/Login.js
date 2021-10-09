import React from 'react';

function Login({ authorization }) {
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

        const password = passwordValue;
        const email = emailValue;

        authorization(email, password) 
    }

    return (
        <div className="auth">
            <h2 className="auth__title">Вход</h2>

            <form 
            className="auth__form"
            onSubmit={handleSubmit}
            >
                <input
                    className="auth__input"
                    type="text"
                    placeholder="Email"
                    value={emailValue}
                    onChange={handleChangeEmail}
                />

                <input
                    className="auth__input"
                    type="password"
                    placeholder="Пароль"
                    value={passwordValue}
                    onChange={handleChangePassword}
                />

                <button
                    className="auth__button"
                    type="submit">
                    Войти
                </button>
            </form>
        </div>
    )
}

export default Login;