var CG = (function(CG) {
    class Matrix4 {
        /**
         * Crea una matriz de 4x4
         * @param {Number} a00 
         * @param {Number} a01 
         * @param {Number} a02 
         * @param {Number} a03 
         * @param {Number} a10 
         * @param {Number} a11 
         * @param {Number} a12 
         * @param {Number} a13 
         * @param {Number} a20 
         * @param {Number} a21 
         * @param {Number} a22 
         * @param {Number} a23 
         * @param {Number} a30 
         * @param {Number} a31 
         * @param {Number} a32 
         * @param {Number} a33 
         */
        constructor(a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33) {
            this.set(a00, a01, a02, a03,
                     a10, a11, a12, a13,
                     a20, a21, a22, a23,
                     a30, a31, a32, a33);
        }

        /**
         * Regresa la suma de dos matrices de 4x4
         * @param {Matrix4} m1 
         * @param {Matrix4} m2 
         */
        static add(m1, m2) {
			return new Matrix4(
                m1.a00 + m2.a00, m1.a01 + m2.a01, m1.a02 + m2.a02, m1.a03 + m2.a03,
                m1.a10 + m2.a10, m1.a11 + m2.a11, m1.a12 + m2.a12, m1.a13 + m2.a13,
                m1.a20 + m2.a20, m1.a21 + m2.a21, m1.a22 + m2.a22, m1.a23 + m2.a23,
                m1.a30 + m2.a30, m1.a31 + m2.a31, m1.a32 + m2.a32, m1.a33 + m2.a33
            );
        }

        /**
         * Devuelve el elemento adjunto (i,j) de la matriz que lo invocó.
         * @param {Number} i 
         * @param {Number} j 
         * @returns {Number}
         */
        adj(i,j) {
            const minor = [];
            for(let r = 0; r < 4; r++) {
                for(let c = 0; c < 4; c++) {
                    if (r == i || c == j) continue;
                    minor.push(this[`a${r}${c}`]);
                }
            }
            return (-1)**(i*j)*det3(...minor);
        }

        /**
         * Devuelve la matriz adjunta, de la matriz con que se invoca la función.
         * @returns {Matrix4}
         */
        adjoint() {
            const adjunta = [];
            for(let r = 0; r < 4; r++) {
                for(let c = 0; c < 4; c++) {
                    adjunta.push[this.adj(c,r)];
                }
            }
            return new Matrix4(...adjunta).transpose();
        }

        /**
         * Regresa una matriz idéntica a la que la invocó.
         */
        clone() {
			return new Matrix4(
                this.a00, this.a01, this.a02, this.a03,
                this.a10, this.a11, this.a12, this.a13,
                this.a20, this.a21, this.a22, this.a23,
                this.a30, this.a31, this.a32, this.a33
            );
        }

        /**
         * Devuelve el determinante de la matriz.
         */
        determinant() {
            return (
                 this.a00*this.adj(0, 0)
                +this.a01*this.adj(0, 1)
                +this.a02*this.adj(0, 2)
                +this.a03*this.adj(0, 3)
            );
        }

        /**
         * Devuelve verdadero en caso de que sus argumentos sean aproximadamente iguales, bajo una ε=, y
         * falso en caso contrario.
         * @param {Matrix4} m1 
         * @param {Matrix4} m2 
         */
        static equals(m1, m2) {
            var e = 0.000001;
            var eq = (a,b) => Math.abs(x-y) < e;
            return eq(m1.a00,m2.a00) && eq(m1.a01,m2.a01) && eq(m1.a02,m2.a02) && eq(m1.a03,m2.a03) &&
				   eq(m1.a10,m2.a10) && eq(m1.a11,m2.a11) && eq(m1.a12,m2.a12) && eq(m1.a13,m2.a13) &&
				   eq(m1.a20,m2.a20) && eq(m1.a21,m2.a21) && eq(m1.a22,m2.a22) && eq(m1.a23,m2.a23) &&
				   eq(m1.a30,m2.a30) && eq(m1.a31,m2.a31) && eq(m1.a32,m2.a32) && eq(m1.a33,m2.a33);
        }

        /**
         * Devuelve verdadero en caso de que sus argumentos sean exactamente iguales, y falso en caso contrario.
         * @param {Matrix4} m1 
         * @param {Matrix4} m2 
         */
        static exactEquals(m1, m2) {
			return m1.a00 === m2.a00 && m1.a01 === m2.a01 && m1.a02 === m2.a02 && m1.a03 === m2.a03 && 
				   m1.a10 === m2.a10 && m1.a11 === m2.a11 && m1.a12 === m2.a12 && m1.a13 === m2.a13 &&
				   m1.a20 === m2.a20 && m1.a21 === m2.a21 && m1.a22 === m2.a22 && m1.a23 === m2.a23 &&
				   m1.a30 === m2.a30 && m1.a31 === m2.a31 && m1.a32 === m2.a32 && m1.a33 === m2.a33;
        }

        /**
         * Asigna los valores de la matriz identidad a la matriz desde donde se invocó la función.
         */
        identity() {
            this.a00 = 1; this.a01 = 0; this.a02 = 0; this.a03 = 0;
            this.a10 = 0; this.a11 = 1; this.a12 = 0; this.a13 = 0;
            this.a20 = 0; this.a21 = 0; this.a22 = 1; this.a23 = 0;
            this.a30 = 0; this.a31 = 0; this.a32 = 0; this.a33 = 1;
        }

        /**
         * Devuelve la matriz inversa de la matriz con la que se invocó la función.
         */
        invert() {
            return Matrix4.multiplyScalar(this.adjoint(), 1/this.determinant());
        }

        /**
         * Devuelve la multiplicación de dos matrices.
         * @param {Matrix4} m1 
         * @param {Matrix4} m2 
         */
        static multiply(m1, m2) {
            var m4 = new Matrix4((m1.a00 * m2.a00 + m1.a01 * m2.a10 + m1.a02 * m2.a20 + m1.a03 * m2.a30),
                         (m1.a00 * m2.a01 + m1.a01 * m2.a11 + m1.a02 * m2.a21 + m1.a03 * m2.a31),
                         (m1.a00 * m2.a02 + m1.a01 * m2.a12 + m1.a02 * m2.a22 + m1.a03 * m2.a32),
                         (m1.a00 * m2.a03 + m1.a01 * m2.a13 + m1.a02 * m2.a23 + m1.a03 * m2.a33),
                         (m1.a10 * m2.a00 + m1.a11 * m2.a10 + m1.a12 * m2.a20 + m1.a13 * m2.a30),
                         (m1.a10 * m2.a01 + m1.a11 * m2.a11 + m1.a12 * m2.a21 + m1.a13 * m2.a31),
                         (m1.a10 * m2.a02 + m1.a11 * m2.a12 + m1.a12 * m2.a22 + m1.a13 * m2.a32),
                         (m1.a10 * m2.a03 + m1.a11 * m2.a13 + m1.a12 * m2.a23 + m1.a13 * m2.a33),
                         (m1.a20 * m2.a00 + m1.a21 * m2.a10 + m1.a22 * m2.a20 + m1.a23 * m2.a30),
                         (m1.a20 * m2.a01 + m1.a21 * m2.a11 + m1.a22 * m2.a21 + m1.a23 * m2.a31),
                         (m1.a20 * m2.a02 + m1.a21 * m2.a12 + m1.a22 * m2.a22 + m1.a23 * m2.a32),
                         (m1.a20 * m2.a03 + m1.a21 * m2.a13 + m1.a22 * m2.a23 + m1.a23 * m2.a33),
                         (m1.a30 * m2.a00 + m1.a31 * m2.a10 + m1.a32 * m2.a20 + m1.a33 * m2.a30),
                         (m1.a30 * m2.a01 + m1.a31 * m2.a11 + m1.a32 * m2.a21 + m1.a33 * m2.a31),
                         (m1.a30 * m2.a02 + m1.a31 * m2.a12 + m1.a32 * m2.a22 + m1.a33 * m2.a32),
                         (m1.a30 * m2.a03 + m1.a31 * m2.a13 + m1.a32 * m2.a23 + m1.a33 * m2.a33));
            return m4;
        }

        /**
         * Devuelve una matriz que es el resultado de multiplicar cada componente por un escalar.
         * @param {Matrix4} m1 
         * @param {Number} c 
         */
        static multiplyScalar(m1, c) {
            const elems = [];
            for(let i = 0; i < 4; i++) {
                for(let j = 0; j < 4; j++) {
                    elems.push(c*m1[`a${i}${j}`]);
                }
            }
			return new Matrix4(...elems);
        }

        /**
         * Asigna nuevos valores a los componentes de la matriz con que se llama.
         * @param {Number} a00 
         * @param {Number} a01 
         * @param {Number} a02 
         * @param {Number} a03 
         * @param {Number} a10 
         * @param {Number} a11 
         * @param {Number} a12 
         * @param {Number} a13 
         * @param {Number} a20 
         * @param {Number} a21 
         * @param {Number} a22 
         * @param {Number} a23 
         * @param {Number} a30 
         * @param {Number} a31 
         * @param {Number} a32 
         * @param {Number} a33 
         */
        set(a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33) {
            this.a00 = a00 || 1; this.a01 = a01 || 0; this.a02 = a02 || 0; this.a03 = a03 || 0;
            this.a10 = a10 || 0; this.a11 = a11 || 1; this.a12 = a12 || 0; this.a13 = a13 || 0;
            this.a20 = a20 || 0; this.a21 = a21 || 0; this.a22 = a22 || 1; this.a23 = a23 || 0;
            this.a30 = a30 || 0; this.a31 = a31 || 0; this.a32 = a32 || 0; this.a33 = a33 || 1;
        }

        /**
         * Sustrae la matriz m2 de la matriz m1.
         * @param {Matrix4} m1 
         * @param {Matrix4} m2 
         */
        static substract(m1, m2) {
			m2 = this.multiplyScalar(m2, -1);
			return this.add(m1, m2);
        }

        /**
         * Devuelve la matriz transpuesta de la matriz desde donde se invocó la función.
         * @returns {Matrix4}
         */
        transpose() {
            const elems = [];
            for(let c = 0; c < 4; c++) {
                for(let r = 0; r < 4; r++) {
                    elems.push(this[`a${r}${c}`]);
                }
            }
            return new Matrix4(...elems);
        }

        /**
        * devuelve la matrix que representa la piramide de proyección.
        * @param {int} left
        * @param {int} right
        * @param {int} bottom
        * @param {int} top
        * @param {int} near
        * @param {int} far
        * @return {Matrix4}
        */
        static frustum(left, right, bottom, top, near, far){
            return new Matrix4((2 * near) / (right - left), 0, (right + left) / (right - left), 0,
                               0, (2 * near) / (top - bottom), (top + bottom) / (top - bottom), 0,
                               0, 0, -(far + near) / (far - near), (-2 * far * near) / (far - near),
                               0, 0, -1, 0);
        }


        /**
        * devuelve la matriz de la cámara.
        * @param {Vector3} eye
        * @param {Vector3} center
        * @param {Vector3} up
        * @return {Matrix4}
        */
        static lookAt(cameraPos, coi, up){
            let w = CG.Vector3.sub(cameraPos, coi).normalize();
            let u = CG.Vector3.cross(up, w).normalize();
            let v = CG.Vector3.cross(w, u).normalize();

            return new Matrix4(u.x, v.x, w.x, 0, u.y, v.y, w.y, 0, u.z, v.z, w.z, 0, -(u.x * cameraPos.x + u.y * cameraPos.y + u.z * cameraPos.z), -(v.x * cameraPos.x + v.y * cameraPos.y + v.z * cameraPos.z), -(w.x * cameraPos.x + w.y * cameraPos.y + w.z * cameraPos.z), 1);
        }

        /**
        * devuelve la multiplicación de un vector por la matriz que lo llama.
        * @param {Vector4} v
        * @return {Matrix4}
        */
        multiplyVector(v){
            return new CG.Vector4((v.x * this.a00) + (v.y * this.a10) + (v.z * this.a20) + (v.w * this.a30), 
                               (v.x * this.a01) + (v.y * this.a11) + (v.z * this.a21) + (v.w * this.a31),
                               (v.x * this.a02) + (v.y * this.a12) + (v.z * this.a22) + (v.w * this.a32),
                               (v.x * this.a03) + (v.y * this.a13) + (v.z * this.a23) + (v.w * this.a33));
        }

        multiplyVector3(v){
            var w = -(this.a03*v.x + this.a13*v.y + this.a23*v.z + this.a33*1);
            return new CG.Vector3(((v.x * this.a00) + (v.y * this.a10) + (v.z * this.a20) + (1 * this.a30))/w,
                               ((v.x * this.a01) + (v.y * this.a11) + (v.z * this.a21) + (1 * this.a31))/w,
                               ((v.x * this.a02) + (v.y * this.a12) + (v.z * this.a22) + (1 * this.a32))/w);
        }

        /**
        * devuelve la proyección ortogonal.
        * @param {int} left
        * @param {int} right
        * @param {int} bottom
        * @param {int} top
        * @param {int} near
        * @param {int} far
        * @return {Matrix4}
        */
        static ortho(left, right, bottom, top, near, far){
            return new Matrix4(2 / (right - left), 0, 0, -1*((right + left) / (right - left)),
                               0, 2 / (top - bottom), 0, -1*((top + bottom) / (top - bottom)),
                               0, 0, -2/(far - near), -1*((far + near) / (far - near)),
                               0, 0, 0, 1);
        }

        /**
        * devuelve la matriz de perspectiva en 3D.
        * @param {int} fovy
        * @param {int} aspect
        * @param {int} near
        * @param {int} far
        * @return {Matrix4}
        */
        static perspective(fovy, aspect, near, far){
            var ftan = 1 / Math.tan(fovy/2);
            return new Matrix4(ftan/aspect, 0, 0, 0, 0, ftan, 0, 0, 0, 0, (near + far)/(near - far), -1, 0, 0, (2*far*near)/(near - far), 0);
        }

        /**
        * devuelve la matriz de rotación respecto al eje X.
        * @param {int} rad.
        * @return {Matrix4}
        */
        static rotateX(rad){
            return new Matrix4(1, 0, 0, 0,
                               0, Math.cos(rad), -1*Math.sin(rad), 0,
                               0, Math.sin(rad), Math.cos(rad), 0,
                               0, 0, 0, 1);
        }

        /**
        * devuelve la matriz de rotación respecto al eje Y.
        * @param {int} rad.
        * @return {Matrix4}
        */
        static rotateY(rad){
            return new Matrix4(Math.cos(rad), 0, Math.sin(rad), 0,
                               0, 1, 0, 0,
                               -1*Math.sin(rad), 0, Math.cos(rad), 0,
                               0, 0, 0, 1);
        }

        /**
        * devuelve la matriz de rotación respecto al eje Z.
        * @param {int} rad.
        * @return {Matrix4}
        */
        static rotateZ(rad){
            return new Matrix4(Math.cos(rad), -1*Math.sin(rad), 0, 0,
                               Math.sin(rad), Math.cos(rad), 0, 0,
                               0, 0, 1, 0,
                               0, 0, 0, 1);
        }

        /**
        * devuelve la matriz de escalamiento en 3D.
        * @param {Vector3} v
        * @return {Matrix4}
        */
        static scale(v){
            return new Matrix4(v.x, 0, 0, 0,
                               0, v.y, 0, 0,
                               0, 0, v.z, 0,
                               0, 0, 0, 1);
        }
         /**
         * devuelve la matriz de traslacion en 3D.
         * @param {Vector3} v
         * @return {Matrix4}
         */
        static translate(v){
            return new Matrix4(1, 0, 0, v.x,
                               0, 1, 0, v.y,
                               0, 0, 1, v.z,
                               0, 0, 0, 1);
        }

        toArray(){
            return [this.a00, this.a01, this.a02, this.a03,
                    this.a10, this.a11, this.a12, this.a13,
                    this.a20, this.a21, this.a22, this.a23,
                    this.a30, this.a31, this.a32, this.a33];
        }
    }

    CG.Matrix4 = Matrix4;
    return CG;
}(CG || {}));

/**
 * Función auxiliar
 * Devuelve la determinante de una matriz de 2x2 dados sus elementos
 * @param {Number} a11 
 * @param {Number} a12 
 * @param {Number} a21 
 * @param {Number} a22 
 */
function det2(a11, a12, a21, a22) {
    return (a11*a22-a12*a21);
}

/**
 * Función auxiliar
 * Devuelve la determinante de una matriz de 3x3 dados sus elementos
 * @param {Number} a11 
 * @param {Number} a12 
 * @param {Number} a13 
 * @param {Number} a21 
 * @param {Number} a22 
 * @param {Number} a23 
 * @param {Number} a31 
 * @param {Number} a32 
 * @param {Number} a33 
 */
function det3(a11, a12, a13, a21, a22, a23, a31, a32, a33) {
    return (
         a11*det2(a22, a23, a32, a33)
        -a12*det2(a21, a23, a31, a33)
        +a13*det2(a21, a22, a31, a32)
    );
}