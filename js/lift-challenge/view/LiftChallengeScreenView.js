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
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const Circle = require( 'SCENERY/nodes/Circle' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const Text = require( 'SCENERY/nodes/Text' );

  const backgroundEarthImage = require( 'image!LIFT_CHALLENGE/backround-earth.jpeg' )
  const moon = require( 'image!LIFT_CHALLENGE/moon.jpg' )
  const strongman1 = require( 'image!LIFT_CHALLENGE/strong-man1.png' )
  const weakManGoodImageData = require( 'image!LIFT_CHALLENGE/weakManGood.jpg' );

  class WeightNode extends Node {
    constructor( center ) {

      const weightBar = new Rectangle( 100, 100, 250, 15, {
        fill: 'blue',
        centerX: center.x,
        centerY: center.y - 10,
      } );
      const leftBall = new Circle( 18, {
        fill: 'blue',
        center: weightBar.leftCenter
      } );

      const rightBall = new Circle( 18, {
        fill: 'blue',
        center: weightBar.rightCenter
      } );

      const weightLabelRight = new Text( '10', {
        fontSize: 15,
        fill: 'white',
        center: rightBall.center
      } );
      // this.addChild( weightLabelRight )
      const weightLabelLeft = new Text( '10', {
        fontSize: 15,
        fill: 'white',
        center: leftBall.center
      } );

      super( {
        children: [
          weightBar,
          leftBall,
          rightBall,
          weightLabelRight,
          weightLabelLeft ]

      } );

    }
  }

  class LiftChallengeScreenView extends ScreenView {

    /**
     * @param {LiftChallengeModel} model
     * @param {Tandem} tandem
     */
    constructor( model, tandem ) {

      super();
      const background = new Plane( { fill: 'white' } );
      this.addChild( background )
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
      this.addChild( environmentContainer );

      const fullWeight = new WeightNode( strongManImage.center );
      this.addChild( fullWeight );

      const guysContainer = new Node( { visible: false } );
      guysContainer.addChild( strongManImage );

      const earthNode = new Image( backgroundEarthImage, {
        scale: 1.3,
        center: this.layoutBounds.center,
        visible: false
      } );
      environmentContainer.addChild( earthNode );

      this.addChild( guysContainer );

      // earthNode.moveToBack();
      // environmentContainer.moveToBack();

      const weakmangood = new Image( weakManGoodImageData, { maxWidth: 100, x: 80, y: 425 } );

      this.addChild( weakmangood );
      var isShowingTitle = true;
      background.addInputListener( {
        down: () => {
          console.log( 'MEIOW!!!!!!' )

          if ( isShowingTitle ) {
            this.removeChild( start );
            this.removeChild( title );
            this.removeChild( strongManImage )
            this.removeChild( weakmangood )
            earthNode.visible = true;
            fullWeight.visible = false;

            const gravityAreaProperty = new Property( 'earth' );
            const gravityAreasRadioButtonGroup = new RadioButtonGroup( gravityAreaProperty, [
              { value: 'earth', node: new Text( 'earth' ) },
              { value: 'moon', node: new Text( 'moon' ) }
            ] );
            this.addChild( gravityAreasRadioButtonGroup );

            gravityAreaProperty.link( gravityArea => {

              if ( gravityArea === 'earth' ) {
                earthNode.visible = true;
                moon2.visible = false;
              }
              else if ( gravityArea === 'moon' ) {
                moon2.visible = true;
                earthNode.visible = false;
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

            const selectedWeightProperty = new Property( 'no-weight' );
            const selectedWeightRadioButtonGroup = new RadioButtonGroup( selectedWeightProperty, [
              { value: 'no-weight', node: new Text( 'No weight' ) },
              { value: '10-pound-weight', node: new Text( '10 pound weight' ) }
            ], {
              top: selectedGuyRadioButtonGroup.bottom + 20,
              baseColor: '#59DE28'
            } );
            this.addChild( selectedWeightRadioButtonGroup );

            selectedWeightProperty.link( selectedGuy => {
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


    }    // @public
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