var vertexBuffer;
var normalBuffer;
var indexBuffer;
var t = ( 1 + Math.sqrt( 5 ) ) / 2;
var r = 1 / t;

var vertex = [- 1, - 1, - 1,    - 1, - 1, 1,
        - 1, 1, - 1, - 1, 1, 1,
        1, - 1, - 1, 1, - 1, 1,
        1, 1, - 1, 1, 1, 1,

        // (0, ±1/φ, ±φ)
         0, - r, - t, 0, - r, t,
         0, r, - t, 0, r, t,

        // (±1/φ, ±φ, 0)
        - r, - t, 0, - r, t, 0,
         r, - t, 0, r, t, 0,

        // (±φ, 0, ±1/φ)
        - t, 0, - r, t, 0, - r,
        - t, 0, r, t, 0, r];

var normals = [];

var index = [3, 11, 7,  3, 7, 15,   3, 15, 13,
        7, 19, 17,  7, 17, 6,   7, 6, 15,
        17, 4, 8,   17, 8, 10,  17, 10, 6,
        8, 0, 16,   8, 16, 2,   8, 2, 10,
        0, 12, 1,   0, 1, 18,   0, 18, 16,
        6, 10, 2,   6, 2, 13,   6, 13, 15,
        2, 16, 18,  2, 18, 3,   2, 3, 13,
        18, 1, 9,   18, 9, 11,  18, 11, 3,
        4, 14, 12,  4, 12, 0,   4, 0, 8,
        11, 9, 5,   11, 5, 19,  11, 19, 7,
        19, 5, 14,  19, 14, 4,  19, 4, 17,
        1, 12, 14,  1, 14, 5,   1, 5, 9];

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