var vertexBuffer;
var normalBuffer;
var indexBuffer;
var vertex = [];

for (let i=0; i<8+1; i++) {
    for (let j=0; j<16; j++) {
        vertex.push(1 * Math.cos(j*2*Math.PI/16));
        vertex.push(-1 + i*2*1/8);
        vertex.push(1 * Math.sin(j*2*Math.PI/16));
    }
}


var normals = [];

var index = [];

for (let i=0; i<8-1; i++) {
    for (let j=0; j<16; j++) {
        index.push(j +i*16);
        index.push((j+1)%16 +i*16);
        index.push((j+1)%16 +(i+1)*16);
        index.push(j +(i+1)*16);
    }
}

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