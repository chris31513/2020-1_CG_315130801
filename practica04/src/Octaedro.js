var CG = (function(CG) {
    class Octaedro{
        //Constructor de la figura, inicializa la misma con su color. gl es el contexto de Webgl en el canvas.
        constructor(gl, color, width, height, lenght, initial_transform ){
            this.gl = gl;
            var bufferC = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, bufferC);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color) , gl.STATIC_DRAW);
            this.colorVector = color;
            this.colorBuffer = bufferC;
            this.width = width;
            this.height = height;
            this.lenght = lenght;
            var ind = getIndex();
            var i = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, i);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ind) , gl.STATIC_DRAW);
            this.indicesBuffer = i;
            var vert = getVertices();
            var v = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, v);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vert) , gl.STATIC_DRAW);
            this.verticesBuffer = v;
            var norm = getNormal();
            var n = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, n);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(norm), gl.STATIC_DRAW);
            this.normals = n;
            this.initial_transform = initial_transform.toArray();

        }

        //Devuelve el buffer de color de la figura.
        getColorBuffer(){
            return this.colorBuffer;
        }

        //Devuelve el buffer de los vertices.
        getPositionBuffer(){
            return this.verticesBuffer;
        }

        //Devuelve el buffer de las caras.
        getIndexBuffer(){
            return this.indicesBuffer;
        }

        //Devuelve el buffer de las normales.
        getNormalBuffer(){
            return this.normals;
        }

        //Devuelve la transformación inicial.
        getModelTransform(){
            return this.initial_transform;
        }

        //Dibuja la figura en el contexto gl.
        draw(gl){
            initWebGL();
            gl.uniform3f(colorAtt, this.colorVector[0], this.colorVector[1], this.colorVector[2]);
        }
    }
    CG.Octaedro = Octaedro;
    return CG;
})(CG || {});