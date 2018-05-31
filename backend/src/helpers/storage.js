const MEM_DATABASE = {};

export const saveUser = (username, password) => {
    return new Promise((resolve, reject) => {
        if (MEM_DATABASE[username]) {
            throw new Error('User already exists');
        }
        MEM_DATABASE[username] = password;
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
