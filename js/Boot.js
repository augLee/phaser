// boot.js
var BootState = {
    create:function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('PreLoader');
    }
}