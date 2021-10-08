export const BASE_URL = 'https:/auth.nomoreparties.co';

export const register = (password, email) => {
    return fetch(`${BASE_URL}/auth/local/register`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Typre': 'application/json',
        },
        body: JSON.stringify({password, email})
    })
    .then((response) => {
        try {
            if (response.status === 200){
                return response.json();
            }
        }
        catch(e){
            return (e)
        }
    })
    .then((res) => {
        return res;
    })
    .catch((err) => console.log(err));
}