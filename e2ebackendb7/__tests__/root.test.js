import fetch from 'node-fetch';

describe(
    'API /',
    () => {
        it(
            'should return name and version API',
            async () => {
                const response = await fetch(
                    'https://api.testing.centic.ovh/'
                );
                const data = await response.json();

                expect(response.status).toBe(200);
                expect(data).toEqual({ name: 'API Testing', version: '2.0'});
            }
        );
    }
);
