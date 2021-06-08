// 地图
function Maps(width, height, rows, cols, container) {
    this.height = height;
    // 总高度
    this.width = width;
    // 总高度
    this.rows = rows;
    // 总行数
    this.cols = cols;
    // 总列数
    this.itemWidth =  this.width / this.cols;
    this.itemHeight = this.height / this.rows;
    // 地图容器
    this.container = container;
    this.arr = [];
}
// 初始化的方法
Maps.prototype.init = function() {
    // console.log(111);
    for (var i = 0; i < this.rows; i++) {
        var rowDom = document.createElement('div');
        var rowArr = [];
        for (var j = 0; j < this.cols; j++) {
            var colDom = document.createElement('div');
            this.css(colDom, {
                width: this.itemWidth + 'px',
                height: this.itemHeight + 'px',
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                backgroundSize: 'cover'
            })
            rowDom.appendChild(colDom);
            rowArr.push(colDom);
        }
        this.css(rowDom, {
            display: 'flex',
        })
        this.container.appendChild(rowDom);
        this.arr.push(rowArr); 
    }
    this.css(this.container, {
        border: '1px solid #ccc',
        margin: '100px auto',
        height: this.height + 'px',
        width: this.width + 'px'
    })
}
Maps.prototype.css = function(dom, obj) {
    for (var key in obj) {
        dom.style[key] = obj[key];
    }
}