// Copyright 2019, University of Colorado Boulder

/**
 * @author erik johan reid
 */
define( require => {
  'use strict';

  // modules
  const Image = require( 'SCENERY/nodes/Image' );
  const liftChallenge = require( 'LIFT_CHALLENGE/liftChallenge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Plane = require( 'SCENERY/nodes/Plane' );
  const Property = require( 'AXON/Property' );
  const RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const Text = require( 'SCENERY/nodes/Text' );

  const backroundEarthImage = require( 'image!LIFT_CHALLENGE/backround-earth.jpeg' )
  const moon = require( 'image!LIFT_CHALLENGE/moon.jpg' )
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
      const strongManImage = new Image( strongman1, {
        maxWidth: 250,
        x: 750, y: 425
      } );
      this.addChild( strongManImage );

      const environmentContainer = new Node();
      const guysContainer = new Node( { visible: false } );
      guysContainer.addChild( strongManImage );

      const earthImage = new Image( backroundEarthImage, {
        scale: 1.3,
        center: this.layoutBounds.center,
        visible: false
      } );
      environmentContainer.addChild( earthImage );
      this.addChild( environmentContainer );
      this.addChild( guysContainer );

      const weakmangood = new Image( weakManGoodImageData, { maxWidth: 100, x: 80, y: 425 } );

      this.addChild( weakmangood );
      var isShowingTitle = true;
      backround.addInputListener( {
        down: () => {
          console.log( 'MEIOW!!!!!!' )

          if ( isShowingTitle ) {
            this.removeChild( start );
            this.removeChild( title );
            this.removeChild( strongManImage )
            this.removeChild( weakmangood )
            earthImage.visible = true;

            const gravityAreaProperty = new Property( 'earth' );
            const gravityAreasRadioButtonGroup = new RadioButtonGroup( gravityAreaProperty, [
              { value: 'jupiter', node: new Text( 'jupiter' ) },
              { value: 'earth', node: new Text( 'earth' ) },
              { value: 'moon', node: new Text( 'moon' ) },
              { value: 'space', node: new Text( 'space' ) },
            ] );
            this.addChild( gravityAreasRadioButtonGroup );

            gravityAreaProperty.link( gravityArea => {

              if ( gravityArea === 'earth' ) {
                earthImage.visible = true;
                moon2.visible = false;
              }
              else if ( gravityArea === 'moon' ) {
                moon2.visible = true;
                earthImage.visible = false;
              }
            } );

            const selectedGuyProperty = new Property( 'nobody' );
            const selectedGuyRadioButtonGroup = new RadioButtonGroup( selectedGuyProperty, [
              { value: 'nobody', node: new Text( 'Nobody' ) },
              { value: 'strongMan', node: new Text( 'Strong Man' ) },
              { value: 'weakMan', node: new Text( 'Weak Man' ) }
            ], {
              top: gravityAreasRadioButtonGroup.bottom + 20,
              baseColor: 'red'
            } );
            this.addChild( selectedGuyRadioButtonGroup );

            selectedGuyProperty.link( selectedGuy => {
              if ( selectedGuy === 'strongMan' ) {
                guysContainer.visible = true;
              }
            } );

            // { value: '100 pound weight', node: new Text( '100 pound weight' ) },
            // { value: '50 pound weight', node: new Text( '50 pound weight' ) },
            // { value: '25 pound weight', node: new Text( '25 pound weight' ) },
            // { value: '10 pound weight', node: new Text( '10 pound weight' ) },

          }

          isShowingTitle = false;

          //


        }
      } );


      const moon2 = new Image( moon, {
        scale: 1.3,
        center: this.layoutBounds.center,
        visible: false
      } );
      environmentContainer.addChild( moon2 );

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