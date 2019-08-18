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

		}
	}

	CG.Matrix3 = Matrix3;
	return CG;

})(CG || {});