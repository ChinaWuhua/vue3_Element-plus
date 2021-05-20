import html2canvas from 'html2canvas';

export default (function() {
    function Previewjs(params) {
        // 构造函数
        if (!params.display) {
            return console.error('未传入展示容器')
        } else if (!params.content) {
            return console.error('未传入数据容器')
        } else if (!params.cover) {
            return console.error('未传入水印文字')
        }
        this.display = params.display
        this.content = params.content
        this.cover = params.cover
    }
    Previewjs.prototype.createContainer = function() {
        let div = document.createElement('div')
        div.style = `
            position: fixed;
            top: -100%;
            left: -100%;
            z-index: 99;
        `
        document.body.appendChild(div)
        return div
    }
    Previewjs.prototype.init = function() {
        let that = this;
        let div = this.createContainer()
        html2canvas(this.content).then((canvas) => {
            div.appendChild(canvas)
            let col = Math.ceil(div.offsetWidth / 100)
            let row = Math.ceil(div.offsetHeight / 50)
            let ctx = canvas.getContext("2d");
            ctx.font="30px Arial";
            ctx.strokeStyle = 'rgba(0,0,0,.2)'
            ctx.translate(-150, 0)
            ctx.rotate(50)
            for (let _row=0; _row<row; _row++) {
                for (let _col=0; _col<col; _col++) {
                    let x = _col * 200;
                    let y = _row * 100;
                    ctx.strokeText(that.cover, x, y);
                }
            }
            this.setPreview(div)
        })
    }   
    Previewjs.prototype.setPreview = function(div) {
        html2canvas(div).then((canvas) => {
            this.display.innerHTML = ''
            this.display.appendChild(canvas)
            document.body.removeChild(div)
        })
    }
    return Previewjs
})(document)