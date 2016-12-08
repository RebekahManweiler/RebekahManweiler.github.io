window.onload = function(){
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, .1, 500);
	var renderer = new THREE.WebGLRenderer();
	
	//set background color
	renderer.setClearColor(0x000000);
	renderer.setSize(window.innerWidth, window.innerHeight);//values of window size
	
	var axis = new THREE.AxisHelper(10);//length of legs on axis
	scene.add(axis);
	
	var cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
	var cubeMaterial = new THREE.MeshBasicMaterial({color: 0xdddddd, wireframe:true});
	var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	
	cube.position.x = 0;
	cube.position.y = 0;
	cube.position.z = 0;
	
	scene.add(cube);
	
	camera.position.x = 40;
	camera.position.y = 40;
	camera.position.z = 40;
	
	camera.lookAt(scene.position);
	
	$("#webGL-container").append(renderer.domElement);
	renderer.render(scene, camera);
}