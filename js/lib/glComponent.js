/*
  Creates a WebGL object that both internally handles verbose operations
  and exposes the glComponent API to extension.

  Receives:
    {
      gl: gl,
      shaders: {
        shaderA: new glShader()
        ...
      },
      buffers: {
        bufferA: { type: Float32Array, initialData: ... },
        ...
      }
    }
*/
function glComponent ({ gl, shaders, buffers, data }) {

  var self = this

  self.init = function () {
    self.render = null
    self.update = null
    self.currentProgram = ""
    self.shaders = Object.assign({}, shaders)
    self.data = Object.assign({}, data)
    self.buffers = Object.assign({}, buffers)
    // for (shaderName in shaders) {
    //   if (!shaders.hasOwnProperty(shaderName)) continue
    //   self.initShader(shaderName)
    // }
    for (bufferName in buffers) {
      if (!buffers.hasOwnProperty(bufferName)) continue
      self.initBuffer(bufferName)
    }
  }

  // self.initShader = function (shaderName) {
  //   // Create GLSL shaders (upload source & compile shaders)
  //   var vertexShader = createShader(gl, gl.VERTEX_SHADER, self.shaders[shaderName].vertexShader)
  //   var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, self.shaders[shaderName].fragmentShader)

  //   // Link the two shaders into a shader program
  //   // Store program in shader object
  //   self.shaders[shaderName].shaderProgram = createShaderProgram(gl, vertexShader, fragmentShader)

  //   self.shaders[shaderName].attributeLocations = {}
  //   self.shaders[shaderName].uniformLocations = {}
  //   // Look up into the vertex shader where the CPU's vertex data go
  //   // For each attribute
  //   for (attribute of self.shaders[shaderName].attributes) {
  //     self.shaders[shaderName].attributeLocations[toString(attribute)] = gl.getAttribLocation(self.shaders[shaderName].shaderProgram, toString(attribute))
  //   }
  //   // For each uniform
  //   for (uniform of self.shaders[shaderName].uniforms) {
  //     self.shaders[shaderName].uniformLocations[toString(uniform)] = gl.getUniformLocation(self.shaders[shaderName].shaderProgram, toString(uniform))
  //   }
  // }

  self.initBuffer = function (bufferName) {
    self.buffers[bufferName].vbo = gl.createBuffer()
    if (self.buffers[bufferName].initialData != null)
      self.loadBufferData(bufferName, self.buffers[bufferName].initialData)
  }

  self.loadBufferData = function (bufferName, bufferData) {
    if (bufferData == null) return
    gl.bindBuffer(gl.ARRAY_BUFFER, self.buffers[bufferName].vbo)
    gl.bufferData(gl.ARRAY_BUFFER, new self.buffers[bufferName].type(bufferData), gl.STATIC_DRAW)
  }

  // Receives shader name as a string as it was passed in the
  // shaders object.
  self.useProgram = function (shaderName) {
    self.shaders[shaderName].use()
    self.currentProgram = shaderName
  }

  // This function does the whole binding our our VBO to the ARRAY_BUFFER
  // and passing data to it.
  // Receives attribute and buffer as string.
  self.setupAttribute = function (attribute, buffer, size, type, normalize, stride, offset) {
    // Turn on the attribute variable
    gl.enableVertexAttribArray(self.shaders[self.currentProgram].attributeLocations[attribute]);

    // Bind to a VBO
    gl.bindBuffer(gl.ARRAY_BUFFER, self.buffers[buffer].vbo);

    gl.vertexAttribPointer(self.shaders[self.currentProgram].attributeLocations[attribute], size, type, normalize, stride, offset);
  }

  // Draw the scene
  self.drawArrays = function (primitiveType, offset, count) {
    gl.drawArrays(primitiveType, offset, count);
  }

  // Because uniforms aren't binded in a generic way as
  // attributes, this function returns the uniform's
  // location for the user to operate on it.
  self.getUniform = function (uniform) {
    return self.shaders[self.currentProgram].uniformLocations[uniform]
  }

  // Get self object to allow user to write 
  // functions like render and update
  self.getSelf = function () {
    return self
  }

  self.getGL = function() {
    return gl
  }

  // Set the render function in 
  self.setRender = function (render) {
    self.render = render
  }

  self.setUpdate = function (update) {
    self.update = update
  }

  self.init()
}

function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }
  else {
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }
}

function createShaderProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
  else {
    console.log(gl.getShaderInfoLog(program));
    gl.deleteShader(program);
  }
}