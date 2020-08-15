let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should();
var ObjectId=require('mongoose').Types.ObjectId;
chai.use(chaiHttp);
let server = require('../index');
const app = require('../index');

describe('Device', () => {
    beforeEach((done) => {
        server.db.models.Device.remove({}, (err) => {
            done();
        });
    });
    describe('/GET devices', () => {
        it('it should GET all the devices', (done) => {
            chai.request(server)
                .get('/api/devices')
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body.payload).should.be.a('Array');
                    (res.body.payload.length).should.be.eql(0);
                    done();
                });
        });
    });
    describe('/POST device', () => {
        it('it should not create a device without name', (done) => {
            let device = {

            }
            chai.request(server)
                .post('/api/device')
                .send(device)
                .end((err, res) => {
                    (res).should.have.status(400);
                    (res.body.message).should.be.eql('Invalid device details,please verify api documents');
                    done();
                });
        });
    });

    describe('/POST device', () => {
        it('it should create a device', (done) => {
            let device = {
                name: "Some Device Name"
            }
            chai.request(server)
                .post('/api/device')
                .send(device)
                .end((err, res) => {
                    (res).should.have.status(201);
                    (res.body.payload).should.be.a('Object');
                    done();
                });
        });
    });
    describe('/DELETE device', () => {
        it('it should delete a device with id', (done) => {
            let device = {
                name: "Some Device Name"
            }
            let dev = new app.db.models.Device(device)
            dev.save((err, created_dev) => {
                chai.request(server)
                    .delete(`/api/device/${created_dev._id}`)
                    .end((err, res) => {
                        (res).should.have.status(200);
                        (res.body.payload).should.be.a('Object');
                        (ObjectId(res.body.payload._id)).should.be.eql(ObjectId(created_dev._id))
                        done();
                    });
            })

        });
    });
});
