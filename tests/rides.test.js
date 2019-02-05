const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const should = chai.should();

chai.use(chaiHttp);

/** Require Models */
const Ride = require('../models/ride.model');

/** Test Objects */
const testRide = {
    // Need to add ride details here
    rider: 'something',
    driver: 'something'
};

// Need to add cleanup

describe('Ride', () => {
    // TEST ROOT
    it('should display ALL rides on /rides GET', (done) => {
        chai.request(server)
            .get('/rides')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });

    // TEST SHOW
    it('should show ONE ride on /rides/<id> GET', (done) => {
        const ride = new Ride(testRide);
        ride.save((err, data) => {
            chai.request(server)
                .get(`/rides/${data._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                });
        });
    });

    // TEST CREATE
    it('should create ONE ride on /rides', (done) => {
        chai.request(server)
            .post('/rides')
            .send(testRide)
            .end((err, res) => {
                console.log('success!')
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    }).timeout(4000);

    // TEST DELETE
    it('should delete ONE ride on /rides/<id> DELETE', (done) => {
        const ride = new Ride(testRide);
        ride.save((err, data) => {
            chai.request(server)
                .delete(`/rides/${data._id}?_method=DELETE`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
                });
        });
    });
});
