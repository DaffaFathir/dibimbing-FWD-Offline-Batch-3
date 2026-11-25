// DERET FIBONACCI
const fibGenerator = (n) => {
    let fibo = []
    for (let i = 0; i < n; i++) {
        if (i === 0) {
            fibo.push(0);
        } else if (i === 1) {
            fibo.push(1);
        } else {
            fibo.push(fibo[i - 1] + fibo[i - 2]);
        }
    }
    return fibo
}
console.log(fibGenerator(5));
console.log(fibGenerator(10));