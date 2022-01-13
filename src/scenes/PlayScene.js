import Phaser from "phaser";
import 'smartcontroller';

// all commented code is smartcontroller specific - not game specific
var vertical = 0;
var count = 0;
const PLATFORMS_TO_RENDER = 20;

class PlayScene extends Phaser.Scene {

  constructor(config) {
    super('PlayScene');
    this.config = config;

    this.globalFlag = false;
    this.controller = null;
    this.simplePeer = null;
    this.scanned = false;

    this.platforms = null;

    this.platformHorizontalDistanceLeft = [60, 266];
    this.platformHorizontalDistanceCentre = [266, 532];
    this.platformHorizontalDistanceRight = [532, 740];
    // this.platformVerticalDistance = [-1000, vertical];
    this.previousPlatform = 0;

    
    // need a set distance vetween the vertical placement of each platform - 60
  }

  preload() {

    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');

  }

  create() {

    // this.scale.startFullscreen();
    // var FKey = this.input.keyboard.addKey('F');

    // FKey.on('down', function () {
    //   if (this.scale.isFullscreen) {
    //     this.scale.stopFullscreen();
    //   }
    //   else {
    //     this.scale.startFullscreen();
    //   }
    // }, this);

    // this.scale.displaySize.setAspectRatio( this.width/this.height );
    // this.scale.refresh();
    this.createBG();
    this.createPlatforms();
    this.createStartingPlatform();
    // if (this.globalFlag == false) {
    //   this.createCode();
    //   this.globalFlag = true;
    // }
  }

  update() {

    this.recyclePlatforms();
    // if (this.scanned == true) {
    //   var controllerList = this.simplePeer.controllerList;
    //   var size = Object.keys(this.simplePeer.controllerList).length;
    //   for (let i = 0; i < size; i++) {
    //     console.log(this.playerList[i].text);
    //     if (controllerList[Object.keys(controllerList)[i]].buttons['a'] == true && i == 0) {
    //       this.bird.body.velocity.y = -this.flapVelocity;
    //     } else if (controllerList[Object.keys(controllerList)[i]].buttons['a'] == true && i == 1) {
    //       this.secondBird.body.velocity.y = -this.flapVelocity;
    //     } else if (controllerList[Object.keys(controllerList)[i]].buttons['a'] == true && i == 2) {
    //       this.thirdBird.body.velocity.y = -this.flapVelocity;
    //     }
    //   }
    // }
  }

  createBG() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
  }

  createPlatforms() {
    this.platforms = this.physics.add.group();


    for (let i = 0; i < PLATFORMS_TO_RENDER; i++) {

      const platform = this.platforms.create(0, 0, 'ground')
        .setImmovable(true)
        // .setOrigin(0, 0)
        .setScale(0.5);
      this.placePlatform(platform);
    }
    this.platforms.setVelocityY(100);
  }

  createStartingPlatform() {
    this.start = this.physics.add.group();
    this.start.create(this.width/2, 600, 'ground').setScale(2);
  }

  placePlatform(platform) {

    count++;
    if (count % 15 == 0) {
      debugger
      const highestY = this.getHighestPlatform()
      vertical = -highestY;

    }
    const platformVerticalDistance = vertical;
    this.incremementVertical();
    // const platformVerticalPosition = Phaser.Math.Between(0, -platformVerticalDistance);
    var platformHorizontalDistance = 0;  Phaser.Math.Between(this.platformHorizontalDistanceLeft[0], this.platformHorizontalDistanceLeft[1]);
    if (platform.x < this.platformHorizontalDistanceLeft[1]) { // on left side
      platformHorizontalDistance = Phaser.Math.Between(this.platformHorizontalDistanceCentre[0], this.platformHorizontalDistanceRight[1]);
    }
    else if (platform.x > this.platformHorizontalDistanceRight[0]) { // on right side
      platformHorizontalDistance = Phaser.Math.Between(this.platformHorizontalDistanceLeft[0], this.platformHorizontalDistanceCentre[1]);
    }
    else { // center
      var random = Math.random();
      if (random < 0.5) {
        platformHorizontalDistance = Phaser.Math.Between(this.platformHorizontalDistanceLeft[0], this.platformHorizontalDistanceLeft[1]);
      }
      else {
        platformHorizontalDistance = Phaser.Math.Between(this.platformHorizontalDistanceRight[0], this.platformHorizontalDistanceRight[1]);
      }
    }
    platform.y = platformVerticalDistance
    platform.x = platformHorizontalDistance;

  }

  incremementVertical() {
    vertical -= 70;
  }

  getHighestPlatform() {
    let highest = 0;
    this.platforms.getChildren().forEach(function(platform) {
      highest = Math.max(platform.y, highest);
    })
    // highest = 400;
    return highest;
  }

  recyclePlatforms() {
    const tempPlatforms = [];

    this.platforms.getChildren().forEach(platform => {
      if (platform.getBounds().top > 600) {
        tempPlatforms.push(platform);
        if (tempPlatforms.length === 1) {
          this.placePlatform(...tempPlatforms);
        }
      }
    })
  }


  // createCode() {
  //   this.simplePeer = new smartcontroller.NesSmartController(); // the number 123456 is the controller id, if you leave it blank it's random so mutliple can use the website.
  //   this.simplePeer.createQrCode('https://emmapoliakova.github.io/webpack-test/nesController.html', 'qrcode', 150, 150, '1');
  //   var selfP = this;
  //   this.simplePeer.on("connection", function(nes){ // this can also be outside the update loop that is a listener on it's own
  //     this.controller = nes; 
  //     selfP.scanned = true;
  //   })
  // }
}

export default PlayScene;