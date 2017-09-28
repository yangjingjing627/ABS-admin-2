<template>
  <div class="chart">
    <canvas :id="id" width="495" height="200"></canvas>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      unit: '家',
      colors: ['#92FFB3', '#D6FF92', '#FFF492', '#92C0FF', '#92DAFF', '#92FFEA', '#9A92FF', '#F092FF', '#FFD492', '#FF92A4']
    }
  },
  props: ['id', 'data'],
  mounted() {
    if (this.id === 'city') {
      this.unit = '家'
    } else {
      this.unit = '次'
    }
    this.init()
  },
  watch: {
    data (val) {
      console.log(val)
      this.init()
    }
  },
  methods: {
    init() {
      let data = this.data
      // 获取上下文
      let acanvas = document.getElementById(this.id)
      let context = acanvas.getContext('2d')
      // 绘制背景
      context.fillStyle = '#fff'
      context.fillRect(0, 0, acanvas.width, acanvas.height)
      let realheight = acanvas.height - 30
      let realwidth = acanvas.width + 10
      // 描绘边框
      let gridcols = 0
      for (let i in data) {
        console.log(i)
        gridcols++
      }
      let cellwidth = realwidth / gridcols
      context.lineWidth = 1
      context.strokeStyle = '#D0D0D0'
      // 结束边框描绘
      context.beginPath()
      // 划横线
      context.moveTo(0, realheight)
      context.lineTo(realwidth - 15, realheight)
      context.lineWidth = 1
      context.strokeStyle = '#D0D0D0'
      context.stroke()
      let maxv = 0
      for (let i in data) {
        if (parseInt(data[i].storeCount) > maxv || parseInt(data[i].playCount) > maxv) {
          maxv = parseInt(data[i].storeCount) || parseInt(data[i].playCount)
        }
      }
      maxv = maxv * 1.2
      // 将数据换算为坐标
      let points = []
      for (let i in data) {
        let v = data[i].storeCount || data[i].playCount
        let px = cellwidth * (parseInt(i) + 0.1)
        let py = realheight - realheight * (v / maxv)
        points.push({'x': px, 'y': py})
      }
      // 绘制坐标图形
      for (let i in points) {
        let p = points[i]
        context.beginPath()
        context.fillStyle = this.colors[i]
        this.drawRoundRect(context, p.x + 5, p.y, 18, realheight - p.y, 6)
        context.strokeStyle = '#D0D0D0'
        context.stroke()
        context.fill()
      }
      // 添加文字
      for (let i in points) {
        let p = points[i]
        context.beginPath()
        context.fillStyle = '#1FAFF6'
        context.fillText((data[i].storeCount || data[i].playCount) + this.unit, p.x - 2, p.y - 10)
        context.fillStyle = '#555555'
        context.fillText(data[i].provinceName, p.x - 4, realheight + 25, 50)
      }
    },
    // 画圆弧
    drawRoundRect(cxt, x, y, width, height, radius) {
      cxt.beginPath()
      cxt.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2)
      cxt.lineTo(width - radius + x, y)
      cxt.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2)
      cxt.lineTo(width + x, height + y)
      cxt.lineTo(x, height + y)
      cxt.closePath()
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'scss/variables.scss';
</style>
