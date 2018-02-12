

var PreLoaderState = {
    preload: function() {
        //console.log("width :"+ game.width + " height : " + game.height  );       
        
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.stage.backgroundColor="#ffffff";
        var preLoadBg = game.add.sprite(0,0,'loadingMenu');
        preLoadBg.height = game.height;
        preLoadBg.width = game.width;

        var loadingLabel = game.add.text(game.world.centerX ,game.world.centerY + 120, 'loading...',
            {font: 'bold 50px NanumGothic', fill: '#000000', align:"center"} );
        
        loadingLabel.anchor.set(0.4);

        // load graphics image
        game.load.image("box", "./image/box.png");
        game.load.image("player", "./image/player.png");
        game.load.image("bullet", "./image/bullet.png");
        game.load.image("life", "./image/heart2.png");
        game.load.image("spaceBack", "./image/space.png");
        game.load.image("MainImage","./image/main.png");

        game.load.image("Stone1", "./image/stone1.png");        
        game.load.image("Stone2", "./image/stone2.png");        
        game.load.image("Stone3", "./image/stone3.png");

        game.load.image("btn_res", "./image/btn_restart.png");
        // load audio assets 


        
    },

    create: function() {
        
        game.state.start('MainMenu');
    }

};
