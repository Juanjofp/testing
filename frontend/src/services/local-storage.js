const AUTH_KEY = 'auth_key';

export const loadAuth = () => {
    try {
        const serializedAuth = localStorage.getItem(AUTH_KEY);
        if(serializedAuth === null) {
            return undefined;
        }
        return JSON.parse(serializedAuth);
    }
    catch(error) {
        return undefined;
    }
};
export const saveAuth = (username, avatar, token, isAdmin = false) => {
    if(!!token) {
        try {
            const serializedAuth = JSON.stringify({ username, avatar, token, isAdmin });
            localStorage.setItem(AUTH_KEY, serializedAuth);
        }
        catch(error) {
            console.log('Error saving Auth to local storage', error);
        }
    }
};
export const clearAuth = () => {
    try {
        localStorage.removeItem(AUTH_KEY);
    }
    catch(error) {
        console.log('Error removing Auth from local storage', error);
    }
};
