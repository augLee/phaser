var PreLoaderState = {
    preload: function() {
        console.log("width :"+ game.width + " height : " + game.height  );
        var loadingLabel = game.add.text(game.width / 2,game.height /2, 'loading...', );

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.stage.backgroundColor="#000000";

        // load graphics image
        game.load.image("box", "./image/box.png");
        game.load.image("player", "./image/player.png");
        game.load.image("bullet", "./image/bullet.png");
        game.load.image("life", "./image/heart2.png");
        game.load.image("spaceBack", "./image/space.png");
        // load audio assets 
    },

    create: function() {
        game.state.start('MainMenu');
    }

};