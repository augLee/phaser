Game.PreLoader = function(game) {
    this.preloadBar = null;
};

Game.PreLoader.prototype = {
    preload:function() {
        this.preloadBar = this.add.sprite(0,0,'preLoaderBar');

        this.preloadBar.anchor.setTo(0.5,0.5);
        this.time.advancedTiming = true;
        this.load.setPreLoadSprite(this.preloadBar);

        // load all assets
        



    },

    create:function() {
        this.state.start('level1');
    }
}