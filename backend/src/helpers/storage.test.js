import {saveUser, validateUser, deleteUser} from './storage';

describe('Storage', () => {
    it('Should save and validate a new user', async () => {
        const userName = 'juanjo@juanjofp.com',
            password = '123456';

        const userDeleted = await deleteUser(userName);
        expect(userDeleted).toBe(true);
        const userCreated = await saveUser(userName, password);
        expect(userCreated).toBe(true);
        const isValidUser = await validateUser(userName, password);
        expect(isValidUser).toBe(true);

        // clear test
        deleteUser(userName);
    });

    it('Should thow an error if try to duplicate user', async () => {
        const userName = 'juanjo@juanjofp.com',
            password = '123456';

        const userDeleted = await deleteUser(userName);
        expect(userDeleted).toBe(true);
        const userCreated = await saveUser(userName, password);
        expect(userCreated).toBe(true);
        try {
            await saveUser(userName, password);
        }
        catch (error) {
            expect(error).toEqual(new Error('User already exists'));
        }

        // clear test
        deleteUser(userName);
    });

    it('Should should return null if user and password do not match', async () => {
        const userName = 'juanjo@juanjofp.com',
            password = '123456',
            invalidPassword = '654321';

        const userDeleted = await deleteUser(userName);
        expect(userDeleted).toBe(true);
        const userCreated = await saveUser(userName, password);
        expect(userCreated).toBe(true);
        const isValidUser = await validateUser(userName, invalidPassword);
        expect(isValidUser).toBe(false);

        // clear test
        deleteUser(userName);
    });
});
