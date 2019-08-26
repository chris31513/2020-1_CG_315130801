var CG = (function(CG) {
    class Vector4 {
        /**
         * Creates an object that represents a four components vector,
         * if no params are passed, a zero vector is created instead.
         * @param {Number} x 
         * @param {Number} y 
         * @param {Number} z 
         * @param {Number} w 
         */
        constructor(x, y, z, w) {
            set(x, y, z, w);
        }

        /**
         * Returns a new 4D vector which is the sum of its components
         * @param {Vector4} u 
         * @param {Vector4} v 
         * @return {Vector4}
         */
        static add(u, v) {
            return new Vector4( u.x + v.x, u.y + v.y, u.z + v.z, u.w + v.w );
        }

        /**
         * Returns a new 4D vector with the same components than this
         * @return {Vector4}
         */
        clone() {
            return new Vector4(this.x, this.y, this.z, this.w);
        }

        /**
         * Returns the distance between two 4D vectors
         * @param {Vector4} u 
         * @param {Vector4} v 
         * @return {Number}
         */
        static distance(u, v) {
            return Math.sqrt(Vector4.squareDistance(u, v));
        }

        /**
         * Calculates the dot product between two 4D vectors
         * @param {Vector4} u 
         * @param {Vector4} v 
         * @return {Number}
         */
        static dot(u, v) {
            return u.x*v.x + u.y*v.y + u.z*v.z + u.w*v*w;
        }

        /**
         * Returns true if the components of both 4D vectors are almost the same
         * (under 0.000001 of difference)
         * @param {Vector4} u 
         * @param {Vector4} v
         * @return {Boolean}
         */
        static equals(u, v) {
            var epsilon = 0.000001;
            return (
                Math.abs(u.x - v.x) <= epsilon &&
                Math.abs(u.y - v.y) <= epsilon &&
                Math.abs(u.z - v.z) <= epsilon &&
                Math.abs(u.w - v.w) <= epsilon
            );
        }

        /**
         * Returns true if both 4D vectors are exactly the same
         * @param {Vector4} u 
         * @param {Vector4} v 
         * @return {Boolean}
         */
        static exactEquals(u, v) {
            return (
                (u.x === v.x) && (u.y === v.y) && (u.z === v.z) && (u.w === v.w)
            );
        }

        /**
         * Calculates the length (norm) of this vector
         * @return {Number}
         */
        length() {
            return Math.sqrt(this.squaredLength());
        }

        /**
         * Makes this a unitary vector preserving the direction
         */
        normalize() {
            var len = this.length();
            this.x /= len;
            this.y /= len;
            this.z /= len;
            this.w /= len;
        }

        /**
         * Changes/sets the components of this 4D vector
         * @param {Number} x 
         * @param {Number} y 
         * @param {Number} z 
         * @param {Number} w 
         */
        set(x, y, z, w) {
            this.x = x || 0;
            this.y = y || 0;
            this.z = z || 0;
            this.w = w || 0;
        }

        /**
         * Returns the distance squared between two 4D vectors
         * @param {Vector4} u 
         * @param {Vector4} v 
         * @return {Number}
         */
        static squareDistance(u, v) {
            return (u.x-v.x)**2 + (u.y-v.y)**2 + (u.z-v.z)**2 + (u.w-v.w)**2;
        }

        /**
         * Returns the length (norm) squared of this vector
         * @return {Number}
         */
        squaredLength() {
            return Vector4.distance(new Vector4(), this);
        }

        /**
         * Transforms this vector in a zero 4D vector
         */
        zero() {
            this.set(0,0,0,0);
        }
    }

    CG.Vector4 = Vector4;
    return CG;
}(CG || {}));

module.exports = CG;