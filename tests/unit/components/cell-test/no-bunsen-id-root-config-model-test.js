import {expect} from 'chai'
import {setupComponentTest} from 'ember-mocha'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import {addChangeSet} from './changeset-helper'

describe('Unit: frost-bunsen-cell', function () {
  setupComponentTest('frost-bunsen-cell', {
    unit: true
  })

  describe('with no bunsenId and root config model', function () {
    let component, onChangeSpy, sandbox

    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      onChangeSpy = sandbox.spy()

      component = this.subject({
        bunsenId: '',
        bunsenModel: {
          properties: {
            foo: {type: 'string'}
          },
          type: 'object'
        },
        bunsenView: {},
        cellConfig: {
          model: 'foo'
        },
        errors: {},
        onChange: onChangeSpy,
        onError () {},
        value: {}
      })
    })

    afterEach(function () {
      sandbox.restore()
    })

    it('errorMessage returns null when no erorrs', function () {
      component.set('errors', {})
      expect(component.get('errorMessage')).to.equal(null)
    })

    it('errorMessage returns signle error', function () {
      const error = 'what is foo without a little bar'
      component.set('errors', {'foo': [error]})
      expect(component.get('errorMessage').toString()).to.eql(error)
    })

    it('errorMessage returns multiple errors', function () {
      const error1 = 'what is foo without a little bar'
      const error2 = 'foo is feeling lonely'
      component.set('errors', {'foo': [error1, error2]})
      expect(component.get('errorMessage').toString()).to.eql(`${error1}<br>${error2}`)
    })

    it('isArrayItem() returns false', function () {
      expect(component.get('isArrayItem')).to.equal(false)
    })

    it('isSubModelArray returns false', function () {
      expect(component.get('isSubModelArray')).to.equal(false)
    })

    it('isSubModelObject returns false', function () {
      expect(component.get('isSubModelObject')).to.equal(false)
    })

    it('nonIndexId returns expected value', function () {
      expect(component.get('nonIndexId')).to.equal('foo')
    })

    it('readOnly defaults to false', function () {
      expect(component.get('readOnly')).to.equal(false)
    })

    it('renderId returns ${bunsenId}.${model}', function () {
      expect(component.get('renderId')).to.equal('foo')
    })

    it('subModel returns expected value', function () {
      expect(component.get('subModel')).to.eql({type: 'string'})
    })

    describe('when value is present', function () {
      beforeEach(function () {
        component.set('value', {
          foo: {
            bar: 'baz'
          }
        })
        addChangeSet(component)
        component.didReceiveAttrs({
          oldAttrs: {}
        })
      })

      it('renderValue returns value for config model', function () {
        expect(component.get('renderValue')).to.eql({
          bar: 'baz'
        })
      })
    })

    describe('when value is not present', function () {
      beforeEach(function () {
        component.set('value', null)
      })

      it('renderValue returns undefined', function () {
        expect(component.get('renderValue')).to.equal(undefined)
      })
    })
  })
})
