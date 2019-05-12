const expect = require('chai').expect
const WeValidator = require('../lib/we-validator')

describe('testing: we-validator', () => {

    it('WeValidator.checkValue', () => {
        expect(WeValidator.checkValue('required')).to.not.be.ok
        expect(WeValidator.checkValue('required', '')).to.not.be.ok
        expect(WeValidator.checkValue('required', 'a')).to.be.ok

        expect(WeValidator.checkValue('chinese')).to.not.be.ok
        expect(WeValidator.checkValue('chinese', '')).to.not.be.ok
        expect(WeValidator.checkValue('chinese', 'a')).to.not.be.ok
        expect(WeValidator.checkValue('chinese', '好的')).to.be.ok

        expect(WeValidator.checkValue('mobile')).to.not.be.ok
        expect(WeValidator.checkValue('mobile', '')).to.not.be.ok
        expect(WeValidator.checkValue('mobile', '111')).to.not.be.ok
        expect(WeValidator.checkValue('mobile', '15812345678')).to.be.ok
    })

    it('WeValidator.addRule', () => {
        WeValidator.addRule('theRuleName', {
          rule(value){
            return /\d/.test(value)
          }
        })
        expect(WeValidator.checkValue('theRuleName')).to.not.be.ok
        expect(WeValidator.checkValue('theRuleName', '')).to.not.be.ok
        expect(WeValidator.checkValue('theRuleName', 'a')).to.not.be.ok
        expect(WeValidator.checkValue('theRuleName', '1')).to.be.ok
    })

    it('new WeValidator({ onMessage })', () => {
        let validatorInstance = null
        let _name = 'username'
        let _rule= 'required'
        let _msg = '提示信息'

        validatorInstance = new WeValidator({
            rules: {
                username: {
                    required: true
                }
            },
            messages: {
                username: {
                    required: _msg
                }
            },
            onMessage: function(data){
                expect(data.msg).to.equal(_msg)
                expect(data.name).to.equal(_name)
                expect(data.rule).to.equal(_rule)
            }
        })

        validatorInstance.checkData({})
    })

    it('validatorInstance.checkData', () => {
        let validatorInstance = new WeValidator({
            rules: {
                username: {
                    required: true
                }
            },
            messages: {
                username: {
                    required: '提示信息'
                }
            }
        })

        expect(validatorInstance.checkData({})).to.not.be.ok

    })

    it('WeValidator.onMessage', () => {
        let validatorInstance = null
        let _name = 'username'
        let _rule= 'required'
        let _msg = '提示信息'
        
        WeValidator.onMessage = function(data){
            expect(data.msg).to.equal(_msg)
            expect(data.name).to.equal(_name)
            expect(data.rule).to.equal(_rule)
        }

        validatorInstance = new WeValidator({
            rules: {
                username: {
                    required: true
                }
            },
            messages: {
                username: {
                    required: _msg
                }
            },
        })

        validatorInstance.checkData({})
    })

})