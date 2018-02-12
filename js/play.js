// play.js
var box, player, inputkey, bullet, bulletAlive, score, score_Event, gameover_Text, life;
var spaceImage;
var btn_restart;
var bar;
var score_txt;

var stone1, stone2,stone3;

var playerLife = 2;
var score_num = 0;
var bulletArray=[]; 
var bulletCnt = 30;
var bulletMoveVelo = 150;



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
function btnUprestart() {
    game.state.start('MainMenu');
}

function levelDesign() {    
    score_num++; 
    score_txt.setText("SCORE "+ score_num);
    if (score_num %10 == 0) { 
        bulletMoveVelo+=10; 
        console.log(bulletMoveVelo); 
    }
}

var playState = {
    init:function() {
        playerLife = 2;
        score_num = 0;
        bulletMoveVelo = 150;
    },
    preload:function() {
        game.stage.backgroundColor = "#000000";
        
        spaceImage = game.add.sprite(0,0,'spaceBack');
        spaceImage.height = game.height;
        spaceImage.width = game.width;
        
    },

    create: function() {
        // player add        
        player = game.add.sprite(game.world.centerX, game.world.centerY, "player");
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        
        box = game.add.group();
        box.enableBody = true;

        for (var i = 0; i < game.width/20; i++) {
            box.create(i*20, 80,"box").body.immovable = true; // 위쪽에 box 생성 및 고정
            box.create(i*20, game.height-20,"box").body.immovable = true; // 아래쪽에 box 생성 및 고정 
        }
        for (var i =4; i < game.height/20 -1 ; i++) {
            box.create(10,i*20,"box").body.immovable = true; // 왼쪽에 box 생성 및 고정
            box.create(game.width-20,i*20,"box").body.immovable = true; // 오른쪽에 box 생성 및 고정
        }

        inputkey = game.input.keyboard.createCursorKeys();

        bullet = game.add.group();
        bullet.enableBody = true;
        bullet.physicsBodyType = Phaser.Physics.ARCADE;
        bullet.createMultiple(bulletCnt, "bullet");
        bullet.setAll("outOfBoundsKill", true);
        bullet.setAll("checkWorldBounds", true);

        bar = game.add.graphics();
        bar.beginFill(0x000000, 0.1);
        bar.drawRect(0, 0, game.width, 80);

        score_txt = game.add.text(20, 10,"SCORE 0", {fontSize:"50px", fill:"#ffffff"});
        score_Event = game.time.events.loop(Phaser.Timer.SECOND, levelDesign, this);        

        gameover_Text = game.add.text(game.world.centerX, game.world.centerY - 50, "GAME OVER", 
            {fontSize:"80px", fill:"#ffffff"});
        gameover_Text.anchor.setTo(0.5,0.5);
        gameover_Text.visible = false;

        btn_restart = game.add.button(game.world.centerX, game.world.centerY + 50, 'btn_res', btnUprestart, this);
        btn_restart.anchor.setTo(0.5,0.5);
        btn_restart.scale.setTo(2,2);
        btn_restart.visible = false;
    },

    update:function() {
        game.physics.arcade.collide(player, box);
        game.physics.arcade.overlap(bar, bullet, function(bar, bullet) {
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
            btn_restart.visible = true;
            return;
        }

        func_input();
        //levelDesign();

        bulletAlive = bullet.getFirstExists(false);
        bulletArray.length = 0;
        
        box.forEachAlive(function(bulletAlive){
            bulletArray.push(bulletAlive);
        });
        if(bulletAlive && bulletArray.length > 0) {
            var Rand = game.rnd.integerInRange(0, bulletArray.length -1);
            var bulletBox = bulletArray[Rand];
            bulletAlive.reset(bulletBox.body.x, bulletBox.body.y);
            game.physics.arcade.moveToObject(bulletAlive, player, bulletMoveVelo);
        }
    }
}
