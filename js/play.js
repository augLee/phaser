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


var stone1, stone2, stone3, Alive_stone1, Alive_stone2, Alive_stone3;
var Arr_Stone1=[];
var Cnt_Stone1=15;
var Velo_Stone1=150;
var Arr_Stone2=[];
var Cnt_Stone2=15;
var Velo_Stone2=180;
var Arr_Stone3=[];
var Cnt_Stone3=15;
var Velo_Stone3=200;


function kill_stone(k1,k2)
{
    if(k2) k2.kill();
    playerLife--;
};

function func_overlap(k1,k2, i=0) 
{
    game.physics.arcade.overlap(k1, k2, function(k1, k2) {
        k2.kill();
        if (i != 0) { 
            playerLife--;
            //console.log(playerLife);
        }
    }, null, this);    

    if (playerLife < 1) return 1;

    return 0;
};

function revival_stone(alive, player, stone, stonearray, velo)
{
    alive = stone.getFirstExists(false);
    stonearray.length = 0;
    
    box.forEachAlive(function(alive){
        stonearray.push(alive);
    });
    if(alive && stonearray.length > 0) {
        var Rand = game.rnd.integerInRange(0, stonearray.length -1);
        var block = stonearray[Rand];
        alive.reset(block.body.x, block.body.y);
        game.physics.arcade.moveToObject(alive, player, velo);
    }
};

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
        Velo_Stone1 = 150;
        Velo_Stone2 = 180;
        Velo_Stone3 = 200;
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

        //bullet = game.add.group();
        //bullet.enableBody = true;
        //bullet.physicsBodyType = Phaser.Physics.ARCADE;
        //bullet.createMultiple(bulletCnt, "bullet");
        //bullet.setAll("outOfBoundsKill", true);
        //bullet.setAll("checkWorldBounds", true);

        stone1 = game.add.group();
        stone1.enableBody = true;
        stone1.physicsBodyType = Phaser.Physics.ARCADE;
        stone1.createMultiple(Cnt_Stone1, "Stone1");
        stone1.setAll("outOfBoundsKill", true);
        stone1.setAll("checkWorldBounds", true);

        stone2 = game.add.group();
        stone2.enableBody = true;
        stone2.physicsBodyType = Phaser.Physics.ARCADE;
        stone2.createMultiple(Cnt_Stone2, "Stone2");
        stone2.setAll("outOfBoundsKill", true);
        stone2.setAll("checkWorldBounds", true);

        stone3 = game.add.group();
        stone3.enableBody = true;
        stone3.physicsBodyType = Phaser.Physics.ARCADE;
        stone3.createMultiple(Cnt_Stone3, "Stone3");
        stone3.setAll("outOfBoundsKill", true);
        stone3.setAll("checkWorldBounds", true);

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
        func_overlap(bar,stone1);
        func_overlap(bar,stone2);
        func_overlap(bar,stone3);

        var check = func_overlap(player,stone1,1);
        func_overlap(player,stone2,1);
        func_overlap(player,stone3,1);

        player.body.velocity.setTo(0,0);

        if (playerLife < 1) {
            game.time.events.remove(score_Event);
            gameover_Text.visible = true;
            btn_restart.visible = true;
            return;
        }

        func_input();
        //levelDesign();

        revival_stone(Alive_stone1, player,stone1,Arr_Stone1, Velo_Stone1);
        revival_stone(Alive_stone2, player,stone2,Arr_Stone2, Velo_Stone2);
        revival_stone(Alive_stone3, player,stone3,Arr_Stone3, Velo_Stone3);

        //bulletAlive = bullet.getFirstExists(false);
        //bulletArray.length = 0;
        //
        //box.forEachAlive(function(bulletAlive){
        //    bulletArray.push(bulletAlive);
        //});
        //if(bulletAlive && bulletArray.length > 0) {
        //    var Rand = game.rnd.integerInRange(0, bulletArray.length -1);
        //    var bulletBox = bulletArray[Rand];
        //    bulletAlive.reset(bulletBox.body.x, bulletBox.body.y);
        //    game.physics.arcade.moveToObject(bulletAlive, player, bulletMoveVelo);
        //}
    }
}
