const assert = require('assert')
const should = require('should');
const request = require('supertest')
const app = require('./index')


describe('GET /users', () => {
    describe('성공', () => {
        it('배열을 반환한다.', (done) => {
            request(app)
                .get('/users')
                .end((err, res) => {
                    //if (err) throw err
                    res.body.should.be.instanceof(Array)
                    res.body.forEach(user => {
                        user.should.have.property('name')
                    })
                    done()
                })
        });
        it('최대 limit 갯수만큼 은답한다.', done => {
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                    res.body.should.have.lengthOf(2)
                    done()
                })
        })    
    })
    describe('실패', () => {
        it('limit이 정수가 아니면 400을 응답한다.', done => {
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done)
        })
    })


});

describe('GET /users/:id', () => {
    describe('성공', () => {
        it('유저 객체를 반환한다.', done => {
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1)
                    done()
                })
        })
    })
    describe('실패', () => {
        it('id가 숫자가 아닐경우 400 응답', (done) => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done)
        })
        it('찿을수 없는 id일 경우 404 응답', (done) => {
            request(app)
                .get('/users/9')
                .expect(404)
                .end(done)
        })       
    })    
});

describe('DELETE /users/:id', () => {
    describe('성공', () => {
        it('204를 응답한다.', done => {
            request(app)
                .delete('/users/3')
                .expect(204)
                .end(done)
        })
    })
    describe('실패', () => {
        it('id가 숫자가 아닐경우 400 응답', (done) => {
            request(app)
                .delete('/users/three')
                .expect(400)
                .end(done)
        })
    })    
})