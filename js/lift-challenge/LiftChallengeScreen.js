// Copyright 2019, University of Colorado Boulder

/**
 * @author erik johan reid
 */
define( require => {
  'use strict';

  // modules
  const Property = require( 'AXON/Property' );
  const Screen = require( 'JOIST/Screen' );
  const liftChallenge = require( 'LIFT_CHALLENGE/liftChallenge' );
  const LiftChallengeModel = require( 'LIFT_CHALLENGE/lift-challenge/model/LiftChallengeModel' );
  const LiftChallengeScreenView = require( 'LIFT_CHALLENGE/lift-challenge/view/LiftChallengeScreenView' );

  class LiftChallengeScreen extends Screen {

    /**
     * @param {Tandem} tandem
     */
    constructor( tandem ) {

      const options = {
        backgroundColorProperty: new Property( 'white' ),
        tandem: tandem
      };

      super(
        () => new LiftChallengeModel( tandem.createTandem( 'model' ) ),
        model => new LiftChallengeScreenView( model, tandem.createTandem( 'view' ) ),
        options
      );
    }
  }

  return liftChallenge.register( 'LiftChallengeScreen', LiftChallengeScreen );
} );