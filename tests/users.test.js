const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

const should = chai.should();

chai.use(chaiHttp);

/** Require Models **/
const User = require('../models/user.model');

/** Test Objects **/
const testUser = {
    firstName: "John",
    lastName: "Smith",
    username: "JSmith",
    email: "jsmith@gmail.com",
    phone: "0000000000",
    password: "something"
};

describe('User', () => {

    // TEST SHOW
    it('should show User on /users/<id> GET', (done) => {
        const user = new User(testUser);
        user.save((err, data) => {
            chai.request(server)
                .get(`/users/${data._id}`)
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
        user.save((err, data) => {
            chai.request(server)
                .delete(`/users/${data._id}?_method=DELETE`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                });
        });
    });
});
