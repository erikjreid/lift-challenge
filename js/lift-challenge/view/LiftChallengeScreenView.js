// Copyright 2019, University of Colorado Boulder

/**
 * @author erik johan reid
 */
define( require => {
  'use strict';

  // modules
  const Image = require( 'SCENERY/nodes/Image' );
  const liftChallenge = require( 'LIFT_CHALLENGE/liftChallenge' );
  const Plane = require( 'SCENERY/nodes/Plane' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const Text = require( 'SCENERY/nodes/Text' );

  const strongman1 = require( 'image!LIFT_CHALLENGE/strong-man1.png' )
  const weakManGoodImageData = require( 'image!LIFT_CHALLENGE/weakManGood.jpg' )

  class LiftChallengeScreenView extends ScreenView {

    /**
     * @param {LiftChallengeModel} model
     * @param {Tandem} tandem
     */
    constructor( model, tandem ) {

      super();
      const backround = new Plane( { fill: 'white' } );
      this.addChild( backround )
      const resetAllButton = new ResetAllButton( {
        listener: () => {
          model.reset();
          this.reset();
        },
        right: this.layoutBounds.maxX - 10,
        bottom: this.layoutBounds.maxY - 10,
        tandem: tandem.createTandem( 'resetAllButton' )
      } );



      const title = new Text( 'lift challenge', {
        fontSize: 150,
        center: this.layoutBounds.center
      } );
      this.addChild( title );


      const start = new Text( 'click to start', {
        y: title.bottom + 50,
        centerX: this.layoutBounds.centerX, fontSize: 20

      } );
      this.addChild( start );

      var isShowingTitle = true;
      backround.addInputListener( {
        down: () => {
          console.log( 'MEIOW!!!!!!' )

          if ( isShowingTitle ) {
            this.removeChild( start );
            this.removeChild( title );
          }

          isShowingTitle = false;


        }
      } );

      const strogmanimage = new Image( strongman1, {
        maxWidth: 250,
        x: 750, y: 425
      } );
      this.addChild( strogmanimage );

      const weakmangood = new Image( weakManGoodImageData, { maxWidth: 100, x: 80, y: 425 } );

      this.addChild( weakmangood );
    }

    // @public
    step( dt ) {
      //TODO Handle view animation here.
    }

    // @public
    reset() {
      //TODO reset view-specific stuff here
    }
  }

  return liftChallenge.register( 'LiftChallengeScreenView', LiftChallengeScreenView );
} );