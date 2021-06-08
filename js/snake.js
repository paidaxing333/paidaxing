// 蛇
function Snake(head, body, tail) {
    
    this.arr = [
        {row: 4, col: 7 },
        {row: 4, col: 6 },
        {row: 4, col: 5 }
    ];
    this.head = head;
    this.tail = tail;
    this.direction = 39;    
    this.headImg = head[this.direction - 37];
    this.bodyImg = body;
    this.tailImg = tail[this.direction - 37];
}
Snake.prototype.move = function() {
    // console.log('sanke move');
    var tail = this.arr.pop();
    tail.row = this.arr[0].row;
    tail.col = this.arr[0].col;
    if (this.direction == 37) {
        //左
            tail.col--;
    }
    if (this.direction == 38) {
        //上
        tail.row--;
    }if (this.direction == 39) {
        //右
        tail.col++;
    }if (this.direction == 40) {
        //下
        tail.row++;
    }
    //     case 37:
            
    //         break;
    //     // 上
    //     case 38:
    //         tail.row--;
    //         break;
    //     // 右
    //     case 39:
    //         tail.col++;
    //         break;
    //     // 下
    //     case 40:
    //         tail.row++;
    //         break; 
    //     default :;  
    // }
    this.arr.unshift(tail);
    this.star = true;
    var tail = this.arr[this.arr.length - 1];
    var body = this.arr[this.arr.length - 2];
    if (tail.row === body.row) {
        if (tail.col < body.col) {
            this.tailImg = this.tail[2];    
        }else {
            this.tailImg = this.tail[0];
        }
    }else if (tail.col === body.col) {
        if (tail.row < body.row) {
            this.tailImg = this.tail[3];
        }else {
            this.tailImg = this.tail[1];
        }
    }
}
Snake.prototype.changeDirection = function(e) {
    // console.log(e);
    if (!this.star) {
        return;
    }
    this.star = false;
    if (Math.abs(e - this.direction) === 2 ) {
        return;
    }

    this.direction = e;
    this.headImg = this.head[e - 37];
}
Snake.prototype.grew = function() {
    var tail = this.arr[this.arr.length - 1];
    var obj = {
        row: tail.row,
        col: tail.col

    };
    this.arr.push(obj);
}