const supertest = require('supertest')
const chai = require('chai')
const app = require('./../index')

const expect = chai.expect
const request = supertest(app.listen())

// 测试组件/组
describe('开始测试demoGET请求', () => {
    // 测试用例
    it('测试/getString.json请求', (done) => {
        request
            .get('./getString.json')
            .expect(200)
            .end((err, res) => {
                // 断言判断结果是否为OBJECT
                expect(res.body).to.be.an('object')
                expect(res.body.success).to.be.an('boolean')
                expect(res.body.data).to.be.an('string')
                done()
            })
    })
})