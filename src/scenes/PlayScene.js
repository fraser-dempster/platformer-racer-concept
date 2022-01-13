import Phaser from "phaser";
import 'smartcontroller';

// all commented code is smartcontroller specific - not game specific

const PLATFORMS_TO_RENDER = 4;

class PlayScene extends Phaser.Scene {

  constructor(config) {
    super('PlayScene');
    this.config = config;

    this.globalFlag = false;
    this.controller = null;
    this.simplePeer = null;
    this.scanned = false;

    this.platforms = null;

    this.platformHorizontalDistance = [200, 600];
    this.platformVerticalDistance = [50, 200];

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
      const platform = this.platforms.create(200, 100, 'ground')
        .setImmovable(true)
        .setOrigin(0, 0);
      this.placePlatform(platform);
    }
    this.platforms.setVelocityY(100);
  }

  placePlatform(platform) {
    const highestY = this.getHighestPlatform();
    const platformVerticalDistance = Phaser.Math.Between(this.platformVerticalDistance[0], this.platformVerticalDistance[1]);
    const platformVerticalPosition = Phaser.Math.Between(0 + 20, this.config.height - 20 - platformVerticalDistance);
    const platformHorizontalDistance = Phaser.Math.Between(this.platformHorizontalDistance[0], this.platformHorizontalDistance[1]);
    platform.y = platformVerticalDistance
    platform.x = platformHorizontalDistance;
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

        console.log('hellooo');
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