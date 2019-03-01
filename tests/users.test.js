const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

const should = chai.should();

chai.use(chaiHttp);

/** Require Models * */
const User = require('../models/user.model');

/** Test Objects * */
const testUser = {
    firstName: 'John',
    lastName: 'Smith',
    username: 'JSmith',
    email: 'jsmith@gmail.com',
    phone: '0000000000',
    password: 'something'
};

describe('User', () => {

    // TEST SHOW
    it('should show User on /users/<id> GET', (done) => {
        const user = new User(testUser);
        user.save(() => {
            chai.request(server)
                .get(`/users/${user._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                });
        });
    });

    // TEST DELETE
    it('should delete user on /users/<id> DELETE', (done) => {
        const user = new User(testUser);
        user.save(() => {
            const userID = user._id;
            console.log('USER ID:', userID);
            chai.request(server)
                .delete(`/users/${user._id}?_method=DELETE`)
                .end((err, res) => {
                    console.log(user);
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                });
        });
    });
});
