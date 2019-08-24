var CG = (function(CG){
	class Vector3{
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

		static add(u, v){
			vector = Vector3(u.x + v.x, u.y + v.y, u.z + v.z);
			return vector;
		}

		static angle(u, v){
			x = u.x * v.x + u.y * v.y + u.z * v.z;
			y = Math.pow(Math.pow(u.x,2) + Math.pow(u.y,2) + Math.pow(u.z,2), 1/2);
			z = Math.pow(Math.pow(v.x,2) + Math.pow(v.y,2) + Math.pow(v.z,2), 1/2);
			y = z * y;
			x = x / y;
			x = Math.acos(x);
			return x;
		}

		clone(){
			vector = Vector3(this.x, this.y, this.z);
			return vector;
		}

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

		static distance(u, v){
			x = Math.pow((v.x - u.x), 2);
			y = Math.pow((v.y - u.y), 2);
			z = Math.pow((v.z - u.z), 2);
			w = Math.pow(x + y + z, 1/2);
			return w;
		}

		static dot(u, v){
			return (u.x * v.x) + (u.y * v.y) + (u.z * v.z);
		}

		static equals(u, v){
			epsilon = 0.000001;
			vector_e = Vector3(epsilon, epsilon, epsilon);
			return exactEquals(add(u, vector_e), add(v, vector_e)) || exactEquals(u, v);
		}

		static exactEquals(u, v){
			if(u.x == v.x && u.y == v.y && u.z == v.z){
				return true;
			}
			return false;
		}

		length(){
			x = Math.pow(this.x, 2);
			y = Math.pow(this.y, 2);
			z = Math.pow(this.z, 2);
			w = Math.pow(x + y + z, 1/2);
			return w;
		}

		normalize(){
			mag = this.length();
			x = this.x / mag;
			y = this.y / mag;
			z = this.z / mag;
			vector = Vector3(x, y, z);
			return vector;
		}

		set(x, y, z){
			this.x = x;
			this.y = y;
			this.z = z;
		}

		squaredDistance(u, v){
			return Math.pow(this.distance(u, v), 2);
		}

		squaredLength(){
			return Math.pow(this.length(), 2);
		}

		zero(){
			this.x = 0;
			this.y = 0;
			this.z = 0;
		}
	}

	CG.Vector3 = Vector3;
	return CG;

})(CG || {});