var game = new Phaser.Game(800,600,Phaser.AUTO,null, 'gameDiv');

//function preload() {
//    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//    game.scale.pageAlignHorizontally = true;
//    game.scale.pageAlignVertically = true;
//    game.stage.backgroundColor="#2196F3";
//        
//    game.state.add('Boot', BootState);
//    game.state.add('PreLoader', PreLoaderState);
//    game.state.add('MainMenu', MainMenuState);
//    game.state.add('play', playState);
//}
//
//function create() {
//    game.state.start('Boot');
//}
//
//function update() {
//
//}

game.state.add('Boot', BootState);
game.state.add('PreLoader', PreLoaderState);
game.state.add('MainMenu', MainMenuState);
game.state.add('play', playState);

game.state.start('Boot');
