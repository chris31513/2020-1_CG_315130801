var CG = (function(CG){
	
	class Vector4{

		/*Constructor de un vector de 4 dimensiones.*/	
		constructor(x, y, z, w){
			if(x == undefined){
				this.x = 0;
			}else{
				this.x = x;
			}
			if(y == undefined){
				this.y = 0;
			}else{
				this.y = y;
			}
			if(z == undefined){
				this.z = 0;
			}else{
				this.z = z;
			}
			if(w == undefined){
				this.w = 0;
			}else{
				this.w = w;
			}
		}

		/*Regresa la suma de dos vectores de tamaño 4.*/
		static add(u, v){
			vector = Vector4(u.x + v.x, u.y + v.y, u.z + v.z, u.w + v.w);
			return vector;
		}

		/*Regresa una instancia de Vector4 con los mismos atributos que el vector que la invocó.*/
		clone(){
			vector = Vector4(this.x, this.y, this.z, this.w);
			return vector;
		}

		/*Regresa la distancia entre dos vectores.*/
		static distance(u, v){
			x = Math.pow((v.x - u.x), 2);
			y = Math.pow((v.y - u.y), 2);
			z = Math.pow((v.z - u.z), 2);
			w = Math.pow((v.w - u.w), 2);
			d = Math.pow(x + y + z + w, 1/2);
			return d;
		}

		/*Regresa el producto punto de dos vectores.*/
		static dot(u, v){
			return (u.x * v.x) + (u.y * v.y) + (u.z * v.z) + (u.w * v.w);
		}

		/*Compara dos vecotres y regresa true si difieren a lo más por 0.000001 en sus coordenadas, false en otro caso.*/
		static equals(u, v){
			epsilon = 0.000001;
			return (((u.x >= v.x) || (u.x <= (v.x + epsilon))) && ((u.y >= v.y) || (u.y <= v.x + epsilon)) && ((u.z >= v.z) || (u.z <= v.z + epsilon)) && ((u.w >= v.w) || (u.w <= v.w + epsilon))) || (((v.x >= u.x) || (v.x <= u.x + epsilon)) && ((v.y >= u.y) || (v.y <= u.y + epsilon)) && ((v.z >= u.z) || (v.z <= u.z + epsilon)) && ((v.w >= u.w) || (v.w <=  u.w + epsilon)));
		}

		/*Compara dos vectores y regresa true si son exactamente el mismo vector.*/
		static exactEquals(u, v){
			if(u.x == v.x && u.y == v.y && u.z == v.z && u.w == v.w){
				return true;
			}
			return false;
		}

		/*Regresa la norma del vector que invocó a la función-*/
		length(){
			x = Math.pow(this.x, 2);
			y = Math.pow(this.y, 2);
			z = Math.pow(this.z, 2);
			w = Math.pow(this.w, 2);
			l = Math.pow(x + y + z + w, 1/2);
			return l;
		}

		/*Regresa el vector normalizado del vector que invocó la función.*/
		normalize(){
			mag = this.length();
			x = this.x / mag;
			y = this.y / mag;
			z = this.z / mag;
			w = this.w / mag;
			vector = Vector4(x, y, z, w);
			return vector;
		}

		/*Remplaza las coordenadas del vector que invocó a la función por las que se le pasan como parámetros.*/
		set(x, y, z, w){
			this.x = x
			this.y = y;
			this.z = z;
			this.w = w;
		}

		/*Regresa la distancia cuadrada entre dos vectores.*/
		static squaredDistance(u, v){
			return Math.pow(this.distance(u, v), 2);
		}

		/*Regresa la norma cuadrada del vector que invocó a la función.*/
		squaredLength(){
			return Math.pow(this.length(), 2);
		}

		/*Le asigna 0 a las coordenadas del vector que invocó a la función.*/
		zero(){
			this.x = 0;
			this.y = 0;
			this.z = 0;
			this.w = 0;
		}
	}

	CG.Vector4 = Vector4;
	return CG;

})(CG || {});