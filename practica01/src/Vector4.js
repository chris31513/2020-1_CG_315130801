var CG = (function(CG){
	
	class Vector4{
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

		static add(u, v){
			vector = Vector4(u.x + v.x, u.y + v.y, u.z + v.z, u.w + v.w);
			return vector;
		}

		clone(){
			vector = Vector4(this.x, this.y, this.z, this.w);
			return vector;
		}

		static distance(u, v){
			x = Math.pow((v.x - u.x), 2);
			y = Math.pow((v.y - u.y), 2);
			z = Math.pow((v.z - u.z), 2);
			w = Math.pow((v.w - u.w), 2);
			d = Math.pow(x + y + z + w, 1/2);
			return d;
		}

		static dot(u, v){
			return (u.x * v.x) + (u.y * v.y) + (u.z * v.z) + (u.w * v.w);
		}

		static equals(u, v){
			epsilon = 0.000001;
			return (((u.x >= v.x) || (u.x <= (v.x + epsilon))) && ((u.y >= v.y) || (u.y <= v.x + epsilon)) && ((u.z >= v.z) || (u.z <= v.z + epsilon)) && ((u.w >= v.w) || (u.w <= v.w + epsilon))) || (((v.x >= u.x) || (v.x <= u.x + epsilon)) && ((v.y >= u.y) || (v.y <= u.y + epsilon)) && ((v.z >= u.z) || (v.z <= u.z + epsilon)) && ((v.w >= u.w) || (v.w <=  u.w + epsilon)));
		}

		static exactEquals(u, v){
			if(u.x == v.x && u.y == v.y && u.z == v.z && u.w == v.w){
				return true;
			}
			return false;
		}

		length(){
			x = Math.pow(this.x, 2);
			y = Math.pow(this.y, 2);
			z = Math.pow(this.z, 2);
			w = Math.pow(this.w, 2);
			l = Math.pow(x + y + z + w, 1/2);
			return l;
		}

		normalize(){
			mag = this.length();
			x = this.x / mag;
			y = this.y / mag;
			z = this.z / mag;
			w = this.w / mag;
			vector = Vector4(x, y, z, w);
			return vector;
		}

		set(x, y, z, w){
			this.x = x
			this.y = y;
			this.z = z;
			this.w = w;
		}

		static squaredDistance(u, v){
			return Math.pow(this.distance(u, v), 2);
		}

		static squaredLength(){
			return Math.pow(this.length(), 2);
		}

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