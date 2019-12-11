var stage = document.querySelector('.stage')
var btnStart = document.querySelector('.stage .game-start .start')
var scenceGame = document.querySelector('.stage .game')
var scorespan = document.querySelector('.game .content .score .player1')
var dead = document.querySelector('.game .content .dead')
var paymoney = document.querySelector('.paymoney')
var restart = document.querySelector('.restart')
var buffbtn = document.querySelector('.game .content .buff #buffbtn')




var typeOurPlane = {
    path: "our-Plane.gif",
    boom: "our-plane-boom.gif",
    w: 66,
    h: 80,
    blood: 3,
    delay: 30
}
var typeOurBullet = {
    path: "our-bullet.png",
    w: 6,
    h: 14,
    //速度
    speed: -10,
    blood: 1,
}

var typeEnemyPlaneS = {
    path: "enemy-plane-s.png",
    boom: "enemy-plane-s-boom.gif",
    w: 34,
    h: 24,
    speed: 4,
    blood: 1,
    delay: 10

};
var typeEnemyPlaneM = {
    path: "enemy-plane-m.png",
    hit: "enemy-plane-m-hit.png",
    boom: "enemy-plane-m-boom.gif",
    w: 46,
    h: 60,
    speed: 3,
    blood: 3,
    delay: 30,
};

var typeEnemyPlaneL = {
    path: "enemy-plane-l.png",
    hit: "enemy-plane-l-hit.png",
    boom: "enemy-plane-l-boom.gif",
    w: 110,
    h: 164,
    speed: 2,
    blood: 5,
    delay: 50,
};

//

// 所有元素构造器 型号对象 (图片&尺寸)  位置x y
// w宽度 h高度 s速度 xy坐标点
function Element(type, x, y) {
    this.path = type.path;
    this.x = x;
    this.y = y;
    this.w = type.w;
    this.h = type.h;
    this.s = type.speed;
    this.bullets = [];
    this.b = type.blood
    this.blood = type.blood
    this.hit = type.hit;
    this.boom = type.boom;
    this.delay = type.delay;
    this.d = type.delay;
    this.die = false;

}

// 根据 元素自身的位置信息 更新视图
Element.prototype.updataView = function () {
    this.node.style.left = this.x - this.w / 2 + "px";
    this.node.style.top = this.y - this.h / 2 + "px";
    // 修正偏移 点中心点
};

// 创建节点 画出某个元素
Element.prototype.draw = function () {
    this.node = document.createElement("img");
    this.node.src = game.srcPath + this.path;
    scenceGame.appendChild(this.node);

    this.updataView();
};

// 移动元素 更新位置 更新视图
Element.prototype.move = function () {
    this.y += this.s;
    this.updataView();
};

// 创建 我方飞机 子弹 的方法
// var b1 = new Element(typeOurBullet, ourPlane.x, ourPlane.y);
Element.prototype.createBullet = function () {
    game.players.forEach(function (player, index, players) {

        //如果当前玩家有buff加持
        if (player.buff === true) {
            var left = new Element(typeOurBullet, player.x - 20, player.y);
            var right = new Element(typeOurBullet, player.x + 20, player.y);
            var newBullet = new Element(typeOurBullet, player.x, player.y);
            var left2 = new Element(typeOurBullet, player.x - 30, player.y);
            var right2 = new Element(typeOurBullet, player.x + 30, player.y);
            var left3 = new Element(typeOurBullet, player.x - 10, player.y);
            var right3 = new Element(typeOurBullet, player.x + 10, player.y);
            newBullet.draw();
            left.draw();
            right.draw();
            left2.draw()
            right2.draw()
            left3.draw()
            right3.draw()
            player.bullets.push(left, right, left2, right2, newBullet, left3, right3);


        } else {
            var newBullet = new Element(typeOurBullet, player.x, player.y);
            newBullet.draw();
            player.bullets.push(newBullet);
        }

    });
};

// 移动所有子弹的位置
Element.prototype.moveAllBullets = function () {
    this.bullets.forEach(function (bullet, index, bullets) {
        // console.log(this); forEach this指向window

        // 移动当前遍历的子弹
        bullet.move();
        // 判断当前遍历的子弹 是否超出
        if (bullet.checkTopOver()) {
            // 如果超出就删除dom节点
            scenceGame.removeChild(bullet.node);
            // 还需要删除 数组里面的项
            bullets.splice(index, 1);
        }
    });
};

// 判断元素是否超出画布 返回布尔值
Element.prototype.checkTopOver = function () {
    if (this.y < -this.h / 2) {
        return true;
    }
};
// 判断元素是否超出画布 返回布尔值
Element.prototype.checkBottomOver = function () {
    if (this.y > game.scenceH + this.h / 2) {
        return true;
    }
};

//判断2个元素是否碰撞 返回布尔值
Element.prototype.checkCrash = function (other) {
    if (this.blood > 0) {
        // 如果飞机已经死亡 不要挡子弹
        var hCrash = Math.abs(this.x - other.x) < (this.w + other.w) / 2;
        var vCrash = Math.abs(this.y - other.y) < (this.h + other.h) / 2;

        return hCrash && vCrash ? true : false;
    }
}

//游戏配置
function Game() {
    this.framesFade = 0
    this.gameBgPosY = 0
    this.srcPath = "./assets/images/"
    this.scenceW = window.innerWidth
    this.scenceH = window.innerHeight
    this.enemys = []
    this.players = []
    this.bulletThick = 10;
    this.enemyThick = 100;

}

//背景
Game.prototype.bgUpdate = function () {
    this.gameBgPosY++;
    scenceGame.style.backgroundPositionY = this.gameBgPosY + "px";
};

//创造我方飞机
Game.prototype.createPlayer = function () {
    // debugger
    var newPlayer = new Element(typeOurPlane, game.scenceW / 2, game.scenceH - typeOurPlane.h / 2)
    this.players.push(newPlayer)
    console.log(newPlayer);

    newPlayer.draw()

}

//移动子弹
Game.prototype.moveAllBullets = function () {
    this.players.forEach(function (player) {
        player.bullets.forEach(function (bullet, index, bullets) {
            bullet.move()
            //判断子弹超出
            if (bullet.checkTopOver()) {
                //删除节点
                scenceGame.removeChild(bullet.node)
                //删除项
                bullets.splice(index, 1)

            }
        })
    })
}

//创造敌方飞机
Game.prototype.createEnemy = function (type) {
    //产生随机数让敌机在屏幕宽度中出现
    var randomNum = Math.floor(Math.random() * this.scenceW)
    var newEnemy = new Element(type, randomNum, -type.h / 2)
    this.enemys.push(newEnemy)
    newEnemy.draw()
}
//敌机移动
Game.prototype.moveAllEnemys = function () {
    this.enemys.forEach(function (enemy, index, enemys) {
        enemy.move()
        if (enemy.checkBottomOver()) {
            scenceGame.removeChild(enemy.node)
            enemys.splice(index, 1)
        }
    })
}

//遍历所有敌方飞机和我方子弹 检测碰撞
Game.prototype.checkAllCrash = function () {
    game.enemys.forEach(function (enemy, ie, enemys) {
        game.players.forEach(function (player, ip, players) {
            player.bullets.forEach(function (bullet, ib, bullets) {
                if (enemy.checkCrash(bullet)) {
                    // console.log('zhuangshangle');

                    enemy.blood--
                    bullet.blood--
                }
            })

            //我方飞机跟敌方飞机碰撞
            if (enemy.checkCrash(player) && !player.die) {
                // console.log('xxx');
                enemy.blood = 0
                player.blood--
                //标记死亡
                player.die = true
                //爆炸
                player.node.src = game.srcPath + player.boom

                // game.gameOver();


            }
        })
    })
}

Game.prototype.gameOver = function () {
    this.pause()
    dead.style.bottom = dead.offsetHeight + 'px'
}

var playerScore = 0

//遍历所有敌机和我方子弹  检测血条
Game.prototype.checkAllBlood = function () {
    //更新敌方飞机被子弹撞死更新的图片
    game.enemys.forEach(function (enemy, ie, enemys) {
        if (enemy.blood < enemy.b && enemy.blood > 0) {
            //挨打
            enemy.node.src = game.srcPath + enemy.hit
        } else if (enemy.blood <= 0 && !enemy.die) {
            enemy.die = true
            enemy.node.src = game.srcPath + enemy.boom
        }
    })

    //消除子弹
    game.players.forEach(function (player) {
        player.bullets.forEach(function (bullet, index, bullets) {
            if (bullet.blood <= 0) {
                scenceGame.removeChild(bullet.node)
                bullets.splice(index, 1)

                playerScore++
                console.log(playerScore);

                scorespan.innerText = '得分:' + playerScore

            }
        })
    })
}

//清理已经被打死的飞机
Game.prototype.clearAllDead = function () {
    game.enemys.forEach(function (enemy, index, enemys) {
        // 检测飞机死亡状态 ，延迟 清理已死亡飞机
        if (enemy.die) {
            // 飞机死亡
            if (enemy.delay > 0) {
                // 刚换了爆炸图 gif延时还没到
                enemy.delay--
            } else {
                // 已经炸完了 清DOM 删数组
                scenceGame.removeChild(enemy.node)
                enemys.splice(index, 1)
            }
        }
    })

    game.players.forEach(function (player, ip, players) {
        if (player.die) {
            if (player.blood > 0) {

                if (player.delay > 0) {
                    player.delay--
                } else {
                    player.node.src = game.srcPath + player.path
                    player.die = false
                    player.delay = player.d
                }

            } else {
                //为0没生命
                game.gameOver()

            }
        }
    })
}




//游戏开始

Game.prototype.start = function () {

    this.setIntervalId = window.setInterval(function () {
        // debugger

        game.framesFade++;
        //背景移动
        game.bgUpdate()

        //随机产生飞机
        if (game.framesFade % game.enemyThick === 0) {
            // 80% 小飞机  15% 中飞机 5% 大飞机
            var randomNum = Math.floor(Math.random() * 100);
            if (randomNum < 5) {
                game.createEnemy(typeEnemyPlaneL);
            } else if (randomNum < 20) {
                game.createEnemy(typeEnemyPlaneM);
            } else {
                game.createEnemy(typeEnemyPlaneS);
            }
        }

        //子弹移动
        game.moveAllBullets();


        //每一帧都更新一下所有敌方飞机的位置
        game.moveAllEnemys();
        // 判断帧数 如果是 ？ 的倍数 就生成子弹
        // console.log(game.framesFade);

        //子弹数量
        if (game.framesFade % game.bulletThick === 0) {

            game.players.forEach(function (player) {
                player.createBullet()
            });
        }

        //检测碰撞
        game.checkAllCrash()

        //血条
        game.checkAllBlood()

        //清理死亡的飞机
        game.clearAllDead()

    }, 20)
    this.state = 1
    dead.style.bottom = -dead.offsetHeight + 'px'
}

//游戏暂停
Game.prototype.pause = function () {
    clearInterval(this.setIntervalId)
    this.state = 0
}

//切换到游戏界面
var game;

btnStart.onclick = function () {

    stage.style.marginLeft = "-100%";

    game = new Game();

    game.createPlayer()

    game.start();
}

//手指拖动的时候 移动飞机 更新我方飞机的位子
scenceGame.ontouchmove = function (event) {
    //  console.log(event);

    game.players[0].x = event.touches[0].pageX
    game.players[0].y = event.touches[0].pageY

    game.players.forEach(function (player) {
        player.updataView()
    })

}

//点击游戏场景 暂停开始游戏 
scenceGame.ontouchstart = function (start) {
    var startX = start.touches[0].clientX;
    var startY = start.touches[0].clientY;
    document.body.ontouchend = function (end) {
        // console.log(end);

        var endX = end.changedTouches[0].clientX
        var endY = end.changedTouches[0].clientY
        if (startX === endX && startY === endY) {
            if (game.state === 0) {
                game.start()
            } else {
                game.pause()
            }
        }
    }
}

restart.onclick = function () {
    window.location.reload()
}

paymoney.onclick = function () {
    game.players.forEach(function (player, index, players) {
        players[index].blood = 3
    })
    dead.style.bottom = -dead.offsetHeight + 'px'
    // scorespan.innerText =''

}

buffbtn.ontouchend = function (event) {
    event.stopPropagation()

    game.players[0].buff = true
    game.bulletThick = 5
    game.enemyThick = 10;
    typeOurBullet.speed = -20
    typeEnemyPlaneS.speed = 10
    typeEnemyPlaneM.speed = 8
    typeEnemyPlaneL.speed = 6





    setTimeout(function () {
        game.players[0].buff = false;
        game.bulletThick = 10
        game.enemyThick = 100;
        typeEnemyPlaneS.speed = 4
        typeEnemyPlaneM.speed = 3
        typeEnemyPlaneL.speed = 2

    }, 10000);
}


