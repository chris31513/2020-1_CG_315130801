var CG = (function(CG) {
    class Matrix3 {
        /**
         * Recibe 9 parámetros numéricos y construye una matriz de 3x3.
         * En caso de no recibir valores en los argumentos, devuelve la matriz identidad.
         * @param {Number} a00
         * @param {Number} a01
         * @param {Number} a02
         * @param {Number} a10
         * @param {Number} a11
         * @param {Number} a12
         * @param {Number} a20
         * @param {Number} a21
         * @param {Number} a22
         */
        constructor(a00, a01, a02, a10, a11, a12, a20, a21, a22) {
            this.set(a00, a01, a02, a10, a11, a12, a20, a21, a22);
        }

        /**
         * devuelve la suma dos matrices.
         * @param {Matrix3} m1
         * @param {Matrix3} m2
         * @return {Matrix3}
         */
        static add(m1, m2) {
            const elems = [];
            for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    elems.push(m1[`a${i}${j}`] + m2[`a${i}${j}`]);
                }
            }
            return new Matrix3(...elems);
        }

        /**
         * Regresa el elemento ajdunto (i, j) de la matriz que lo invoca.
         * @param {Number} i
         * @param {Number} j
         */
        adj(i, j) {
            const minor = [];
            for(let r = 0; r < 3; r++) {
                for(let c = 0; c < 3; c++) {
                    if (r == i || c == j) continue;
                    minor.push(this[`a${r}${c}`]);
                }
            }
            return (-1)**(i*j)*det2(...minor);
        }

        /**
         * devuelve la matriz adjunta (o matriz de cofactores), de la matriz con
         * que se invoca la función.
         * @return {Matrix3}
         */
        adjoint() {
            const adjunta = [];
            for(let r = 0; r < 3; r++) {
                for(let c = 0; c < 3; c++) {
                    adjunta.push[this.adj(c,r)];
                }
            }
            return new Matrix3(...adjunta).transpose();
        }

        /**
         * devuelve un objeto el cual contiene los mismos valores que el objeto
         * desde el cual se invoco la función.
         * @return {Matrix3}
         */
        clone() {
            const elems = [];
            for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    elems.push(this[`a${i}${j}`]);
                }
            }
            return new Matrix3(...elems);
        }

        /**
         * devuelve el determinante de la matriz.
         * @return {Number}
         */
        determinant() {
            return (
                 this.a00*this.adj(0,0)
                +this.a01*this.adj(0,1)
                +this.a02*this.adj(0,2)
            );
        }

        /**
         * devuelve verdadero en caso de que sus argumentos sean aproximadamente
         * iguales, bajo una ε = 0.000001, y falso en caso contrario.
         * @param {Matrix3} m1
         * @param {Matrix3} m2
         * @return {Boolean}
         */
        static equals(m1, m2) {
            const e = 0.000001;
            const eq = (a, b) => Math.abs(a-b) < e;
            let flag = true;
            for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    flag = flag && eq(m1[`a${i}${j}`], m2[`a${i}${j}`]);
                }
            }
            return flag;
        }

        /**
         * devuelve verdadero en caso de que sus argumentos sean exactamente
         * iguales, y falso en caso contrario.
         * @param {Matrix3} m1
         * @param {Matrix3} m2
         * @return {Boolean}
         */
        static exactEquals(m1, m2) {
            let flag = true;
            for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    flag = flag && (m1[`a${i}${j}`] === m2[`a${i}${j}`]);
                }
            }
            return flag;
        }

        /**
         * asigna los valores de la matriz identidad a la matriz desde donde se
         * invoco la función.
         */
        identity() {
            this.set();
        }

        /**
         * devuelve la matriz inversa de la matriz con la que se invoco la función.
         * @return {Matrix3}
         */
        invert() {
            return Matrix3.multiplyScalar(this.adjoint(), 1/this.determinant());
        }

        /**
         * devuelve la multiplicación de dos matrices.
         * @param {Matrix3} m1
         * @param {Matrix3} m2
         * @return {Matrix3}
         */
        static multiply(m1, m2) {
            const elems = [];
            for(let r = 0; r < 3; r++) {
                for(let c = 0; c < 3; c++) {
                    let sum = 0;
                    for(let i = 0; i < 3; i++) {
                        sum += m1[`a${r}${i}`]*m2[`a${i}${c}`]
                    }
                    elems.push(sum);
                }
            }
            return new Matrix3(...elems);
        }

        /**
         * devuelve una matriz que es el resultado de multiplicar cada
         * componente por un escalar.
         * @param {Matrix3} m1
         * @param {Number} c
         * @return {Matrix3}
         */
        static multiplyScalar(m1, c) {
            const elems = [];
            for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    elems.push(m1[`a${i}${j}`]*c);
                }
            }
            return new Matrix3(...elems);
        }

        /**
         * asigna nuevos valores a los componentes de la matriz con que se llama.
         * @param {Number} a00
         * @param {Number} a01
         * @param {Number} a02
         * @param {Number} a10
         * @param {Number} a11
         * @param {Number} a12
         * @param {Number} a20
         * @param {Number} a21
         * @param {Number} a22
         */
        set(a00, a01, a02, a10, a11, a12, a20, a21, a22) {
            this.a00 = a00 || 1;
            this.a01 = a01 || 0;
            this.a02 = a02 || 0;
            this.a00 = a10 || 0;
            this.a01 = a11 || 1;
            this.a02 = a12 || 0;
            this.a00 = a20 || 0;
            this.a01 = a21 || 0;
            this.a02 = a22 || 1;
        }

        /**
         * sustrae la matriz m2 de la matriz m1.
         * @param {Matrix3} m1
         * @param {Matrix3} m2
         * @return {Matrix3}
         */
        static substract(m1, m2) {
            const negM2 = Matrix3.multiplyScalar(m2, -1);
            return Matrix3.add(m1, negM2);
        }

        /**
         * devuelve la matriz transpuesta de la matriz desde donde se invocó la función.
         */
        transpose() {
            const elems = [];
            for(let j = 0; j < 3; j++) {
                for(let i = 0; i < 3; i++) {
                    elems.push(this[`a${i}${j}`]);
                }
            }
            return new Matrix3(...elems);
        }
    }

    CG.Matrix3 = Matrix3;
    return CG;
}(CG || {}));

/**
 * Función auxiliar
 * Devuelve el determinante de una matriz de 2x2 dados sus elementos
 * @param {Number} a11
 * @param {Number} a12
 * @param {Number} a21
 * @param {Number} a22
 */
function det2(a11, a12, a21, a22) {
    return (a11*a22-a12*a21);
}

module.exports = CG;