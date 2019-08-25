var CG = (function(CG){

	class Matrix3{

		/*Construye una matriz 3x3.*/
		constructor(a00, a01, a02,
					a10, a11, a12,
					a20, a21, a22){
			if(a00 == undefined){
				this.a00 = 1;
			}else{
				this.a00 = a00;
			}
			if(a01 == undefined){
				this.a01 = 0;
			}else{
				this.a01 = a01;
			}
			if(a02 == undefined){
				this.a02 = 0;
			}else{
				this.a02 = a02;
			}
			if(a10 == undefined){
				this.a10 = 0;
			}else{
				this.a10 = a10;
			}
			if(a11 == undefined){
				this.a11 = 1;
			}else{
				this.a11 = a11;
			}
			if(a12 == undefined){
				this.a12 = 0;
			}else{
				this.a12 = a12;
			}
			if(a20 == undefined){
				this.a20 = 0;
			}else{
				this.a20 = a20;
			}
			if(a21 == undefined){
				this.a21 = 0;
			}else{
				this.a21 = a21;
			}
			if(a22 == undefined){
				this.a22 = 1;
			}else{
				this.a22 = a22;
			}
		}

		/*Regresa la matriz suma de dos matrices 3x3.*/
		static add(m1, m2){
			matrix = Matrix3(m1.a00 + m2.a00, m1.a01 + m2.a01, m1.a02 + m2.a02,
							 m1.a10 + m2.a10, m1.a11 + m2.a11, m1.a12 + m2.a12,
							 m1.a20 + m2.a20, m1.a21 + m2.a21, m1.a22 + m2.a22);
			return matrix;
		}

		/*Regresa la matriz adjunta de la matriz que invocó a la función.*/
		adjoint(){
			ad00 = (this.a11 * this.a22) - (this.a12 * this.a21);
			ad01 = -1 * ((this.a10 * this.a22) - (this.a12 * this.a20));
			ad02 = (this.a10 * this.a21) - (this.a11 * this.a20);
			ad10 = -1 * ((this.a01 * this.a22) - (this.a02 * this.a21));
			ad11 = (this.a00 * this.a22) - (this.a02 * this.a21);
			ad12 = -1 ((this.a00 * this.a21) - (this.a01 * this.a20));
			ad20 = (this.a01 * this.a12) - (this.a02 * this.a11);
			ad21 = -1 * ((this.a00 * this.a12) - (this.a02 * this.a10));
			ad22 = (this.a00 * this.a11) - (this.a01 * this.a10);
			matrix = Matrix3(ad00, ad01, ad02,
			                 ad10, ad11, ad12,
			                 ad20, ad21, ad22);
			return matrix;
		}

		/*Regresa una instancia de Matrix3 con los mismos atributos que la matriz que invocó a la función.*/
		clone(){
			matrix = Matrix3(this.a00, this.a01, this.a02,
							 this.a10, this.a11, this.a12,
							 this.a20, this.a21, this.a22);
			return matrix;
		}

		/*Regresa el determinante de la matriz que invocó a la función.*/
		determinant(){
			a = this.a00 * this.a11 * this.a22;
			b = this.a01 * this.a12 * this.a20;
			c = this.a02 * this.a10 * this.a21;
			d = this.a02 * this.a11 * this.a20;
			e = this.a12 * this.a21 * this.a00;
			f = this.a22 * this.a01 * this.a10;
			d = d + e + f;
			d = d * -1;
			a = a + b + c + d;
			return a; 
		}

		/*Compara si dos matrices son exactamante iguales.*/
		static exactEquals(m1, m2){
			return m1.a00 == m2.a00 && m1.a01 == m2.a01 && m1.a02 == m2.a02 && 
				   m1.a10 == m2.a10 && m1.a11 == m2.a11 && m1.a12 == m2.a12 &&
				   m1.a20 == m2.a20 && m1.a21 == m2.a21 && m1.a22 == m2.a22;
		}

		/*Convierte a la matriz que invocó a la función en la matriz identidad.*/
		identity(){
			this.a00 = 1;
			this.a01 = 0;
			this.a02 = 0;
			this.a10 = 0;
			this.a11 = 1;
			this.a12 = 0;
			this.a20 = 0;
			this.a21 = 0;
			this.a22 = 0;
		}

		/*Regresa la matriz resultado de la multiplicación de matrices.*/
		static multiply(m1, m2){
			m3 = Matrix3((m1.a00 * m2.a00) + (m1.a01 * m2.a10) + (m1.a02 * m2.a20), (m1.a00 * m2.a01) + (m1.a01 * m2.a11) + (m1.a02 * m2.a21), (m1.a00 * m2.a02) + (m1.a01 * m2.a12) + (m1.a02 * m2.a22),
				         (m1.a10 * m2.a00) + (m1.a11 * m2.a10) + (m1.a12 * m2.a20), (m1.a10 * m2.a01) + (m1.a11 * m2.a11) + (m1.a12 * m2.a21), (m1.a10 * m2.a02) + (m1.a11 * m2.a12) + (m1.a12 * m2.a22),
				         (m1.a20 * m2.a00) + (m1.a21 * m2.a10) + (m1.a22 * m2.a20), (m1.a20 * m2.a01) + (m1.a21 * m2.a11) + (m1.a22 * m2.a21), (m1.a20 * m2.a02) + (m1.a21 * m2.a12) + (m1.a22 * m2.a22));
			return m3;
		}

		/*Regresa la matriz resultado de la multiplicación por escalar y una matriz.*/
		static multiplyScalar(m1, c){
			m3 = Matrix3(m1.a00 * c, m1.a01 * c, m1.a02 * c,
				         m1.a10 * c, m1.a11 * c, m1.a12 * c,
				         m1.a20 * c, m1.a21 * c, m1.a22 * c);
			return m3;
		}

		/*Remplaza los elementos de la matriz que invocó a la función por los que se le pasan como parámetros.*/
		set(a00, a01, a02, a10, a11, a12, a20, a21, a20){
			this.a00 = a00;
			this.a01 = a01;
			this.a02 = a02;
			this.a10 = a10;
			this.a11 = a11;
			this.a12 = a12;
			this.a21 = a21;
			this.a22 = a22;
		}

		/*Regresa la matriz resultado de la resta de dos matrices.*/
		static substract(m1, m2){
			m2 = this.multiplyScalar(m2, -1);
			return this.add(m1, m2);
		}

		/*Regresa la matriz transpuesta de la matriz que la invocó.*/
		transpose(){
			m = Matrix3(this.a00, this.a10, this.a20,
				        this.a01, this.a11, this.a21,
				        this.a02, this.a12, this.a22);
			return m;
		}
	}

	CG.Matrix3 = Matrix3;
	return CG;

})(CG || {});