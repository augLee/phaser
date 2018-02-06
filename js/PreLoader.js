
var tick = 1;

function updateLoading(label) {
    tick++;
    if (tick % 2) {
        console.log(tick);
        game.add.tween(label).to( {alpha: 0}, 0, Phaser.Easing.Linear.None, true);
    } else {
        console.log(tick);
        game.add.tween(label).to( {alpha: 100}, 0, Phaser.Easing.Linear.None, true);
    }

}

var PreLoaderState = {
    preload: function() {
        console.log("width :"+ game.width + " height : " + game.height  );       
        
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.stage.backgroundColor="#000000";

        var loadingLabel = game.add.text(game.width / 2,game.height /2, 'loading...',
            {font: 'bold 50px Courier', fill: '#ffffff', align:"center"} );
        
        loadingLabel.anchor.set(0.5);
        // load graphics image
        game.load.image("box", "./image/box.png");
        game.load.image("player", "./image/player.png");
        game.load.image("bullet", "./image/bullet.png");
        game.load.image("life", "./image/heart2.png");
        game.load.image("spaceBack", "./image/space.png");
        game.load.image("loadingMenu", "./image/preLoaderImage.png");
        game.load.image("MainImage","./image/main.png");
        // load audio assets 
    },

    create: function() {
        
        game.state.start('MainMenu');
    }

};
