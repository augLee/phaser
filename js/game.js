var game = new Phaser.Game(1020,1980,Phaser.AUTO,null, 'gameDiv');
 

game.state.add('Boot', BootState);
game.state.add('PreLoader', PreLoaderState);
game.state.add('MainMenu', MainMenuState);
game.state.add('play', playState);

game.state.start('Boot');
