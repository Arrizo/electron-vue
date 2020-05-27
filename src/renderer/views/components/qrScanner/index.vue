<template>
  <div>
  <canvas id="canvas"></canvas>
  <video src="" id="video"></video>
  
  </div>
</template>
<script>
import jsQR from 'jsqr'
export default {
  name: 'jsqr',
  props: {
    eventIndex: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      video: '',
      canvasElement: '',
      canvas: '',
      decodedString: '',
      mediaStreamTrack: '',
      stopAinamation: null,
      videoList: []
    }
  },
  mounted() {
    this.getDomEle()
    this.getvideo()
    this.getVideoList()
  },
  watch: {
    eventIndex() {
      this.getvideo()
    }
  },
  beforeDestroy() {
    const _sthis = this
    window.cancelAnimationFrame(_sthis.stopAinamation)
    _sthis.stopVideoStrem()
  },
  methods: {
    getVideoList() {
      const _athis = this
      navigator.mediaDevices.enumerateDevices().then(function(devices) {
        devices.forEach(function(device) {
          if (device.kind === 'videoinput') {
            _athis.videoList.push(device.deviceId)
          }
        })
      }).catch(function(err) {
        console.log(err.name + ': ' + err.message)
      })
      console.log(_athis.videoList)
    },
    getDomEle() {
      this.video = document.getElementById('video')
      this.canvasElement = document.getElementById('canvas')
      this.canvas = (this.canvasElement).getContext('2d')
    },

    drawLine(a, b, c, d, color) {
      this.canvas.beginPath()
      this.canvas.moveTo(a.x, a.y)
      this.canvas.lineTo(b.x, b.y)
      this.canvas.stroke()
      this.canvas.moveTo(b.x, b.y)
      this.canvas.lineTo(c.x, c.y)
      this.canvas.stroke()
      this.canvas.moveTo(c.x, c.y)
      this.canvas.lineTo(d.x, d.y)
      this.canvas.stroke()
      this.canvas.moveTo(d.x, d.y)
      this.canvas.lineTo(a.x, a.y)
      this.canvas.stroke()
      this.canvas.lineWidth = 5
      this.canvas.strokeStyle = color
    },
    getvideo() {
      var that = this
      that.stopVideoStrem()
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { width: 1440, height: 1080, deviceId: { exact: that.videoList[that.eventIndex] }}
      }).then(function(stream) {
        that.video.srcObject = stream
        window.stream = stream
        that.video.setAttribute('playsinline', true) // required to tell iOS safari we don't want fullscreen
        that.video.play()
        that.stopAinamation = requestAnimationFrame(that.tick)
      })
    },

    // 关闭摄像流
    stopVideoStrem() {
      if (window.stream) {
        window.stream.getTracks().forEach(function(strack) {
          strack.stop()
        })
      }
    },
    // 解析加密
    onDecode(decodedString) {
      if (decodedString.indexOf('|') === -1 && decodedString.indexOf(';\'./') !== -1) {
        const key = parseInt(decodedString.substring(decodedString.indexOf(";'./") + 4))
        const arr = decodedString.split('')
        for (let i = 0; i < arr.length; i++) {
          arr[i] = String.fromCharCode(arr[i].charCodeAt(0) ^ key)
        }
        this.decodedString = arr.join('')
      } else {
        this.decodedString = decodedString
      }
    },

    tick: function() {
      var _this = this
      if (_this.video.readyState === _this.video.HAVE_ENOUGH_DATA) {
        _this.canvasElement.height = _this.video.videoHeight
        _this.canvasElement.width = _this.video.videoWidth
        _this.canvas.drawImage(_this.video, 0, 0, _this.canvasElement.width, _this.canvasElement.height)
        var imageData = _this.canvas.getImageData(0, 0, _this.canvasElement.width, _this.canvasElement.height)
        var code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert'
        })
        if (code) {
          _this.onDecode(code.data)
          _this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, code.location.bottomRightCorner, code.location.bottomLeftCorner, '#dd4a68')
          _this.$emit('getScanData', this.decodedString)
        }
      }
      if (_this.decodedString === '') {
        _this.stopAinamation = requestAnimationFrame(_this.tick)
      }
    }
  }

}
</script>
<style scoped>
  body {
      font-family: 'Ropa Sans', sans-serif;
      color: #333;
      max-width: 640px;
      margin: 0 auto;
      position: relative;
    }
    #canvas{
      width: 100%;
      display: none;
    }
    #video{
        width: 100%

    }
</style>
