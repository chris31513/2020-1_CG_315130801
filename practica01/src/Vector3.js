var CG = (function(CG){
	class Vector3{

		/*Constructor del vector de tercera dimensión.*/
		constructor(x,y,z){
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
		}
		/*Suma de vectores entrada por entrada.*/
		static add(u, v){
			vector = Vector3(u.x + v.x, u.y + v.y, u.z + v.z);
			return vector;
		}

		/*Calcula el ángulo que se forma entre dos vectores.*/
		static angle(u, v){
			x = u.x * v.x + u.y * v.y + u.z * v.z;
			y = Math.pow(Math.pow(u.x,2) + Math.pow(u.y,2) + Math.pow(u.z,2), 1/2);
			z = Math.pow(Math.pow(v.x,2) + Math.pow(v.y,2) + Math.pow(v.z,2), 1/2);
			y = z * y;
			x = x / y;
			x = Math.acos(x);
			return x;
		}

		/*Regresa una instancia de Vector3 con los mismo atributos del vector que la invocó.*/
		clone(){
			vector = Vector3(this.x, this.y, this.z);
			return vector;
		}

		/*Regresa el producto cruz de dos vectores.*/
		static cross(u, v){
			x = u.y * v.z;
			x1 = u.z * v.y;
			x1 = x1 * -1;
			x = x + x1;
			y = u.x * v.z;
			y1 = u.z * v.x;
			y1 = y1 * -1;
			y = y + y1;
			z = u.x * v.y;
			z1 = u.y * v.x;
			z1 = z1 * -1;
			z = z + z1;
			vector = Vector3(x, y * -1, z);
			return vector;
		}

		/*Regresa la distancia que hay entre dos vectores.*/
		static distance(u, v){
			x = Math.pow((v.x - u.x), 2);
			y = Math.pow((v.y - u.y), 2);
			z = Math.pow((v.z - u.z), 2);
			w = Math.pow(x + y + z, 1/2);
			return w;
		}

		/*Regresa el producto punto de dos vectores*/
		static dot(u, v){
			return (u.x * v.x) + (u.y * v.y) + (u.z * v.z);
		}

		/*Compara dos vectores y regresa true si difieren a lo más en 0.000001 o false en cualquier otro caso.*/
		static equals(u, v){
			epsilon = 0.000001;
			return (((u.x >= v.x) || (u.x <= (v.x + epsilon))) && ((u.y >= v.y) || (u.y <= v.x + epsilon)) && ((u.z >= v.z) || (u.z <= v.z + epsilon))) || (((v.x >= u.x) || (v.x <= u.x + epsilon)) && ((v.y >= u.y) || (v.y <= u.y + epsilon)) && ((v.z >= u.z) || (v.z <= u.z + epsilon)));
		}

		/*Compara dos vectores y regresa true si son exactamente iguales*/
		static exactEquals(u, v){
			if(u.x == v.x && u.y == v.y && u.z == v.z){
				return true;
			}
			return false;
		}

		/*Regresa la norma del vector que lo invocó.*/
		length(){
			x = Math.pow(this.x, 2);
			y = Math.pow(this.y, 2);
			z = Math.pow(this.z, 2);
			w = Math.pow(x + y + z, 1/2);
			return w;
		}

		/*Regresa el vector normalizado del vector que lo invocó.*/
		normalize(){
			mag = this.length();
			x = this.x / mag;
			y = this.y / mag;
			z = this.z / mag;
			vector = Vector3(x, y, z);
			return vector;
		}

		/*Remplaza a la x, y y z del vector que lo invocó por los parámetros que recibe.*/
		set(x, y, z){
			this.x = x;
			this.y = y;
			this.z = z;
		}

		/*Regresa la distancia cuadra entre dos vectores*/
		static squaredDistance(u, v){
			return Math.pow(this.distance(u, v), 2);
		}

		/*Regresa la norma cuadrada del vector que lo invocó.*/
		squaredLength(){
			return Math.pow(this.length(), 2);
		}

		/*Asigna cero a todas las coordenadas del vector que invocó a la función.*/
		zero(){
			this.x = 0;
			this.y = 0;
			this.z = 0;
		}
	}

	CG.Vector3 = Vector3;
	return CG;

})(CG || {});