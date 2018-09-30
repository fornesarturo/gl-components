"use strict"

function createComponents(gl)
{
	var components = []
	// Create Triangle object
	var triangle = new glComponent({
		gl: gl,
		shaders: {
			shaderA: {
				vertexShader: document.getElementById("shader-vs").text,
				fragmentShader: document.getElementById("shader-fs").text,
				attributes: ["aPosition"],
				uniforms: []
			}
		},
		buffers: {
			vboPosition: {
				type: Float32Array,
				initialData: [
					0., 0.5, 		// V0
					-0.5, -0.5, // v1
					0.5, -0.5		// V2
				]
			}
		},
		data: {}
	})
	// Set its render function
	triangle.setRender(function () {
		var triangleSelf = triangle.getSelf()
		var gl = triangle.getGL();
		triangleSelf.useProgram("shaderA")
		triangleSelf.setupAttribute("aPosition", "vboPosition", 2, gl.FLOAT, false, 0, 0)
		triangleSelf.drawArrays(gl.LINE_LOOP, 0, 3)
	})

	var triangle2 = new glComponent({
		gl: gl,
		shaders: {
			shaderB: {
				vertexShader: document.getElementById("shader-vs").text,
				fragmentShader: document.getElementById("shader-fs").text,
				attributes: ["aPosition"],
				uniforms: []
			}
		},
		buffers: {
			vboPositionA: {
				type: Float32Array,
				initialData: [
					0., 0.25, 		// V0
					-0.25, -0.25, // v1
					0.25, -0.25		// V2
				]
			}
		},
		data: {}
	})
	// Set its render function
	triangle2.setRender(function () {
		var triangleSelf = triangle2.getSelf()
		var gl = triangle2.getGL()
		triangleSelf.useProgram("shaderB")
		triangleSelf.setupAttribute("aPosition", "vboPositionA", 2, gl.FLOAT, false, 0, 0)
		triangleSelf.drawArrays(gl.LINE_LOOP, 0, 3)
	})

	components.push(triangle)
	components.push(triangle2)

	return components
}

function main()
{
	var mainApp = new glApp({ canvas: "canvas", clearColor: [0., 0., 0., 1.], animate: false })
	if (!mainApp.gl) return

	var components = createComponents(mainApp.gl)
	
	// Adding a component can be done in one of the following ways:
	
	// For one component at a time
	// mainApp.addComponent(components[0])
	
	// For multiple components
	mainApp.addComponents(components)

	mainApp.run()
}
