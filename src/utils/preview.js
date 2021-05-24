import html2canvas from 'html2canvas';

export default (function() {
    function Previewjs(params) {
        // 构造函数
        if (!params.content) {
            return console.error('未传入数据容器')
        } else if (!params.cover) {
            return console.error('未传入水印文字')
        }
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
        html2canvas(this.content, {
            useCORS: true,
        }).then((canvas) => {
            div.appendChild(canvas)
            let col = Math.ceil(div.offsetWidth / 100) * 3
            let row = Math.ceil(div.offsetHeight / 50)
            let ctx = canvas.getContext("2d");
            ctx.font="30px Arial";
            ctx.fillStyle = 'rgba(0,0,0,.1)'
            ctx.translate(-(div.offsetHeight / 2), 0)
            ctx.rotate(50)
            for (let _row=0; _row<row; _row++) {
                for (let _col=0; _col<col; _col++) {
                    let x = _col * (ctx.measureText(that.cover).width + 100);
                    let y = _row * 80;
                    ctx.fillText(that.cover, x, y);
                }
            }
            this.setPreview(div)
        })
    }   
    Previewjs.prototype.setPreview = function(div) {
        html2canvas(div).then((canvas) => {
            this.content.innerHTML = ''
            this.content.appendChild(canvas)
            document.body.removeChild(div)
        })
    }
    return Previewjs
})(document)