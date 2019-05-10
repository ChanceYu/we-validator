const expect = require('chai').expect
const WeValidator = require('../lib/we-validator')

describe('testing: we-validator package', () => {

    it('testing: rules', () => {
        expect(WeValidator.checkValue('required', 'a')).to.be.ok
        expect(WeValidator.checkValue('required', '')).to.not.be.ok
        expect(WeValidator.checkValue('chinese', '好的')).to.be.ok
        expect(WeValidator.checkValue('chinese', 'a')).to.not.be.ok
    })

    it('testing: addRule', () => {
        WeValidator.addRule('theRuleName', {
          rule(value){
            return !this.required(value) || /\d/.test(value)
          }
        })
        expect(WeValidator.checkValue('theRuleName', '1')).to.be.ok
        expect(WeValidator.checkValue('theRuleName', 'a')).to.not.be.ok
    })

    it('testing: onMessage global', () => {
        let oValidator = null
        let _name = 'username'
        let _rule= 'required'
        let _msg = '提示信息'
        
        WeValidator.onMessage = function(data){
            expect(data.msg).to.equal(_msg)
            expect(data.name).to.equal(_name)
            expect(data.rule).to.equal(_rule)
        }

        oValidator = new WeValidator({
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

        oValidator.checkData({
            username: ''
        })
    })



    it('testing: onMessage option', () => {
        let oValidator = null
        let _name = 'username'
        let _rule= 'required'
        let _msg = '提示信息'

        oValidator = new WeValidator({
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

        oValidator.checkData({
            username: ''
        })
    })

})