//var Game = {};
//
//
//Game.Boot = function(game) {
//
//};
//
//Game.Boot.prototype = {
//    init:fucntion() {
//        this.input.maxPointers = 1;
//        this.stage.disableVisibilityChange = true;
//
//    },
//    preload:function() {
//        this.load.image("preLoaderBar", "./image/preLoaderImage.png");
//    },
//    create:function() {
//        this.stage.start('PreLoader');
//    }
//}
var BootState = {
    create:function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('PreLoader');
    }
}