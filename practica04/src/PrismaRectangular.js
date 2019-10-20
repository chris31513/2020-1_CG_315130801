var CG = (function(CG) {
    class PrismaRectangular {
        constructor(gl, color, width, height, lenght, initial_transform ){
            this.gl = gl;
            var bufferC = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, bufferC);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color) , gl.STATIC_DRAW);
            this.colorBuffer = bufferC;
            this.width = width;
            this.height = height;
            this.lenght = lenght;
            this.indices = getIndex();
            this.initial_transform = initial_transform.toArray();

        }

        getColorBuffer(){
            return this.colorBuffer;
        }

        getPositionBuffer(){
            return this.vertices;
        }

        getIndexBuffer(){
            return this.indices;
        }

        getNormalBuffer(){
            return this.normals;
        }

        getModelTransform(){
            return this.initial_transform;
        }

        draw(gl){
            initWebGL(gl);
        }
    }
    CG.PrismaRectangular = PrismaRectangular;
    return CG;
})(CG || {});