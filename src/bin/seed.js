import models from '../models';

const {User, Product} = models;

const seed = () => {
    return Promise.all([
        User.create({
            userName: 'Bob',
            email: 'bob@gmail.com',
            password: 'asdfasdf'
        }),
        User.create({
            userName: 'Tom',
            email: 'tom@gmail.com',
            password: 'asdfasdf'
        }),
        Product.create({
            title: 'Phone1',
            description: 'nice phone1'
        }),
        Product.create({
            title: 'Phone2',
            description: 'nice phone2'
        }),
        Product.create({
            title: 'Phone3',
            description: 'nice phone3'
        }),
        Product.create({
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