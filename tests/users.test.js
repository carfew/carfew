const jwt = require('jsonwebtoken');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

const agent = chai.request.agent(server);


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
    it('should delete user on /users/delete DELETE', async (done) => {
        // define new user object and save to DB
        const user = new User(testUser);
        user.save(async (req, res) => {
            // make sure the user object saved properly
            const userID = user._id;
            console.log('USER ID:', userID);

            // save jwt token so that test has auth
            let token;
            try {
                token = await jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days' });
                res.cookie('rideToken', token, {
                    maxAge: 900000,
                    httpOnly: true
                });
            } catch (err) {
                console.log('FAILED /users/delete err', err);
            }

            chai.request(server)
                .delete('/users/delete?_method=DELETE')
                .end(() => {
                    // check for test conditions
                    console.log(res.cookie);
                    res.clearCookie('rideToken');
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                });
        });
    });
});
