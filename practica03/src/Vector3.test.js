const CG = require('./Vector3');
const Vector3 = CG.Vector3;

test('Constructor', () => {
    const u = new Vector3(1,2,3);
    const v = new Vector3();
    expect(u.x).toBe(1);
    expect(u.y).toBe(2);
    expect(u.z).toBe(3);
    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
    expect(v.z).toBe(0);
    expect(() => new Vector3("uno", 2, 3)).toThrow();
    expect(() => new Vector3(1, "dos", 3)).toThrow();
    expect(() => new Vector3(1, 2, "tres")).toThrow();
    expect(() => new Vector3(1, true)).toThrow();
});

test('Add two 3D vectors', () => {
    const u = new Vector3(1,2,3);
    const v = new Vector3(4,5,-6);
    let w = Vector3.add(u, v);
    expect(w.x).toBe(5);
    expect(w.y).toBe(7);
    expect(w.z).toBe(-3);
    expect(() => Vector3.add()).toThrow();
    expect(() => Vector3.add(u)).toThrow();
    expect(() => Vector3.add(u, 1)).toThrow();
    expect(() => Vector3.add(1, v)).toThrow();
});

test('Angle between two 3D vectors', () => {
    const u = new Vector3(1,0,0);
    const v = new Vector3(0,1,0);
    expect(Vector3.angle(u,v)).toBe(Math.PI / 2);
    expect(Vector3.angle(v,v)).toBe(0);
    expect(() => Vector3.angle(v)).toThrow()
    expect(() => Vector3.angle()).toThrow()
});

test('Clone a 3D vector', () => {
    const u = new Vector3(1,2,3);
    const clon = u.clone();
    expect(Vector3.exactEquals(u, clon)).toBeTruthy();
});

test('Cross product', () => {
    const i = new Vector3(1,0,0);
    const j = new Vector3(0,1,0);
    const k = new Vector3(0,0,1);
    const u = new Vector3(1,2,3);
    const v = new Vector3(4,5,-6);
    const w = Vector3.cross(u,v);
    const a = Vector3.cross(v,u);
    expect(w.x).toBe(-27);
    expect(w.y).toBe(18);
    expect(w.z).toBe(-3);
    expect(a.x).toBe(27);
    expect(a.y).toBe(-18);
    expect(a.z).toBe(3);
    expect(Vector3.equals(Vector3.cross(i,j), k)).toBeTruthy();
    expect(() => Vector3.cross()).toThrow();
    expect(() => Vector3.cross(u)).toThrow();
});

test('Distance between two 3D vectors', () => {
    const u = new Vector3(3,0,0);
    const v = new Vector3(0,4,0);
    expect(Vector3.distance(u,v)).toBe(5);
    expect(() => Vector3.distance(u)).toThrow();
    expect(() => Vector3.distance()).toThrow();
});

test('Dot product', () => {
    const u = new Vector3(1,2,3);
    const v = new Vector3(4,5,-6);
    const i = new Vector3(1,0,0);
    const j = new Vector3(0,1,0);
    const k = new Vector3(0,0,1);
    expect(Vector3.cross(u,v)).toBe(-4);
    expect(Vector3.cross(v,u)).toBe(-4);
    expect(Vector3.cross(i,j)).toBe(0);
    expect(Vector3.cross(i,k)).toBe(0);
    expect(Vector3.cross(j,k)).toBe(0);
    expect(() => Vector3.cross()).toThrow();
    expect(() => Vector3.cross(u)).toThrow();
});

test('Equals', () => {
    
});

test('Exact equals', () => {});

test('Length', () => {});

test('Normalize', () => {});

test('Set', () => {});

test('Squared distance', () => {});

test('Squared length', () => {});

test('Zero', () => {});

