import {describeComponent} from 'ember-mocha'
import {PropTypes} from 'ember-frost-bunsen/mixins/prop-types'
import {validatePropTypes} from '../../../../utils/template'

describeComponent(
  'frost-bunsen-error',
  'FrostBunsenErrorComponent',
  {},
  function () {
    validatePropTypes({
      data: PropTypes.object.isRequired,
      warning: PropTypes.bool
    })
  }
)
