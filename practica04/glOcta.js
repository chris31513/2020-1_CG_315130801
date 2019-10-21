var gl = null;
var ctx = null;
var c_width;
var c_height;

var mMatrix;
var vMatrix;
var pMatrix;
var nMatrix;
var NormalMatrix;
var camera = [20.0,30.0,10.0];
var pi = 3.141592;
var zoom = 10;
var ygrados = 1.0;

/*
var auto = false;
var zgrados = 10;
var xgrados = 10;
*/


function getGLContext(){
    var canvas = document.getElementById("canvas_webgl");
    if(canvas == null)
    {
        alert("there is no canvas on this page");
        return;
    }
    var names = ["experimental-webgl","webgl","moz-webgl","webkit-3d"];

    for(var i = 0; i < names.length; i++)
    {
        try{
            ctx = canvas.getContext(names[i]);
        }catch(e){
            console(e);
        }
        if(ctx) break;
    }   
    
    if( ctx == null){
        alert("WebGL is not available");
    }else{
        console.log("Hooray! you got a WebGL context in a js file");
    }

    c_width = canvas.width;
    c_height = canvas.height;
    return ctx;
};


function clear(ctx){
    ctx.clear(ctx.COLOR_BUFFER_BIT| ctx.DEPTH_BUFFER_BIT);
    ctx.viewport(0,0,c_width,c_height);
};



function initWebGL(){
    gl = getGLContext();
    gl.clearColor(0,0.0,0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    
    initShaders();
    initGeometry();
    
    pMatrix = makePerspective(10, c_width/c_height, 1, 3000.0);
    vMatrix = makeLookAt(camera[0],camera[1],camera[2],
                         0.0,0.0,0.0,
                         0.0,1.0,0.0);
    
    setInterval(draw,30);
};

function idle(){
    if(ygrados < 360.0) {
        ygrados = ygrados + 0.19999;
    }else{
        ygrados = 0.0;
    }
}

function draw()
{
    gl.clear(gl.COLOR_BUFFER_BIT| gl.DEPTH_BUFFER_BIT);
    /* Definicion de matrices */
    
    loadIdentity();
    mRotateX(ygrados);
    //mRotateZ(ygrados);
    mRotateY(ygrados);
    var nMatrix = vMatrix.x(mMatrix);
    NormalMatrix = transpose(inverse(nMatrix.flatten()));
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(
            vertexPositionAttribute, 
            3, // cuantos hacen un elemento
            gl.FLOAT, //tipo de dato del arreglo
            false, // normalizados
            0, //stride - cuantos elementos habrá que avanzar antes del siguiente
            0 // offset - cuantos elementos habrá que avanzar para empezar el arreglo
            );
    gl.enableVertexAttribArray(vertexPositionAttribute);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(
            normalPositionAttribute, 
            3, // cuantos hacen un elemento
            gl.FLOAT, //tipo de dato del arreglo
            false, // normalizados
            0, //stride - cuantos elementos habrá que avanzar antes del siguiente
            0 // offset - cuantos elementos habrá que avanzar para empezar el arreglo
            );
    gl.enableVertexAttribArray(normalPositionAttribute);
    gl.useProgram(shaderProgram);


          
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    
    
    setMatrixUniforms(); 
    gl.drawElements(gl.TRIANGLES, 24, gl.UNSIGNED_SHORT, 0);
    
    idle();
};



/*Matrices Modelo*/

function loadIdentity() {
    mMatrix = Matrix.I(4);
};

function multMatrix(m) {
    mMatrix = mMatrix.x(m);
};

function mTranslate(v) {
    multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
};

function mRotateX(grados){
    multMatrix(Matrix.Rotation(pi*grados/180.0,$V([1,0,0])).ensure4x4());
};

function mRotateY(grados){
    multMatrix(Matrix.Rotation(pi*grados/180.0,$V([0,1,0])).ensure4x4());
}
function mRotateZ(grados)
{
    multMatrix(Matrix.Rotation(pi*grados/180.0,$V([0,0,1])).ensure4x4());
}

function multViewMatrix(m) {
  vMatrix = vMatrix.x(m);
};

function mTranslateViewMatrix(v) {
    multViewMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
};

function mRotateXViewMatrix(grados)
{
    multViewMatrix(Matrix.Rotation(pi*grados/180.0,$V([1,0,0])).ensure4x4());
};

function mRotateYViewMatrix(grados)
{
    multViewMatrix(Matrix.Rotation(pi*grados/180.0,$V([0,1,0])).ensure4x4());
}
function mRotateZViewMatrix(grados)
{
    multViewMatrix(Matrix.Rotation(pi*grados/180.0,$V([0,0,1])).ensure4x4());
};

function setMatrixUniforms() {
  var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
  gl.uniformMatrix4fv(pUniform, false, new Float32Array(pMatrix.flatten()));

  var mUniform = gl.getUniformLocation(shaderProgram, "uMMatrix");
  gl.uniformMatrix4fv(mUniform, false, new Float32Array(mMatrix.flatten()));
  
  var vUniform = gl.getUniformLocation(shaderProgram, "uVMatrix");
  gl.uniformMatrix4fv(vUniform, false, new Float32Array(vMatrix.flatten()));
  
  
  var nUniform = gl.getUniformLocation(shaderProgram, "uNormalMatrix");
  gl.uniformMatrix4fv(nUniform, false, new Float32Array(NormalMatrix));


  var cameraPos = gl.getUniformLocation(shaderProgram, "uCameraPos");
  gl.uniform3fv(cameraPos,new Float32Array(camera));
    
}

function transpose(m, dst) {
    dst = dst || new Float32Array(16);

    dst[ 0] = m[0];
    dst[ 1] = m[4];
    dst[ 2] = m[8];
    dst[ 3] = m[12];
    dst[ 4] = m[1];
    dst[ 5] = m[5];
    dst[ 6] = m[9];
    dst[ 7] = m[13];
    dst[ 8] = m[2];
    dst[ 9] = m[6];
    dst[10] = m[10];
    dst[11] = m[14];
    dst[12] = m[3];
    dst[13] = m[7];
    dst[14] = m[11];
    dst[15] = m[15];

    return dst;
  }
  
  function determinate(m) {
    var m00 = m[0 * 4 + 0];
    var m01 = m[0 * 4 + 1];
    var m02 = m[0 * 4 + 2];
    var m03 = m[0 * 4 + 3];
    var m10 = m[1 * 4 + 0];
    var m11 = m[1 * 4 + 1];
    var m12 = m[1 * 4 + 2];
    var m13 = m[1 * 4 + 3];
    var m20 = m[2 * 4 + 0];
    var m21 = m[2 * 4 + 1];
    var m22 = m[2 * 4 + 2];
    var m23 = m[2 * 4 + 3];
    var m30 = m[3 * 4 + 0];
    var m31 = m[3 * 4 + 1];
    var m32 = m[3 * 4 + 2];
    var m33 = m[3 * 4 + 3];
    var tmp_0  = m22 * m33;
    var tmp_1  = m32 * m23;
    var tmp_2  = m12 * m33;
    var tmp_3  = m32 * m13;
    var tmp_4  = m12 * m23;
    var tmp_5  = m22 * m13;
    var tmp_6  = m02 * m33;
    var tmp_7  = m32 * m03;
    var tmp_8  = m02 * m23;
    var tmp_9  = m22 * m03;
    var tmp_10 = m02 * m13;
    var tmp_11 = m12 * m03;
    var tmp_12 = m20 * m31;
    var tmp_13 = m30 * m21;
    var tmp_14 = m10 * m31;
    var tmp_15 = m30 * m11;
    var tmp_16 = m10 * m21;
    var tmp_17 = m20 * m11;
    var tmp_18 = m00 * m31;
    var tmp_19 = m30 * m01;
    var tmp_20 = m00 * m21;
    var tmp_21 = m20 * m01;
    var tmp_22 = m00 * m11;
    var tmp_23 = m10 * m01;

    var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
        (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
    var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
        (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
    var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
        (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
    var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
        (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

    return 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
  }

  /**
   * Computes the inverse of a matrix.
   * @param {Matrix4} m matrix to compute inverse of
   * @param {Matrix4} [dst] optional matrix to store result
   * @return {Matrix4} dst or a new matrix if none provided
   * @memberOf module:webgl-3d-math
   */
  function inverse(m, dst) {
    dst = dst || new Float32Array(16);
    var m00 = m[0 * 4 + 0];
    var m01 = m[0 * 4 + 1];
    var m02 = m[0 * 4 + 2];
    var m03 = m[0 * 4 + 3];
    var m10 = m[1 * 4 + 0];
    var m11 = m[1 * 4 + 1];
    var m12 = m[1 * 4 + 2];
    var m13 = m[1 * 4 + 3];
    var m20 = m[2 * 4 + 0];
    var m21 = m[2 * 4 + 1];
    var m22 = m[2 * 4 + 2];
    var m23 = m[2 * 4 + 3];
    var m30 = m[3 * 4 + 0];
    var m31 = m[3 * 4 + 1];
    var m32 = m[3 * 4 + 2];
    var m33 = m[3 * 4 + 3];
    var tmp_0  = m22 * m33;
    var tmp_1  = m32 * m23;
    var tmp_2  = m12 * m33;
    var tmp_3  = m32 * m13;
    var tmp_4  = m12 * m23;
    var tmp_5  = m22 * m13;
    var tmp_6  = m02 * m33;
    var tmp_7  = m32 * m03;
    var tmp_8  = m02 * m23;
    var tmp_9  = m22 * m03;
    var tmp_10 = m02 * m13;
    var tmp_11 = m12 * m03;
    var tmp_12 = m20 * m31;
    var tmp_13 = m30 * m21;
    var tmp_14 = m10 * m31;
    var tmp_15 = m30 * m11;
    var tmp_16 = m10 * m21;
    var tmp_17 = m20 * m11;
    var tmp_18 = m00 * m31;
    var tmp_19 = m30 * m01;
    var tmp_20 = m00 * m21;
    var tmp_21 = m20 * m01;
    var tmp_22 = m00 * m11;
    var tmp_23 = m10 * m01;

    var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
        (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
    var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
        (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
    var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
        (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
    var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
        (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

    var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

    dst[0] = d * t0;
    dst[1] = d * t1;
    dst[2] = d * t2;
    dst[3] = d * t3;
    dst[4] = d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
          (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
    dst[5] = d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
          (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
    dst[6] = d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
          (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
    dst[7] = d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
          (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
    dst[8] = d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
          (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
    dst[9] = d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
          (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
    dst[10] = d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
          (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
    dst[11] = d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
          (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
    dst[12] = d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
          (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
    dst[13] = d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
          (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
    dst[14] = d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
          (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
    dst[15] = d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
          (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));

    return dst;
  }

