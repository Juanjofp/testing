const MEM_DATABASE = {
    'juanjo@triveca.ovh': '123456',
};

export const saveUser = (username, password) => {
    return new Promise((resolve, reject) => {
        if (MEM_DATABASE[username]) {
            throw new Error('User already exists');
        }
        MEM_DATABASE[username] = password;
        resolve(true);
    });
};

export const deleteUser = (username) => {
    return new Promise((resolve, reject) => {
        delete MEM_DATABASE[username];
        resolve(true);
    });
};

export const validateUser = (username, password) => {
    return new Promise((resolve, reject) => {
        if (!MEM_DATABASE[username]) {
            resolve(false);
        }
        resolve(MEM_DATABASE[username] === password);
    });
};
