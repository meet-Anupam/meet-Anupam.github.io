var space

function floatySpace() {
  var colors = ['#e74c3c', '#3498db', '#fff']

  space = new CanvasSpace('canvas', '#252934').display()
  var form = new Form(space)

  // Elements
  var pts = []
  var center = space.size.$divide(1.8)
  var angle = window.innerHeight
  var count = window.innerWidth
  if (count > 300) count = 300
  var line = new Line(0, angle).to(space.size.x, 0)
  var mouse = center.clone()

  var r = Math.min(space.size.x, space.size.y) * 1
  for (var i = 0; i < count; i++) {
    var p = new Vector(Math.random() * r - Math.random() * r, Math.random() * r - Math.random() * r)
    p.moveBy(center).rotate2D((i * Math.PI) / count, center)
    p.brightness = 0.1
    pts.push(p)
  }

  // Canvas
  space.add({
    animate: function (time, fps, context) {
      for (var i = 0; i < pts.length; i++) {
        // rotate the points slowly
        var pt = pts[i]

        pt.rotate2D(Const.one_degree / 20, center)
        form
          .stroke(false)
          .fill(colors[i % 3])
          .point(pt, 1)

        // get line from pt to the mouse line
        var ln1 = new Line(pt).to(line.getPerpendicularFromPoint(pt))

        // opacity of line derived from distance to the line
        var opacity = Math.min(0.8, 1 - Math.abs(line.getDistanceFromPoint(pt)) / r)
        var distFromMouse = Math.abs(ln1.getDistanceFromPoint(mouse))

        if (distFromMouse < 50) {
          if (pts[i].brightness < 0.3) pts[i].brightness += 0.015
        } else {
          if (pts[i].brightness > 0.1) pts[i].brightness -= 0.01
        }

        var color = 'rgba(126,126,126,' + pts[i].brightness + ')'
        form.stroke(color).fill(true).line(ln1)
      }
    },

    onMouseAction: function (type, x, y, evt) {
      if (type == 'move') {
        mouse.set(x, y)
      }
    },

    onTouchAction: function (type, x, y, evt) {
      this.onMouseAction(type, x, y)
    }
  })

  space.bindMouse()
  space.play()
}

floatySpace()

$(window).resize(function () {
  space.removeAll()
  $('canvas').remove()
  floatySpace()
})
