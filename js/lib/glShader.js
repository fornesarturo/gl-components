// {
//     vertexShader: vs, // pass as a string, e.g. document.getElementById("shader-vs").text
//     fragmentShader: fs, // pass as a string, e.g. document.getElementById("shader-fs").text;
//     attributes: ["attribA", "attribB"],
//     uniforms: ["uniformA", "uniformB"]
// }
function glShader({ gl, vertexShader, fragmentShader, attributes, uniforms }) {

    var self = this

    self.init = function () {
        // Create GLSL shaders (upload source & compile shaders)
        var t_vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShader)
        var t_fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader)

        // Link the two shaders into a shader program
        // Store program in shader object
        self.shaderProgram = createShaderProgram(gl, t_vertexShader, t_fragmentShader)

        self.attributeLocations = {}
        self.uniformLocations = {}
        // Look up into the vertex shader where the CPU's vertex data go
        // For each attribute
        for (attribute of attributes) {
            self.attributeLocations[toString(attribute)] = gl.getAttribLocation(self.shaderProgram, toString(attribute))
        }
        // For each uniform
        for (uniform of uniforms) {
            self.uniformLocations[toString(uniform)] = gl.getUniformLocation(self.shaderProgram, toString(uniform))
        }
    }

    self.use = function () {
        gl.useProgram(self.shaderProgram)
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