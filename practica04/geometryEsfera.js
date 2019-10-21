var vertexBuffer;
var normalBuffer;
var indexBuffer;
var vertex = [];
vertex.push(0);
vertex.push(1);
vertex.push(0);
for (let i=1; i<32; i++) {
    phi = (i*Math.PI)/32;

    for (let j=0; j<32; j++) {
      theta = (j*2*Math.PI)/32;

      x = 1 * Math.sin(phi) * Math.cos(theta);
      y = 1 * Math.cos(phi);
      z = 1 * Math.sin(phi) * Math.sin(theta);

      vertex.push(x);
      vertex.push(y);
      vertex.push(z);
    }
}
vertex.push(0);
vertex.push(-1);
vertex.push(0);

var normals = [];

var index = [];
for (let i=0; i<32; i++) {
    index.push(0);
    index.push(((i+1)%32)+1);
    index.push((i%32)+1);
}
for (let i=1; i<32-1; i++) {
    for (let j=0; j<32; j++) {
        index.push(j+1 +(i-1)*32);
        index.push((j+1)%32 +1 +(i-1)*32);
        index.push((j+1)%32 +1 +i*32);
        index.push(j+1 +i*32);
    }
}
for (i=0; i<32; i++) {
    index.push(vertex.length-1);
    index.push(vertex.length-1-32 +i);
    index.push(vertex.length-1-32 +((i+1)%32));
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