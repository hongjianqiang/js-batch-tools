/**
 * 运算符重载 Demo
 * 矩阵运算
 */
class Matrix {
    constructor(val = []) {
        this.val = val
    }
    // 这里重新定义好加法运算
    static ['operator+'](oper1, oper2) {
        const result = oper1.val.map((row, i) => {
            return row.map((num, j) => num + oper2.val[i][j])
        })
        return new Matrix(result)
    }
}

const m1 = new Matrix([
    [1, 2, 3],
    [4, 5, 6]
]);

const m2 = new Matrix([
    [ 7,  8,  9],
    [10, 11, 12]
]);

const m3 = m1 + m2;  // 两个对象直接相加即可

console.log(m1)
console.log(m2)
console.log(m3)
