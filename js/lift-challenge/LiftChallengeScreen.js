// Copyright 2019, University of Colorado Boulder

/**
 * @author erik johan reid
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import LiftChallengeModel from './LIFT_CHALLENGE/lift-challenge/model/LiftChallengeModel.js';
import LiftChallengeScreenView from './LIFT_CHALLENGE/lift-challenge/view/LiftChallengeScreenView.js';
import liftChallenge from './LIFT_CHALLENGE/liftChallenge.js';

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

liftChallenge.register( 'LiftChallengeScreen', LiftChallengeScreen );
export default LiftChallengeScreen;