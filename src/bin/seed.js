import models from '../models';

const {User, Product} = models;

const seed = () => {
    return Promise.all([
        User.create({
            id: '0c683b6e-32d5-445d-bd1a-589ea455106b',
            userName: 'Bob',
            email: 'bob@gmail.com',
            password: 'asdfasdf'
        }),
        User.create({
            id: 'ad912e3f-432c-4723-8245-2eb3a665b0b0',
            userName: 'Tom',
            email: 'tom@gmail.com',
            password: 'asdfasdf'
        }),
        Product.create({
            id: '7fd51310-f0a4-4f50-8203-66fb098ff4e1',
            title: 'Phone1',
            description: 'nice phone1'
        }),
        Product.create({
            id: '5c180ddc-5073-41fe-8fae-4223ed0bb39e',
            title: 'Phone2',
            description: 'nice phone2'
        }),
        Product.create({
            id: 'b817c071-9784-451f-a737-c124c862fd96',
            title: 'Phone3',
            description: 'nice phone3'
        }),
        Product.create({
            id: 'd33be0c7-50b8-4c17-9dfe-2683272e7bc6',
            title: 'Phone4',
            description: 'nice phone4'
        }),
    ])
        .then(([Bob, Tom, Phone1, Phone2, Phone3, Phone4]) => {
            return Promise.all([
                Phone1.setUser(Bob),
                Phone2.setUser(Bob),
                Phone3.setUser(Tom),
                Phone4.setUser(Tom),
            ]);
        })
        .catch(error => console.log(error));
};

export default seed;