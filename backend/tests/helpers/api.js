const assert = require('chai').assert;
const sinon = require('sinon');
const h = require('../../helpers');

describe('Helper Api Test', async () => {
    let res;
    let req;
    let spy;
    beforeEach(async () => {
        res = {
            status: (s) => {
                res.http_code = s;
                return res;
            },
            json: (data) => {
                res.body = data;
                return res;
            }
        }
        spy = sinon.spy(res);
    })
    describe('createApiRes', async () => {
        it('Process the correct api response', async () => {
            const message = 'Message';
            const data = { foo: 'bar' };
            await h.api.createApiRes(req, res, 200, message, data);
            assert(spy.status.calledOnce);
            assert(spy.json.calledOnce);
        });

        it('Process the correct api response', async () => {
            const message = null;
            const data = null;
            await h.api.createApiRes(req, res, 200, message, data);
            assert(spy.status.calledOnce);
            assert(spy.json.calledOnce);
        })
    })
});
