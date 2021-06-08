//游戏
alert('开始游戏')
function Game(map, food, snake, block) {
    this.map = map;
    // 地图
    this.food = food;
    // 食物
    this.snake = snake;
    // 蛇
    this.block = block;
    // 障碍物
    this.loopTime = 300;
    // 循环时间
    this.timebar = null;
    this.state = false;
}
// 初始化
Game.prototype.init = function() {
    // console.log('game');
    this.renderMap();
    this.renderFood();
    this.renderBlock();
    this.renderSnake();
    this.startGame();
    this.bindEvent();
}
Game.prototype.renderMap = function() {
    this.map.init();
}
Game.prototype.renderFood = function() {
    this.map.arr[this.food.row][this.food.col].style.backgroundImage = this.food.img;
}
Game.prototype.renderBlock = function() {
    for (var i = 0; i < this.block.arr.length; i++) {
        var block = this.block.arr[i];
        this.map.arr[block.row][block.col].style.backgroundImage = this.block.img;
    }
}
Game.prototype.renderSnake = function() {
    var head = this.snake.arr[0];
    this.map.arr[head.row][head.col].style.backgroundImage = 'url( '+ this.snake.headImg +' )';
    for (var i = 1; i < this.snake.arr.length - 1; i++ ) {
        var body = this.snake.arr[i];
        this.map.arr[body.row][body.col].style.backgroundImage = 'url( ' + this.snake.bodyImg + ' )'
    }
    var tail = this.snake.arr[this.snake.arr.length - 1];
    this.map.arr[tail.row][tail.col].style.backgroundImage = 'url( ' + this.snake.tailImg + ' )'
}
Game.prototype.clear = function() {
    for(var i = 0; i < this.map.arr.length; i++) {
        for(var j = 0; j < this.map.arr[i].length; j++) {
            this.map.arr[i][j].style.backgroundImage = ''
        }
    }
}

Game.prototype.startGame = function() {
    var me = this;
   this.timebar = setInterval(function(){
        me.snake.move();
        me.checkGame();
        me.checkBlock();
        me.checkFood();
        me.checkBody();
       if (!me.state) {
        me.clear();
        me.renderBlock();
        me.renderFood();
        me.renderSnake();
       }
    }, this.loopTime)
}
Game.prototype.bindEvent = function() {
    var me = this;
    document.addEventListener('keydown', function(e) {
        switch (e.keyCode) {
            case 37:
            case 38:
            case 39:
            case 40:    
                me.snake.changeDirection(e.keyCode);
                break;
            default:;
        }
    },false)
} 
Game.prototype.checkGame = function() {
    var head = this.snake.arr[0];
    if (head.row < 0 || head.row >= this.map.rows  || head.col < 0 || head.col >= this.map.cols) {
       this.gameOver();
    }
}
Game.prototype.gameOver = function() {
    this.state = true;
    clearInterval(this.timebar);
    alert('游戏结束，你的得分是' + foods)
    location.reload()
}
Game.prototype.checkBlock = function() {
    var head = this.snake.arr[0];
    for (var i = 0; i < this.block.arr.length; i++) {
        var block = this.block.arr[i]
        if (head.row === block.row && head.col === block.col) {
            this.gameOver();
        }
    }
}
var foods = 0;
Game.prototype.checkFood = function() {
    var head = this.snake.arr[0];
    if (head.row === this.food.row && head.col === this.food.col) {
        this.snake.grew();
        this.randomFood();
        this.speedSnake();
        this.block.randomBlock();
    }
}
Game.prototype.speedSnake = function () {
    var me = this;
    this.loopTime -= 60;
    if (this.loopTime < 100) {
        this.loopTime = 100
    }
    foods++;
    console.log('这是分数'+foods);
    // console.log('这是速度' + num);
    console.log('这是速度' + this.loopTime);
    clearInterval(me.timebar)
    me.startGame();
}
Game.prototype.randomFood = function() {
    var row = parseInt(this.map.rows * Math.random());
    var col = parseInt(this.map.cols * Math.random());
    // console.log(row, col);
    for (var i = 0; i < this.block.arr.length; i++) {
            if (this.block.arr[i].row === row && this.block.arr[i].col === col){
            console.log('食物刷新到了石头身上  重置食物');
                return this.randomFood;
            }
    }
    for (var i = 0; i < this.snake.arr.length; i++) {
        if (this.snake.arr[i].row === row && this.snake.arr[i].col === col) {
            console.log('食物刷新到了蛇身上  重置食物');
            return this.randomFood;
        }
    }
    this.food.reset(row, col);
}
Game.prototype.checkBody = function() {
    var head = this.snake.arr[0];
    for (var i = 1; i < this.snake.arr.length; i++) {
        var body = this.snake.arr[i];
        if (head.row === body.row && head.col === body.col) {
            this.gameOver();
        }
    }
    // console.log(body);
}
