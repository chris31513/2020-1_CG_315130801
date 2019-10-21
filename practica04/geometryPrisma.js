var vertexBuffer;
var normalBuffer;
var indexBuffer;

var vertex = [ 0.5,  0.5, 0.5,
     		   0.5,  0.5,-0.5,
    		  -0.5,  0.5,-0.5,
     		  -0.5,  0.5, 0.5,
     		   0.5, -0.5, 0.5,
     		   0.5, -0.5,-0.5,
    		  -0.5, -0.5,-0.5,
     		  -0.5, -0.5, 0.5];

var normals = [];

var index = [1,3,0,
			 1,2,3,
			 7,6,5,
			 7,5,4,
			 3,2,7,
			 2,6,7,
			 0,4,1,
			 4,5,1,
			 3,7,0,
			 0,7,4,
			 6,2,1,
			 5,6,1];

function getNormals(){
	var i;
	
	for(i = 0; i < vertex.length; i= i+3){
		var length = Math.sqrt(vertex[i]*vertex[i] + vertex[i+1]*vertex[i+1] + vertex[i+2]*vertex[i+2]);
		normals.push(vertex[i]  / length);
		normals.push(vertex[i+1]/ length);
		normals.push(vertex[i+2]/ length);
	}
}

function initGeometry(name,json){
	getNormals();
    vertexBuffer = gl.createBuffer();
    if(!vertexBuffer){
   	 alert("No se pudo crear el buffer");
	 console.log("Fail creating a vertex buffer");
	 return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertex) , gl.STATIC_DRAW);
	
	normalBuffer = gl.createBuffer();
    if(!normalBuffer)
    {
   	 alert("No se pudo crear el buffer");
	 console.log("Fail creating a normal buffer");
	 return -1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals) , gl.STATIC_DRAW);
	
   
	indexBuffer = gl.createBuffer();
    if(!indexBuffer)
    {
    	alert("Algo pasó INDEX buffer");
		console.log("Fail creating a index buffer");
		return -1;
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(index), gl.STATIC_DRAW);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    
    return 0;

}

function activateBuffers(){
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexPositionAttribute);
       
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.vertexAttribPointer(normalPositionAttribute, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(normalPositionAttribute);
        
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

}

function getVertices(){
    return vertex;
}

function getIndex(){
    return index;
}

function getNormal() {
    return normals;
}