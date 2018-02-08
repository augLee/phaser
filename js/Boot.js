// boot.js
var BootState = {
    preload: function() {
        // loading page
        game.load.image('loadingMenu', "./image/preLoaderImage.png");
    },
    create:function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('PreLoader');
    }
}