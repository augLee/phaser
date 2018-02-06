var MainMenuState = {
    create:function() {
        var labelStyle = {font: 'bold 50px Space Mono', fill: '#ffffff', boundsAlignH: "center", boundsAlignV:"middle"};
        
        var nameLabel = game.add.text(0 ,0,"Click To Start", labelStyle);
        nameLabel.setShadow(3,3, 'rgba(0,0,0,0,5)', 2);
        nameLabel.setTextBounds(0,100,800,100);

        game.input.activePointer.capture = true;
    },

    update:function() {
        if (game.input.activePointer.isDown) {
            game.state.start('play');
        }
    }
}