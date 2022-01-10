!function(e){function t(t){for(var s,o,c=t[0],h=t[1],a=t[2],d=0,p=[];d<c.length;d++)o=c[d],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&p.push(r[o][0]),r[o]=0;for(s in h)Object.prototype.hasOwnProperty.call(h,s)&&(e[s]=h[s]);for(l&&l(t);p.length;)p.shift()();return n.push.apply(n,a||[]),i()}function i(){for(var e,t=0;t<n.length;t++){for(var i=n[t],s=!0,c=1;c<i.length;c++){var h=i[c];0!==r[h]&&(s=!1)}s&&(n.splice(t--,1),e=o(o.s=i[0]))}return e}var s={},r={0:0},n=[];function o(t){if(s[t])return s[t].exports;var i=s[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=e,o.c=s,o.d=function(e,t,i){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)o.d(i,s,function(t){return e[t]}.bind(null,s));return i},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var c=window.webpackJsonp=window.webpackJsonp||[],h=c.push.bind(c);c.push=t,c=c.slice();for(var a=0;a<c.length;a++)t(c[a]);var l=h;n.push([7,1]),i()}({6:function(e,t){function i(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}i.keys=function(){return[]},i.resolve=i,e.exports=i,i.id=6},7:function(e,t,i){"use strict";i.r(t);var s=i(0),r=i.n(s);class n extends r.a.Scene{constructor(e,t){super(e),this.config=t,this.screenCenter=[t.width/2,t.height/2],this.fontSize=34,this.lineHeight=42,this.fontOptions={fontSize:this.fontSize+"px",fill:"#fff"}}create(){if(this.add.image(0,0,"sky").setOrigin(0,0),this.config.canGoBack){this.add.image(this.config.width-10,this.config.height-10,"back").setOrigin(1).setScale(2).setInteractive().on("pointerup",(()=>{this.scene.start("MenuScene")}))}}createMenu(e,t){let i=0;e.forEach((e=>{const s=[this.screenCenter[0],this.screenCenter[1]+i];e.textGO=this.add.text(...s,e.text,this.fontOptions).setOrigin(.5,1),i+=this.lineHeight,t(e)}))}}var o=n;i(1);var c=class extends o{constructor(e){super("PlayScene",e),this.bird=null,this.secondBird=null,this.thirdBird=null,this.pipes=null,this.pipeHorizontalDistance=0,this.pipeVerticalDistanceRange=[150,250],this.pipeHorizontalDistanceRange=[500,550],this.flapVelocity=250,this.globalFlag=!1,this.controller=null,this.simplePeer=null,this.scanned=!1,this.playerList=[],this.score=0,this.scoreText=""}create(){super.create(),this.createBird(),this.createSecondBird(),this.createThirdBird(),this.createScore(),this.createPipes(),this.createColliders(),this.createPause(),0==this.globalFlag&&(this.createCode(),this.globalFlag=!0)}update(){if(this.checkGameStatus(),this.recyclePipes(),1==this.scanned){var e=this.simplePeer.controllerList,t=Object.keys(this.simplePeer.controllerList).length;for(let i=0;i<t;i++)console.log(this.playerList[i].text),1==e[Object.keys(e)[i]].buttons.a&&0==i?this.bird.body.velocity.y=-this.flapVelocity:1==e[Object.keys(e)[i]].buttons.a&&1==i?this.secondBird.body.velocity.y=-this.flapVelocity:1==e[Object.keys(e)[i]].buttons.a&&2==i&&(this.thirdBird.body.velocity.y=-this.flapVelocity)}}createBG(){this.add.image(0,0,"sky").setOrigin(0,0)}createBird(){this.bird=this.physics.add.sprite(this.config.startPosition.x,this.config.startPosition.y,"bird").setOrigin(0),this.playerList.push(this.bird),this.bird.body.gravity.y=400,this.bird.setCollideWorldBounds(!0)}createSecondBird(){this.secondBird=this.physics.add.sprite(this.config.startPosition.x,this.config.startPosition.y+50,"bird").setOrigin(0),this.playerList.push(this.secondBird),this.secondBird.body.gravity.y=400,this.secondBird.setTint(255),this.secondBird.setCollideWorldBounds(!0)}createThirdBird(){this.thirdBird=this.physics.add.sprite(this.config.startPosition.x,this.config.startPosition.y-50,"bird").setOrigin(0),this.playerList.push(this.thirdBird),this.thirdBird.body.gravity.y=400,this.thirdBird.setTint(16711680),this.thirdBird.setCollideWorldBounds(!0)}createPipes(){this.pipes=this.physics.add.group();for(let e=0;e<4;e++){const e=this.pipes.create(0,0,"pipe").setImmovable(!0).setOrigin(0,1),t=this.pipes.create(0,0,"pipe").setImmovable(!0).setOrigin(0,0);this.placePipe(e,t)}this.pipes.setVelocityX(-200)}createColliders(){this.physics.add.collider(this.bird,this.pipes,this.invisibleBird,null,this),this.physics.add.collider(this.secondBird,this.pipes,this.invisibleSecondBird,null,this),this.physics.add.collider(this.thirdBird,this.pipes,this.invisibleThirdBird,null,this)}createScore(){this.score=0;const e=localStorage.getItem("bestScore");this.scoreText=this.add.text(16,16,"Score: 0",{fontSize:"32px",fill:"#000"}),this.add.text(16,52,"Best score: "+(e||0),{fontSize:"18px",fill:"#000"})}createPause(){this.add.image(this.config.width-10,this.config.height-10,"pause").setOrigin(1).setScale(3).setInteractive().on("pointerdown",(()=>{this.physics.pause(),this.scene.pause(),this.scene.launch("PauseScene")}))}createCode(){this.simplePeer=new smartcontroller.NesSmartController,this.simplePeer.createQrCode("https://emmapoliakova.github.io/webpack-test/nesController.html","qrcode",150,150,"1");var e=this;this.simplePeer.on("connection",(function(t){this.controller=t,e.scanned=!0}))}movement(e,t){1==e.buttons.up&&-this.flapVelocity}checkGameStatus(){this.bird.getBounds().bottom>=this.config.height||this.bird.y<=0?this.bird.setVisible(!1):(this.secondBird.getBounds().bottom>=this.config.height||this.secondBird.y<=0)&&this.secondBird.setVisible(!1),(this.thirdBird.getBounds().bottom>=this.config.height-2||this.thirdBird.y<=0)&&this.thirdBird.setVisible(!1),0==this.secondBird.visible&&0==this.bird.visible&&0==this.thirdBird.visible&&this.gameOver()}placePipe(e,t){const i=this.getRightMostPipe(),s=Phaser.Math.Between(...this.pipeVerticalDistanceRange),r=Phaser.Math.Between(20,this.config.height-20-s),n=Phaser.Math.Between(...this.pipeHorizontalDistanceRange);e.x=i+n,e.y=r,t.x=e.x,t.y=e.y+s}recyclePipes(){const e=[];this.pipes.getChildren().forEach((t=>{t.getBounds().right<=0&&(e.push(t),2===e.length&&(this.placePipe(...e),this.increaseScore(),this.saveBestScore()))}))}getRightMostPipe(){let e=0;return this.pipes.getChildren().forEach((function(t){e=Math.max(t.x,e)})),e}invisibleBird(){this.bird.setVisible(!1)}invisibleSecondBird(){this.secondBird.setVisible(!1)}invisibleThirdBird(){this.thirdBird.setVisible(!1)}saveBestScore(){const e=localStorage.getItem("bestScore"),t=e&&parseInt(e,10);(!t||this.score>t)&&localStorage.setItem("bestScore",this.score)}gameOver(){this.physics.pause(),this.bird.setTint(15616036),this.secondBird.setTint(15616036),this.thirdBird.setTint(15616036),this.saveBestScore(),this.time.addEvent({delay:1e3,callback:()=>{this.scene.restart()},loop:!1})}flap(){this.bird.body.velocity.y=-this.flapVelocity}increaseScore(){this.score++,this.scoreText.setText("Score: "+this.score)}};var h=class extends o{constructor(e){super("MenuScene",e),this.menu=[{scene:"PlayScene",text:"Play"},{scene:"ScoreScene",text:"Score"},{scene:null,text:"Exit"}]}create(){super.create(),this.createMenu(this.menu,this.setupMenuEvents.bind(this))}setupMenuEvents(e){const t=e.textGO;t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fill:"#ff0"})})),t.on("pointerout",(()=>{t.setStyle({fill:"#fff"})})),t.on("pointerup",(()=>{e.scene&&this.scene.start(e.scene),"Exit"==e.text&&this.game.destroy(!0)}))}};class a extends r.a.Scene{constructor(){super("PreloadScene")}preload(){this.load.image("sky","assets/sky.png"),this.load.image("bird","assets/bird.png"),this.load.image("pipe","assets/pipe.png"),this.load.image("pause","assets/pause.png"),this.load.image("back","assets/back.png")}create(){this.scene.start("MenuScene")}}var l=a;var d=class extends o{constructor(e){super("ScoreScene",{...e,canGoBack:!0})}create(){super.create();const e=localStorage.getItem("bestScore");this.add.text(...this.screenCenter,"Best Score: "+(e||0),this.fontOptions).setOrigin(.5)}};const p={width:800,height:600,startPosition:{x:80,y:300}},u=[l,h,d,c,class extends o{constructor(e){super("PauseScene",e),this.menu=[{scene:"PlayScene",text:"Continue"},{scene:"MenuScene",text:"Exit"}]}create(){super.create(),this.createMenu(this.menu,this.setupMenuEvents.bind(this))}setupMenuEvents(e){const t=e.textGO;t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fill:"#ff0"})})),t.on("pointerout",(()=>{t.setStyle({fill:"#fff"})})),t.on("pointerup",(()=>{console.log("Clicking")}))}}],g=e=>new e(p),f={type:r.a.AUTO,...p,physics:{default:"arcade",arcade:{}},scene:u.map(g)};new r.a.Game(f)}});