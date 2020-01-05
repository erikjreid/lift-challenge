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
  const Property = require( 'AXON/Property' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const Text = require( 'SCENERY/nodes/Text' );

  const strongman1 = require( 'image!LIFT_CHALLENGE/strong-man1.png' )
  const weakManGoodImageData = require( 'image!LIFT_CHALLENGE/weakManGood.jpg' )
  const backroundEarthImage = require( 'image!LIFT_CHALLENGE/backround-earth.jpeg' )

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
      const strogmanimage = new Image( strongman1, {
        maxWidth: 250,
        x: 750, y: 425
      } );
      this.addChild( strogmanimage );

      const earthImage = new Image( backroundEarthImage, {
        scale: 1.3,
        center: this.layoutBounds.center,
        visible: false
      } );
      this.addChild( earthImage );


      const weakmangood = new Image( weakManGoodImageData, { maxWidth: 100, x: 80, y: 425 } );

      this.addChild( weakmangood );
      var isShowingTitle = true;
      backround.addInputListener( {
        down: () => {
          console.log( 'MEIOW!!!!!!' )

          if ( isShowingTitle ) {
            this.removeChild( start );
            this.removeChild( title );
            this.removeChild( strogmanimage )
            this.removeChild( weakmangood )
            earthImage.visible = true;

            const gravityAreaProperty = new Property( 'earth' );
            const gravityAreasRadioButtonGroup = new RadioButtonGroup( gravityAreaProperty, [
              { value: 'jupiter', node: new Text( 'jupiter' ) },
              { value: 'earth', node: new Text( 'earth' ) },
              { value: 'moon', node: new Text( 'moon' ) },
              { value: 'space', node: new Text( 'space' ) },
              { value: '100 pound weight', node: new Text( '100 pound weight' ) },
              { value: '50 pound weight', node: new Text( '50 pound weight' ) },
              { value: '25 pound weight', node: new Text( '25 pound weight' ) },
              { value: '10 pound weight', node: new Text( '10 pound weight' ) },
              { value: 'strong man', node: new Text( 'strong man' ) },
              { value: 'averige man', node: new Text( 'avrege man' ) },
              { value: 'weak man', node: new Text( 'weak man' ) },

            ] );
            this.addChild( gravityAreasRadioButtonGroup )

          }

          isShowingTitle = false;


        }
      } );


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