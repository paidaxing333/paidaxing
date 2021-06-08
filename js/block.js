// 障碍物
function Block(img) {
    this.img = 'url(' + img + ')';
    this.arr = [
        {row: 6, col:3},
        {row: 6, col:4},
        {row: 6, col:5},
        {row: 6, col:6},
        {row: 6, col:7},
        {row: 6, col:8}
    ]
}
var me = this;
Block.prototype.randomBlock = function() {
    var row = parseInt(me.map.rows * Math.random());
    var col = parseInt(me.map.cols * Math.random());
        for (var i = 0; i < me.block.arr.length; i++) {
            if (me.block.arr[i].row === row && me.block.arr[i].col === col) {
                return me.randomBlock;
            }
        }
        for (var i = 0; i < me.snake.arr.length; i++) {
            if (me.snake.arr[i].row === row && me.snake.arr[i].col ===col) {
            console.log('石头刷新到了蛇身上  重置石头');
            return me.randomBlock;
            }
        }
        if (me.food.row === row && me.food.col === col) {
            console.log('石头刷新到了食物上  重置石头');
            return me.randomBlock;
        }
        me.block.reset(row, col);
    var obj = {
        row: row,
        col: col
    };
    this.arr.push(obj);
}
Block.prototype.reset = function(row, col) {
    me.row = row;
    me.col = col; 
}
