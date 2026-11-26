// SOAL 1: MANIPULASI ARRAY NILAI SISWA
const nilaiSemester = [85, 90, 78.5, 92.25, 67.5, 75.27, 85, 97.25];
// const nilaiSemester = []

function hitungNilaiSemester(nilai = []) {
    if (nilai.length === 0) {
        return {totalNilaiSemesterGanjil: 0, totalNilaiSemesterGenap: 0, rataRataSemesterNilaiGanjil: 0, rataRataSemesterNilaiGenap: 0};
    }

    const hasil = nilaiSemester.reduce((akumulasi, nilaiSemester, index) => {
        if ((index + 1) % 2 !== 0) {
            akumulasi.totalGanjil += nilaiSemester;
            akumulasi.jumlahGanjil += 1;
        } else {
            akumulasi.totalGenap += nilaiSemester;
            akumulasi.jumlahGenap += 1;
        }
        return akumulasi;
    }, {totalGanjil: 0, totalGenap: 0, jumlahGanjil: 0, jumlahGenap: 0});

    return {
        totalNilaiSemesterGanjil: hasil.totalGanjil,
        totalNilaiSemesterGenap: hasil.totalGenap,
        rataRataNilaiSemesterGanjil: hasil.totalGanjil / hasil.jumlahGanjil,
        rataRataNilaiSemesterGenap: hasil.totalGenap / hasil.jumlahGenap
    };
}
console.log(hitungNilaiSemester(nilaiSemester));

// SOAL 2: FUNCTION RETURN ARRAY BILANGAN GENAP DAN GANJIL
const input = [1, 12, 23, 34, 45, 56, 67, 78, 89, 90]

function pisahGanjilGenap(...bilangan) {
    return bilangan.reduce((hasil, angka) => {
        if (angka % 2 === 0) {
            hasil.arrayBilanganGenap.push(angka);
        } else {
            hasil.arrayBilanganGanjil.push(angka);
        }
        return hasil;
    }, {arrayBilanganGenap: [], arrayBilanganGanjil: []});
}
console.log(pisahGanjilGenap(...input));

// SOAL 3: MANIPULASI ARRAY OF OBJECT
const arrayObjectSiswa = [
    { id: 1100, nama: "Budi", jurusan: "Sistem Komputer", nilaiNilai: [80, 90, 75] },
    { id: 1210, nama: "Siti", jurusan: "Teknik Informatika", nilaiNilai: [90, 100, 67] },
    { id: 1232, nama: "Andi", jurusan: "Sistem Informasi", nilaiNilai: [78, 80, 100] },
    { id: 4324, nama: "Dewi", jurusan: "Teknik Komputer", nilaiNilai: [88, 60, 50] },
    { id: 5612, nama: "Rina", jurusan: "Sistem Komputer", nilaiNilai: [92, 75, 78] },
    { id: 1645, nama: "Joko", jurusan: "Teknik Informatika", nilaiNilai: [80, 60, 90] },
    { id: 972, nama: "Sari", jurusan: "Sistem Informasi", nilaiNilai: [95, 100, 100] }
];

function filterSiswaGood(siswa) {
    return siswa.map((dataSiswa) => {
        const totalNilai = dataSiswa.nilaiNilai.reduce((total, nilai) => total + nilai, 0);
        const rataRataNilai = totalNilai / dataSiswa.nilaiNilai.length

        return {...dataSiswa, nama: dataSiswa.nama.toUpperCase(), rataRataNilai};

    }).filter((dataSiswa) => dataSiswa.rataRataNilai > 85).sort((a, b) => b.id - a.id);
}

console.log(filterSiswaGood(arrayObjectSiswa));

// SOAL 4: MANIPULASI ARRAY MENGGUNAKAN LODASH
const people = [
  { name: 'Joko', age: 30, nationality: 'Indonesia' },
  { name: 'Ridwan Hanif', age: 40, nationality: 'Malaysia' },
  { name: 'Angelina Christie', age: 30, nationality: 'Indonesia' },
  { name: 'Songpatakot', age: 40, nationality: 'Thailand' },
  { name: 'Ryu Osaki', age: 50, nationality: 'Japan' },
  { name: 'Frank Ocean', age: 30, nationality: 'Canada' },
  { name: 'Grace Liu', age: 50, nationality: 'Singapore' },
  { name: 'Hadi Kurniawan', age: 40, nationality: 'Indonesia' },
  { name: 'Ivan', age: 30, nationality: 'Indonesia' },
  { name: 'Abdullah Judy', age: 60, nationality: 'Malaysia' }
];

const _ = require('lodash');

const pekerjaDibawah35 = _.filter(people, (orang) => orang.age < 35)
const asalPekerja = _.groupBy(pekerjaDibawah35, 'nationality')
// const urutPekerja = _.sortBy(people, ["name"]) 

console.log(pekerjaDibawah35);
console.log(asalPekerja);
// console.log(urutPekerja);