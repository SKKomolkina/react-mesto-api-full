import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import headerLogo from '../images/logo.svg';

function Header({ email, signOut }) {
    return (
        <header className="header">
            <img className="logo header__logo" src={headerLogo} alt="Логотип Mesto" />

            <div className="header__info">

                <Switch>

                    <Route exact path="/">
                        <p className="header__mail">{email}</p>
                        <Link
                            to="/sign-in"
                            onClick={signOut}
                            className="header__button">
                            Выход
                        </Link>
                    </Route>

                    <Route path="/sign-in">
                        <Link
                            to="/sign-up"
                            className="header__button">
                            Регистрация
                        </Link>
                    </Route>

                    <Route path="/sign-up">
                        <Link
                            to="sign-in"
                            className="header__button">
                            Войти
                        </Link>
                    </Route>
                </Switch>
            </div>
        </header>
    )
}

export default Header;