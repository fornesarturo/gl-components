function glApp ({ canvas, clearColor, animate, data }) {
  
  var self = this

  self.init = function () {
    self.data = Object.assign({}, data)
    self.animate = animate
    self.components = []
    // Get a WebGL Context.
    self.canvas = document.getElementById(canvas)
    self.gl = self.canvas.getContext("webgl")
    // Handle error by not performing any more tasks.
    if (!self.gl) return console.log("Error getting webgl")
    // Set the clear color
    self.gl.clearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3])
  }

  self.pauseAnimation = function () {
    self.animate = false
  }

  self.resumeAnimation = function () {
    self.animate = true
    self.run()
  }

  self.addComponent = function (component) {
    self.components.push(component);
  }

  self.addComponents = function (components) {
    self.components = self.components.concat(components)
  }

  self.run = function () {
    self.gl.clear(self.gl.COLOR_BUFFER_BIT);
    // Mapping from clip-space coords to the viewport in pixels
    self.gl.viewport(0, 0, self.canvas.width, self.canvas.height);
    // Tell each component to render itself
    for (component of self.components) {
      component.render()
    }
    // Animate if needed
    if (self.animate) {
      requestAnimationFrame(self.run)
    }
  }

  self.init()
}