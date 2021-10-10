import React from 'react';

const CurrentUserContext = React.createContext({
    _id: null,
    name: '',
    about: '',
    avatar: '',
});

export default CurrentUserContext;
