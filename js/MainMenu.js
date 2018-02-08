var nameLabel;

var MainMenuState = {
    create:function() {
        var labelStyle = {font: 'bold 50px Space Mono', fill: '#ffffff', align: "center"};
        
        nameLabel = game.add.text(game.world.centerX ,game.world.centerY,"Click To Start", labelStyle);
        nameLabel.anchor.set(0.5);
        this.timer = game.time.events.loop(Phaser.Timer.SECOND, this.tick, this);

        game.input.activePointer.capture = true;
    },
    tick: function() {
        if (nameLabel.alpha > 0.5) {
            game.add.tween(nameLabel).to( {alpha: 0.1}, 1000, "Linear", true);
        } else {
            game.add.tween(nameLabel).to( {alpha: 1}, 1000, "Linear", true);
        }
    },
    update:function() {
        //updateLoading(nameLabel);
        if (game.input.activePointer.isDown) {
            game.state.start('play');
        }
    }
}