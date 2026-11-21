// PENGENALAN ARRAY (apa itu array, cara bikin, cara akses)
// const buah = ["apel", "mangga", "jeruk"]
// const campuran = [1, "mangga", null, true]

// // console.log(buah[0]);       // Apel
// // console.log(buah.length);   // 3

// // Cara masukin array
// // const kosong = []
// // kosong.push("Bali")

// buah[2] = "Anggur"
// Push()
// console.log(buah.at(-1));

// let a = ["a", "b", "c", "d", "e"]
// let res1 = a.slice(1, 3)
// console.log(res1);


// let b = ["a", "b", "c", "d", "e"]
// console.log(b);
// b.splice(0, 3, "z")
// console.log(b);

// // ITERASI
// let c = [85, 60, 75, 80, 70, 85]
// console.log(c);

// // forEach
// c.forEach(n => console.log(n))

// // map
// const grade = c.map(n => n >= 75 ? "Lulus" : "Remidi")
// console.log(grade);
// const grade1 = c.map(() => "Gacor")
// console.log(grade1);

// // filter
// const lulus = c.filter(n => n >= 75)
// console.log(lulus);

// // reduce
// const total = c.reduce((kumpul, n) => kumpul + n, 0)
// console.log(total);


// // ARRAY DECONSTRUCTING
// const koordinat = [10, 20, 30]

// // basic
// const [x, y, z] = koordinat // x = 10, y = 20, z = 30

// // Skip element
// const [, , ketiga] = koordinat  // ketiga = 30

// // Rest
// const [first, ...sisaMas] = koordinat  // first = 10, sisaMas = [20, 30]

// // SPREAD OPERATOR
// const a = [1, 2, 3]
// const b = [4, 5, 6]

// const copy = [...a]     // [1, 2, 3]
// const merge = [...a, ...b]  // [1, 2, 3, 4, 5, 6]
// const insert = [...1, 99, ...b]     // [1, 2, 3, 99, 4, 5, 6]

// Math.max(...a, ...b)    // 6


// OBJECT
const user = {
    nama: "Rina",
    "usia": 25,
    aktif: true,
    hobi: ["Coding", "Membaca"],
};

// console.log(user.nama);     // Rina
// console.log(user["usia"]);  // 25
// console.log(user.hobi[1]);  // Membaca

// const ini = "nama"
// console.log(user[ini]);     // Rina
// console.log(user["usia"]);  // 25

// CRUD
// user.gender = "Perempuan" 