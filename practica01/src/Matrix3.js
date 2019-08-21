var CG = (function(CG){

	class Matrix3{

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

		static add(m1, m2){
			matrix = Matrix3(m1.a00 + m2.a00, m1.a01 + m2.a01, m1.a02 + m2.a02,
							 m1.a10 + m2.a10, m1.a11 + m2.a11, m1.a12 + m2.a12,
							 m1.a20 + m2.a20, m1.a21 + m2.a21, m1.a22 + m2.a22);
			return matrix;
		}

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

		clone(){
			matrix = Matrix3(this.a00, this.a01, this.a02,
							 this.a10, this.a11, this.a12,
							 this.a20, this.a21, this.a22);
			return matrix;
		}

		determinant(){
			
		}
	}

	CG.Matrix3 = Matrix3;
	return CG;

})(CG || {});