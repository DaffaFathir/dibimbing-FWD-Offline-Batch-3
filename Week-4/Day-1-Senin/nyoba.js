// const angka = [56, 1, 32, 123];
// console.log(angka.sort(function(a, b){return a - b}))
// console.log(angka.reverse(function(a, b){return a - b}))

// FUNCTION
// function rispek(orang) {
//     return `HIDUPP ${orang}!!!`
// }
// console.log(rispek("JOKOWI"));
// console.log(rispek("LODEH")); 
// const teks = "BOS"
// console.log(rispek(`GIBRAN ${teks}`));

// DECLARATION
// console.log(pertambahan(3, 5));
// function pertambahan(a, b) {
//     return a + b
// }

// // EXPRESSION 
// const pengurangan = function (a, b) {
//     return a - b
// }
// console.log(pengurangan(3, 5));

// ARROW FUNCTION BIASA
// const kuadrat = (a, b) => {
//     return a < b;
// }
// console.log(kuadrat(5, 12));

// ARROW FUNCTION RINGKAS
// const kali = (i, j) => i * j
// console.log(kali(10, 7));

// PARAMETER DAN DEFAULT PARAMETER
// function tes(nama, makanan = "Soto Mie"){
//     return `Halo ${nama}, makan ${makanan} yuk!`
// }
// console.log(tes("Jokowi"));
// console.log(tes("Jokowi", "Lodeh"));
// console.log(tes("Gibran", "Gorengan"));

// Tanpa Return
// function hitungLuas(p, l){
//     const luas = p*l
//     // return luas
// }
// console.log(hitungLuas(10, 5));

// // Higher-Order Function (HOF)
// function operasiAngka(a, b, operasi) {      // operasiAngka adalah HOF
//     return operasi(a, b)                    // operasi adalah callback (tambah, kali)
// }

// const tambah = (x, y) => x + y
// const kali = (x, y) => x * y

// console.log(operasiAngka(5, 3, tambah));
// console.log(operasiAngka(5, 3, kali));

// CALLBACK
// const nilai = [75, 80, 85, 90, 95, 100]

// // callback di filter
// const lulus = nilai.filter(function (n) {
//     return n >= 85
// })
// console.log(lulus);

// // versi arrow function
// const lulus2 = nilai.filter(n => n >= 80)
// console.log(lulus2);

// QUIZ LANJUTAN

// Output
// {
//   totalUsers: 4,
//   admins: 2,
//   users: 2,
//   averageAge: 27.5
// }

const _ = require("lodash")

const user = [
    { name: "Budi", role: "admin", age: 30 },
    { name: "Siti", role: "user", age: 20 },
    { name: "Andi", role: "admin", age: 25 },
    { name: "Rina", role: "user", age: 35 }
]

const analyzeUsers = (input) => {
    const totalUser = _.size(input);
    const admins = _.size(_.filter(input, {role: "admin"}));
    const users = _.size(_.filter(input, {role: "user"}));
    const averageAge = _.meanBy(input, "age");

    return {totalUser, admins, users, averageAge}

    // const groupedUser = _.groupBy(input, 'role')
    
    // const result = {
    //     totalUSers: input.length,
    //     admin: groupedUser.admin.length,
    //     user: groupedUser.user.length,
    //     averageAge: _.meanBy(input, 'age')
    // }
    // return result
};
console.log(analyzeUsers(user))