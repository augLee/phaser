var game = new Phaser.Game(800,600,Phaser.AUTO,null,
    {preload:preload, create:create, update:update});

function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor="#2196F3";
}

function create() {

}

function update() {

}

    