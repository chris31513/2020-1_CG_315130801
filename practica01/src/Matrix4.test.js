const CG = require('./Matrix4');
const Matrix4 = CG.Matrix4;

test('Constructor', () => {

});

test('Cofactor', () => {
    const m1 = new Matrix4(1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6);
    expect(m1.adj(1,2)).toBe(40);
});

test('Multiplication', () => {
    const m1 = new Matrix4(1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6);
    const m2 = Matrix4.multiply(m1, m1);
    expect(m2.a00).toBe(50);
    expect(m2.a01).toBe(30);
    expect(m2.a02).toBe(40);
    expect(m2.a03).toBe(50);
    expect(m2.a10).toBe(122);
    expect(m2.a11).toBe(78);
    expect(m2.a12).toBe(104);
    expect(m2.a13).toBe(130);
    expect(m2.a20).toBe(24);
    expect(m2.a21).toBe(26);
    expect(m2.a22).toBe(38);
    expect(m2.a23).toBe(50);
    expect(m2.a30).toBe(86);
    expect(m2.a31).toBe(54);
    expect(m2.a32).toBe(72);
    expect(m2.a33).toBe(90);
});

test('Sacalar Multiplication', () => {
    const m1 = new Matrix4(1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6);
    const m2 = Matrix4.multiplyScalar(m1, 2);
    expect(m2.a00).toBe(2);
    expect(m2.a01).toBe(4);
    expect(m2.a02).toBe(6);
    expect(m2.a03).toBe(8);
    expect(m2.a10).toBe(10);
    expect(m2.a11).toBe(12);
    expect(m2.a12).toBe(14);
    expect(m2.a13).toBe(16);
    expect(m2.a20).toBe(18);
    expect(m2.a21).toBe(0);
    expect(m2.a22).toBe(2);
    expect(m2.a23).toBe(4);
    expect(m2.a30).toBe(6);
    expect(m2.a31).toBe(8);
    expect(m2.a32).toBe(10);
    expect(m2.a33).toBe(12);
});

test('Transpose', () => {
    const m1 = new Matrix4(1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6);
    const mt = m1.transpose();
    expect(mt.a00).toBe(1);
    expect(mt.a01).toBe(5);
    expect(mt.a02).toBe(9);
    expect(mt.a03).toBe(3);
    expect(mt.a10).toBe(2);
    expect(mt.a11).toBe(6);
    expect(mt.a12).toBe(0);
    expect(mt.a13).toBe(4);
    expect(mt.a20).toBe(3);
    expect(mt.a21).toBe(7);
    expect(mt.a22).toBe(1);
    expect(mt.a23).toBe(5);
    expect(mt.a30).toBe(4);
    expect(mt.a31).toBe(8);
    expect(mt.a32).toBe(2);
    expect(mt.a33).toBe(6);
});