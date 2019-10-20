var shaderProgram; // id_programa
var vertexPositionAttribute; // vertices
var normalPositionAttribute; // normales
var colorAtt;

function initShaders(){
	var fragmentShader = getShader("shader-fs");
	var vertexShader = getShader("shader-vs");
	
	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	
	gl.linkProgram(shaderProgram);
	
	if(!gl.getProgramParameter(shaderProgram,gl.LINK_STATUS))
	{
		alert("No se puede habilitar el shader");
    	console.log("No se puede habilitar el shader");
	}
	gl.useProgram(shaderProgram);

	vertexPositionAttribute = gl.getAttribLocation(shaderProgram,"aVertexPosition");
	gl.enableVertexAttribArray(vertexPositionAttribute);
	normalPositionAttribute = gl.getAttribLocation(shaderProgram,"aNormalPosition");
	gl.enableVertexAttribArray(normalPositionAttribute);
	colorAtt = gl.getUniformLocation(shaderProgram, "baseColor");
}

function getShader(id){	
	var shaderScript = document.getElementById(id);
	
	if(!shaderScript){
		alert(id + " null" );
		return null;
	}
		
	var theSource = "";
	
	var currentChild = shaderScript.firstChild;
	
	while(currentChild) 
	{
		if(currentChild.nodeType == currentChild.TEXT_NODE){
			theSource = theSource + currentChild.textContent;
		
		}
			
		currentChild = currentChild.nextSibling;
	}

	var shader;
	if(shaderScript.type == "x-shader/x-fragment")
	{
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	}else if(shaderScript.type == "x-shader/x-vertex")
	{
		shader = gl.createShader(gl.VERTEX_SHADER);
	}else
	{
		return null;
	}
	
	gl.shaderSource(shader,theSource);
	gl.compileShader(shader);
	
	if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS))
	{
		alert("Error mientras se carga el shader: " + gl.getShaderInfoLog(shader) + "  " + shaderScript.type);
		return null;
	}
	return shader;
}