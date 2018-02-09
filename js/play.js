// play.js
var box, player, inputkey, bullet, bulletAlive, score, score_Event, gameover_Text, life;
var spaceImage;

var playerLife = 2;
var score_num = 0;
var bulletArray=[]; 
var bulletCnt = 30;

function func_input() {
        var velocity = 200;

            if (inputkey.left.isDown && inputkey.up.isDown) {
                player.body.velocity.x = -velocity;
                player.body.velocity.y = -velocity;
            } else if (inputkey.left.isDown && inputkey.down.isDown) {
                player.body.velocity.x = -velocity;
                player.body.velocity.y = +velocity;
            } else if (inputkey.right.isDown && inputkey.up.isDown) {
                player.body.velocity.x = +velocity;
                player.body.velocity.y = -velocity;
            } else if (inputkey.right.isDown && inputkey.down.isDown) {
                player.body.velocity.x = +velocity;
                player.body.velocity.y = +velocity;
            } else if (inputkey.left.isDown) {
                player.body.velocity.x = -velocity;
            } else if (inputkey.right.isDown) { 
                player.body.velocity.x = +velocity;
            } else if (inputkey.up.isDown) {                   
                player.body.velocity.y = -velocity;
            } else if (inputkey.down.isDown) {
                player.body.velocity.y = +velocity;
            }
}

var playState = {
    preload:function() {
        game.stage.backgroundColor = "#ffffff";
        
        spaceImage = game.add.sprite(0,0,'spaceBack');
        spaceImage.x = 0;              
        spaceImage.y = 0;
        spaceImage.height = game.height;
        spaceImage.width = game.width;
        
        game.create.texture('score',['C'], 800,80,0);
        game.add.sprite(0,0,'score');


        score = game.add.group();
        score.enableBody = true;
        score.create(0,0, "score");


    },

    create: function() {
        // player add
        //box = game.add.group();
        //box.enableBody = true;
        
        player = game.add.sprite(game.world.centerX, game.world.centerY, "player");
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        inputkey = game.input.keyboard.createCursorKeys();

        bullet = game.add.group();
        bullet.enableBody = true;
        bullet.physicsBodyType = Phaser.Physics.ARCADE;
        bullet.createMultiple(bulletCnt, "bullet");
        bullet.setAll("outOfBoundsKill", true);
        bullet.setAll("checkWorldBounds", true);

        var score_txt = game.add.text(20,10,"SCORE 0", {fontSize:"50px", fill:"#ffffff"});
        score_Event = game.time.events.loop(Phaser.Timer.SECOND,
        function() {score_num++; score_txt.setText("SCORE "+score_num);}, this);

        gameover_Text = game.add.text(game.world.centerX, game.world.centerY, "GAME OVER", 
            {fontSize:"80px", fill:"#ffffff"});
        gameover_Text.anchor.setTo(0.5,0.5);
        gameover_Text.visible = false;

    },


    update:function() {
        //game.physics.arcade.collide(player, sky);
        game.physics.arcade.overlap(score, bullet, function(sky, bullet) {
            bullet.kill();
        }, null, this);

        game.physics.arcade.overlap(player, bullet, function(player,bullet){
            bullet.kill();
            playerLife--;
        }, null, this);

        player.body.velocity.setTo(0,0);

        if (playerLife < 1) {
            game.time.events.remove(score_Event);
            gameover_Text.visible = true;
            return;
        }

        func_input();

        bulletAlive = bullet.getFirstExists(false);
        bulletArray.length = 0;
        if(bulletAlive && bulletArray.length > 0) {
            var Rand = game.rnd.integetInRange(0, bulletArray.length -1);
            var bulletBox = bulletArray(Rand);
            bulletAlive.reset(bulletBox.body.x, bulletBox.body.y);
            game.physics.arcade.moveToObject(bulletAlive, player, 150);
        }
        


    }
}
