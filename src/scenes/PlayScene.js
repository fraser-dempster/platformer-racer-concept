import Phaser from "phaser";
import 'smartcontroller';

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

    this.playerList = [];
    this.player = null;
    this.player2 = null;
    this.player3 = null;
    this.player4 = null;
    this.player5 = null;
    
    this.gameEndCounter = 0;
    
  }

  preload() {

    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.spritesheet('dude', 
      'assets/dude.png',
      { frameWidth: 32, frameHeight: 48 }
    );

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
    if (this.globalFlag == false) {
      this.createCode();
      this.globalFlag = true;
    }

    this.player = this.physics.add.sprite(400, 300, 'dude'); // loaded as sprite because it has animation frames
    this.player2 = this.physics.add.sprite(50, 300, 'dude'); // loaded as sprite because it has animation frames
    this.player3 = this.physics.add.sprite(100, 300, 'dude'); // loaded as sprite because it has animation frames
    this.player4 = this.physics.add.sprite(150, 300, 'dude'); // loaded as sprite because it has animation frames
    this.player5 = this.physics.add.sprite(300, 300, 'dude'); // loaded as sprite because it has animation frames

    this.playerList.push(this.player);
    this.playerList.push(this.player2);
    this.playerList.push(this.player3);
    this.playerList.push(this.player4);
    this.playerList.push(this.player5);

    this.player.setTint(0xFF0000);
    this.player2.setTint(0x746ab0);
    this.player3.setTint(0x288ba8);
    this.player4.setTint(0xffce30);
    this.player5.setTint(0xE389B9);

    for (let i = 0; i < this.playerList.length; i++) {

      this.physics.add.collider(this.playerList[i], this.platforms);
      this.physics.add.collider(this.playerList[i], this.start);
      // this.platforms
      // this.playerList[i].body.checkCollision.bottom = true;
      // this.playerList[i].body.checkCollision.top = false;
    }

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
  }

  update() {

    this.checkCollision();
    this.recyclePlatforms();

    if (this.scanned == true) {
      var controllerList = this.simplePeer.controllerList;
      var size = Object.keys(this.simplePeer.controllerList).length;
      for (let i = 0; i < size; i++) {
        this.movement(controllerList[Object.keys(controllerList)[i]], this.playerList[i]);
      }
    }
  }
  movement (playerController, player) {
    if (playerController.buttons['right'] == true) {
        player.setVelocityX(160);
        console.log("right equals true");

        player.anims.play('right', true);
      }
      else if (playerController.buttons['left'] == true) {
        player.body.velocity.x = -150;
        console.log("left equals true");

        player.anims.play('left', true);
      }
      else
        {
          player.setVelocityX(0);

          player.anims.play('turn');
        }
      
      // this has to be last otherwise phaser messes up
      if (playerController.buttons['a'] && player.body.touching.down) {
        player.setVelocityY(-400);
        console.log("jump equals true");
      }
  }

  checkCollision() {
    for (let i = 0; i < this.playerList.length; i++) {
      if (this.playerList[i].getBounds().bottom >= this.config.height) {
        this.playerList[i].destroy();
        this.gameEndCounter++;
      }
    }
    if (this.gameEndCounter == 5) {
      this.scene.stop();
    }
  }
  createBG() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
  }

  createPlatforms() {
    this.platforms = this.physics.add.group();

    for (let i = 0; i < PLATFORMS_TO_RENDER; i++) {
      const platform = this.platforms.create(0, 0, 'ground')
        .setImmovable(true)
        .setScale(0.5);
      platform.body.setAllowGravity(false);
      // platform.body.checkCollision.bottom = false;
      // platform.body.checkCollision.top = true;
      // platform.body.checkCollision.left = false;
      // platform.body.checkCollision.right = false;
      this.placePlatform(platform);
    }
    this.platforms.setVelocityY(100);
  }

  createStartingPlatform() {
    this.start = this.physics.add.group();
    const first = this.start.create(400, 510, 'ground').setScale(6).setImmovable(true).refreshBody();
    first.body.setAllowGravity(false);
    this.start.setVelocityY(10);
  }

  placePlatform(platform) {
    count++;
    if (count % 15 == 0) {
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


  createCode() {
    this.simplePeer = new smartcontroller.NesSmartController(); // the number 123456 is the controller id, if you leave it blank it's random so mutliple can use the website.
    this.simplePeer.createQrCode('https://emmapoliakova.github.io/webpack-test/nesController.html', 'qrcode', 150, 150, '1');
    var selfP = this;
    this.simplePeer.on("connection", function(nes){ // this can also be outside the update loop that is a listener on it's own
      this.controller = nes; 
      selfP.scanned = true;
    })
  }
}

export default PlayScene;