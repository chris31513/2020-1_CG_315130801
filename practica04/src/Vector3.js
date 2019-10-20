var CG = (function(CG) {
    class Vector3 {
        /**
         * Creates an object that represents a three components vector,
         * if no params are passed, a zero vector is created instead.
         * @param {Number} x 
         * @param {Number} y 
         * @param {Number} z 
         */
        constructor(x, y, z) {
            this.set(x, y, z);
        }

        /**
         * Returns a new Vector3 which is the sum of its components
         * @param {Vector3} u first vector
         * @param {Vector3} v second vector
         * @return {Vector3}
         */
        static add(u, v) {
            return new Vector3(u.x+v.x, u.y+v.y, u.z+v.z);
        }

        static sub(u, v) {
            return new Vector3(u.x - v.x, u.y - v.y, u.z - v.z);
        }
        
        /**
         * Returns the angle between two vectors
         * @param {Vector3} u first vector
         * @param {Vector3} v second vector
         * @return {Number}
         */
        static angle(u, v) {
            return Math.acos(
                Vector3.dot(u,v) / (u.length() * v.length())
            );
        }

        /**
         * Returns a new Vector3 with the same components than this
         * @return {Vector3}
         */
        clone() {
            return new Vector3(this.x, this.y, this.z);
        }

        /**
         * Returns the cross product of two 3D vectors
         * @param {Vector3} u 
         * @param {Vector3} v 
         * @return {Vector3}
         */
        static cross(u, v) {
            return new Vector3(
                u.y*v.z - u.z*v.y,
                u.z*v.x - u.x*v.z,
                u.x*v.y - u.y*v.x
            );
        }

        /**
         * Returns the distance between two 3D vectors
         * @param {Vector3} u 
         * @param {Vector3} v 
         * @return {Number}
         */
        static distance(u, v) {
            return Math.sqrt(Vector3.squareDistance(u,v));
        }

        /**
         * Calculates the dot product between two 3D vectors
         * @param {Vector3} u 
         * @param {Vector3} v 
         * @return {Number}
         */
        static dot (u, v) {
            return u.x*v.x + u.y*v.y + u.z*v.z;
        }

        /**
         * Returns true if the components of both 3D vectors are almost the same
         * (under 0.000001 of difference)
         * @param {Vector3} u 
         * @param {Vector3} v
         * @return {Boolean}
         */
        static equals(u, v) {
            var epsilon = 0.000001;
            return (
                Math.abs(u.x - v.x) <= epsilon &&
                Math.abs(u.y - v.y) <= epsilon &&
                Math.abs(u.z - v.z) <= epsilon
            );
        }

        /**
         * Returns true if both 3D vectors are exactly the same
         * @param {Vector3} u 
         * @param {Vector3} v 
         * @return {Boolean}
         */
        static exactEquals(u, v) {
            return u.x === v.x && u.y === v.y && u.z === v.z;
        }

        /**
         * Calculates the length (norm) of this vector
         * @return {Number}
         */
        length() {
            return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
        }

        /**
         * Returns a unitary vector preserving the direction
         */
        normalize() {
            var len = this.length();
            return new Vector3(
                this.x / len,
                this.y / len,
                this.z / len
            );
        }

        /**
         * Changes/sets the components of this 3D vector
         * @param {Number} x 
         * @param {Number} y 
         * @param {Number} z 
         */
        set(x, y, z) {
            x = x || 0;
            y = y || 0;
            z = z || 0;
            if (
                typeof x !== "number" ||
                typeof y !== "number" ||
                typeof z !== "number") throw "Not a real number";
            this.x = x;
            this.y = y;
            this.z = z;
        }

        /**
         * Returns the distance squared between two 3D vectors
         * @param {Vector3} u 
         * @param {Vector3} v 
         * @return {Number}
         */
        static squareDistance(u, v) {
            return (u.x-v.x)**2 + (u.y-v.y)**2 + (u.z-v.z)**2;
        }

        /**
         * Returns the length (norm) squared of this vector
         * @return {Number}
         */
        squaredLength() {
            return Math.pow(this.length(), 2);
        }

        /**
         * Transforms this vector in a zero 3D vector
         */
        zero() {
            this.set();
        }
    }

    CG.Vector3 = Vector3;
    return CG;
}(CG || {}));