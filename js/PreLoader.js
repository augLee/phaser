var PreLoaderState = {
    preload: function() {
        var loadingLabel = game.add.text(80,150, 'loading...', );

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.stage.backgroundColor="#000000";

        // load graphics image

        // load audio assets 



    },

    create: function() {
        game.state.start('MainMenu');
    }

};