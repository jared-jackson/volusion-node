'use strict';
var supertest = require('supertest');
var express = require('express');
var app = express();

var test_url = 'https://cqze8l1aq1.execute-api.us-east-1.amazonaws.com/latest?url=https://www.volusion.com/blog/something-to-be-proud-of-pride-socks/';

describe('GET Emotion level from Volusion blog post from single API endpoint', function () {
    it('respond with 5 levels of emotion in json', function (done) {
        supertest(test_url)
            .get('/')
            .expect(200, {
                sadness: 'some float',
                joy: 'some float',
                fear: 'some float',
                disgust: 'some float',
                anger: 'some float'
            }, done)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
});