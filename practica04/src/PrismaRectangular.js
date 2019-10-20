var CG = (function(CG) {
    class PrismaRectangular {
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

        getColorBuffer(){
            return this.colorBuffer;
        }

        getPositionBuffer(){
            return this.verticesBuffer;
        }

        getIndexBuffer(){
            return this.indicesBuffer;
        }

        getNormalBuffer(){
            return this.normals;
        }

        getModelTransform(){
            return this.initial_transform;
        }

        draw(gl){
            initWebGL();
            gl.uniform3f(colorAtt, this.colorVector[0], this.colorVector[1], this.colorVector[2]);
        }
    }
    CG.PrismaRectangular = PrismaRectangular;
    return CG;
})(CG || {});