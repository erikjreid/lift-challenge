// Copyright 2019, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author erik johan reid
 */

import Sim from '../../joist/js/Sim.js';
import SimLauncher from '../../joist/js/SimLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import Strings from '../../undefined/js/undefined-strings.js';
import LiftChallengeScreen from './LIFT_CHALLENGE/lift-challenge/LiftChallengeScreen.js';

const liftChallengeTitleString = Strings[ 'lift-challenge' ].title;

const simOptions = {
  credits: {
    //TODO fill in credits, all of these fields are optional, see joist.CreditsNode
    leadDesign: 'Erik Johan Reid',
    softwareDevelopment: 'Sam Reid and Erik Johan Reid',
    team: 'Sam Reid and Erik Johan Reid',
    qualityAssurance: 'Sam Reid and Erik Johan Reid',
    graphicArts: 'Sam Reid and Erik Johan Reid',
    soundDesign: 'Sam Reid and Erik Johan Reid',
    thanks: 'Sam Reid and Erik Johan Reid'
  }
};

// launch the sim - beware that scenery Image nodes created outside of SimLauncher.launch() will have zero bounds
// until the images are fully loaded, see https://github.com/phetsims/coulombs-law/issues/70
SimLauncher.launch( () => {
  const sim = new Sim( liftChallengeTitleString, [
    new LiftChallengeScreen( Tandem.ROOT.createTandem( 'liftChallengeScreen' ) )
  ], simOptions );
  sim.start();
} );