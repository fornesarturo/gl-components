"use strict"

var pointShader, singleColorShader, perVertexColorShader

function createComponents(gl) {

	pointShader = new GlShader({
		gl: gl,
		vertexShader: document.getElementById("point-shader-vs").text,
		fragmentShader: document.getElementById("point-shader-fs").text,
		attributes: ["aPosition"],
		uniforms: ["uPointSize", "uColor", "uModelViewProjMatrix"]
	})

	singleColorShader = new GlShader({
		gl: gl,
		vertexShader: document.getElementById("single-color-shader-vs").text,
		fragmentShader: document.getElementById("single-color-shader-fs").text,
		attributes: ["aPosition"],
		uniforms: ["uColor", "uModelViewProjMatrix"]
	})

	perVertexColorShader = new GlShader({
		gl: gl,
		vertexShader: document.getElementById("per-vertex-color-shader-vs").text,
		fragmentShader: document.getElementById("per-vertex-color-shader-fs").text,
		attributes: ["aPosition", "aColor"],
		uniforms: ["uModelViewProjMatrix"]
	})

	var components = []
	// Create Triangle object
	// var triangle = new Triangle({
	// 	gl: gl,
	// 	shaders: { 
	// 		"shaderA": shaderA, 
	// 		"pointShader": pointShader, 
	// 		"singleColorShader": singleColorShader, 
	// 		"perVertexColorShader": perVertexColorShader 
	// 	},
	// 	points: [
	// 		0., 0.5,
	// 		-0.5, -0.5,
	// 		0.5, -0.5
	// 	],
	// 	pointSize: 10.,
	// 	color: [1., 0., 1., 1.],
	// 	colors: [
	// 		1., 0., 0., 1.,
	// 		0., 1., 0., 1.,
	// 		0., 0., 1., 1.
	// 	]
	// })
	
	// var square = new Square({
	// 	gl: gl,
	// 	shaders: {
	// 		"shaderA": shaderA,
	// 		"pointShader": pointShader,
	// 		"singleColorShader": singleColorShader,
	// 		"perVertexColorShader": perVertexColorShader
	// 	},
	// 	start: [-0.5, 0.5],
	// 	width: 1.,
	// 	height: 1.,
	// 	pointSize: 10.,
	// 	color: [1., 1., 0., 1.],
	// 	colors: [
	// 		1, 0, 0, 1,
	// 		1, 1, 0, 1,
	// 		1, 1, 1, 0,
	// 		0, 1, 1, 1
	// 	]
	// })

	// var trapezoid = new Trapezoid({
	// 	gl: gl,
	// 	shaders: {
	// 		"shaderA": shaderA,
	// 		"pointShader": pointShader,
	// 		"singleColorShader": singleColorShader,
	// 		"perVertexColorShader": perVertexColorShader
	// 	},
	// 	pointSize: 10.,
	// 	color: [1., 0.5, 0., 1.],
	// 	colors: [
	// 		1, 0, 0, 1,
	// 		1, 1, 0, 1,
	// 		1, 1, 1, 0,
	// 		0, 1, 1, 1
	// 	]
	// })

	// var circle = new Circle({
	// 	gl: gl,
	// 	shaders: {
	// 		"shaderA": shaderA,
	// 		"pointShader": pointShader,
	// 		"singleColorShader": singleColorShader,
	// 		"perVertexColorShader": perVertexColorShader
	// 	},
	// 	radius: 0.5,
	// 	pointSize: 10.,
	// 	color: [0.7, .9, 1., 1.],
	// 	colors: [
	// 		1., 0., 0., 1.,
	// 		0., 1., 0., 1.
	// 	]
	// })

	// var segment = new Segment({ 
	// 	gl, 
	// 	shaders: {
	// 		"shaderA": shaderA,
	// 		"pointShader": pointShader,
	// 		"singleColorShader": singleColorShader,
	// 		"perVertexColorShader": perVertexColorShader
	// 	},
	// 	points: [
	// 		0.5, 0.7,
	// 		0.7, 0.7
	// 	], 
	// 	pointSize: 10., 
	// 	color: [ 0., 1., 0., 1. ], 
	// 	colors: [
	// 		0., 1., 1., 1.,
	// 		1., 0., 0., 1.
	// 	]
	// })

	// var point = new Point({ 
	// 	gl: gl,
	// 	shaders: {
	// 		"shaderA": shaderA,
	// 		"pointShader": pointShader,
	// 		"singleColorShader": singleColorShader,
	// 		"perVertexColorShader": perVertexColorShader
	// 	},
	// 	point: [.8, .8],
	// 	pointSize: 10.,
	// 	color: [1., 0., 1., 1.] 
	// })

	// triangle.setDrawingMode("per-vertex-color")
	// triangle.translate(-0.5, 0, 0);
	// triangle.scale(0.25, 0.25);
	// triangle.setUpdate(function () {
	// 	triangle.rotate(1);
	// })

	// square.setDrawingMode("single-color")
	// square.translate(0.25, 0, 0);
	// square.scale(1.25, 1.25);
	// square.setUpdate(function () {
	// 	square.rotate(-1);
	// })

	// trapezoid.translate(0.3, 0.2, 0)
	// trapezoid.scale(0.5, 0.5)
	// trapezoid.setUpdate(function () {
	// 	trapezoid.rotate(1);
	// })

	// circle.scale(0.2, 0.2)
	// circle.translate(-1, -0.5, 0)
	// circle.setDrawingMode('per-vertex-color')

	// point.scale(3)

	// segment.setDrawingMode("line")
	// segment.translate(-0.05, -0.5, 0)
	// segment.scale(2, 2)
	// segment.setUpdate(function () {
	// 	segment.rotate(1);
	// })
	
	// components.push(square)
	// components.push(trapezoid)
	// components.push(triangle)
	// components.push(point)
	// components.push(segment)
	// components.push(circle)

	let cube = new Cube({
		gl: gl,
		points: [
			1, 1, 1,
			-1, 1, 1,
			-1, -1, 1,
			1, -1, 1,
			1, -1, -1,
			1, 1, -1,
			-1, 1, -1,
			-1, -1, -1
		],
		indices: [
			0, 1, 2,
			0, 2, 3,
			4, 7, 5,
			7, 6, 5,
			7, 2, 1,
			7, 1, 6,
			6, 0, 5,
			6, 1, 0,
			5, 0, 4,
			0, 3, 4,
			3, 2, 7,
			4, 3, 7
		],
		colors: [
			1., 1., 1., 1., 	 // V0: r,g,b,a
			1., 0., 0., 1., // v1
			0., 1., 0., 1., // V2
			0., 0., 1., 1., // V2
			0., 1., 1., 1., // V2
			1., 0., 1., 1., // V2
			0., 1., 0., 1., // V2
			1., 1., 0., 1.
		],
		color: [1., 0., 0., 1.],
		pointSize: 10,
		shaders: {
			"pointShader": pointShader,
			"singleColorShader": singleColorShader,
			"perVertexColorShader": perVertexColorShader
		}
	});

	components.push(cube);

	return components
}

var mainApp
var gl

function mouseMoveEventListener(event) {
	console.log("Here!")
	let x = event.clientX;
	let y = event.clientY;
	let rect = event.target.getBoundingClientRect();
	let maxX = rect.right;
	let maxY = rect.bottom;
	x = x - rect.left;
	y = y - rect.top;
	var factor = 10.0 / canvas.height; // The rotation ratio
	mainApp.camera.center = [-(maxX / 2 - x) * factor, (maxY / 2 - y) * factor, 0.];
	mainApp.updateCamera();
	mainApp.run();

}

function initEventHandlers() {
	// canvas.addEventListener("mousedown", mouseDownEventListener, false)
	// canvas.addEventListener("mouseup", mouseUpEventListener, false)
	canvas.addEventListener("mousemove", mouseMoveEventListener, false)
}

var canvas

function main() {
	canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	mainApp = new GlApp({ canvas: "canvas", clearColor: [0., 0., 0., 1.], animate: false })
	if (!mainApp.gl) return
	gl = mainApp.gl
	var components = createComponents(mainApp.gl)
	// Adding a component can be done in one of the following ways:
	
	// For one component at a time
	// mainApp.addComponent(components[0])
	
	// For multiple components
	mainApp.addComponents(components)

	let camera = new Camera();
	camera.setPerspective()

	mainApp.addCamera(camera);

	mainApp.run()
	initEventHandlers();
}
