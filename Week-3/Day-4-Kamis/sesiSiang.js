// LOOPING (FOR)
// for (let unit = 1; unit <= 5; unit++) {
//     console.log('Unit ke-' +unit);
// }

// for (let unit = 1; unit <= 5;) {
//     console.log('Unit ke-' +unit);
//     unit++
// }

// IF ELSE
// const stock = 3

// if (stock === 0) {
//     console.log("Habis");
// } else if (stock <= 5){
//     console.log("Sisa sedikit");
// } else {
//     console.log("Ada nih");
// }

// GANTI DARI IF KE SWITCH
// const stock = 3

// switch (true){
//     case stock === 0:
//         console.log('Habis');
//         break
//     case stock <= 5:
//         console.log('Sisa Dikit');
//         break
//     default:
//         console.log('Ada bos');
// }

// SWITCH
// const variant = 'M'
// let stock

// switch (variant) {
//     case 'S':
//         stock = 5
//         break
//     case 'M':
//         stock = 3
//         break
//     default:
//         stock = 0
// }
// console.log(stock);

// // WHILE
// let balance = 50000
// let cup = 0

// while (balance >= 20000){
//     balance -= 20000
//     cup += 1
// }
// console.log(cup, balance);

// // UBAH FOR KE SWITCH
// let unit = 1
// while (unit <= 5){
//     console.log("Baris ke-" +unit);
//     unit++
// }

// // LATIHAN SOAL: KebunSegar
// const belanja = 50000
// if (belanja >= 100000){
//     console.log(belanja);
// } else {
//     console.log(belanja + 15000);
// }

// // LATIHAN SOAL: Toko Baju Rapi
// const subtotal = 300000
// let diskon

// if (subtotal >= 500000){
//     diskon = subtotal * 0.15
// } else if (subtotal >= 200000) {
//     diskon = subtotal * 0.1
// } else {
//     diskon = 0
// }

// let totalBayar = subtotal - diskon
// console.log(totalBayar);

// // LATIHAN SOAL: Kopi ke-5 Gratis
// let price = 10000
// let quantity = 7
// let cup = 0
// let total = 0

// while (quantity > 0) {
//     quantity -= 1   
//     total += price
//     cup += 1
//     if (cup % 5 === 0){
//         price = 0
//     }
//     else {
//         price = 10000
//     }
// }
// console.log(`Cup: ${cup}\nHarga: ${total}`);