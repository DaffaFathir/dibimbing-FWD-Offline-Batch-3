// let obj = { nama: "Jokowi", status: "HIDUP"} 

// // Copy
// let objCOPY = {...obj}
// console.log(objCOPY);

// // Nambah
// let objADD = {...obj, kota: "Somlo"}
// console.log(objADD);

// // Override
// let objOVERRIDE = {...obj, status: "Fresh Graduate"}
// console.log(objOVERRIDE);

// SPREAD u/ PASSING ARGUMENT
// function tambah(a, b, c) {
//     return a + b + c
// }

// const angka = [1, 2, 3]

// console.log(tambah(angka[0], angka[1], angka[2]));
// console.log(tambah(...angka));

// REST

// function tambah(...angka) {
//     return angka.reduce((total, n) => total + n, 0)
// }

// console.log(tambah(1, 2, 3, 4, 5, 6, 7, 8, 9));
// console.log(tambah(2, 3, 4));

// function tampil(...nama) {
//     return nama
// }
// console.log(tampil("Jo", "Ko", "Wi", "Do", "Do"));
// console.log(tampil("Jo", "Ko", "Wi"));

const student = {
    name: "Budi",
    age: 20
}

function updateStudent(student, ...hobbie) {
    console.log(`Nama: ${student.name}`);
    console.log(`Umur: ${student.age}`);
    console.log(`Hobbie:`, hobbie);

    // let result = {
    //     name: student.name,
    //     age: student.age,
    //     hobbies: hobbie
    // }
    // console.log(result);
}
updateStudent(student, "Gaming", "Reading", "Kritik Pemerintah")