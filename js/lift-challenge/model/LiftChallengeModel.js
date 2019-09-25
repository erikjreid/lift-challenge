// Copyright 2019, University of Colorado Boulder

/**
 * @author erik johan reid
 */
define( require => {
  'use strict';

  // modules
  const liftChallenge = require( 'LIFT_CHALLENGE/liftChallenge' );

  /**
   * @constructor
   */
  class LiftChallengeModel {

    /**
     * @param {Tandem} tandem
     */
    constructor( tandem ) {
      //TODO
    }

    // @public resets the model
    reset() {
      //TODO Reset things here.
    }

    // @public
    step( dt ) {
      //TODO Handle model animation here.
    }
  }

  return liftChallenge.register( 'LiftChallengeModel', LiftChallengeModel );
} );