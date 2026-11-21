// SOAL 1 (EASY): hargaSatuan 15000, jumlah = 4, hitung total, make tempalte literal, vaiabel boolean gratisOngkir, true jika total lebih dari 50000
const hargaSatuan = 15000
const jumlah = 4
const gratisOngkir = hargaSatuan * jumlah > 50000
console.log(`Total belanja: Rp ${hargaSatuan * jumlah}`);
console.log(`Gratis Ongkir: ${gratisOngkir}`);

// SOAL 2 (EASY): umur punyaKTP (boolean), variabel bolehDaftar true jika umur minimal 17  dan punya KTP
const umur = 5
const punyaKTP = true
const bolehDaftar = umur >= 17 && punyaKTP
console.log(bolehDaftar);

// SOAL 3 (MEDEASY):
const sapa = (nama) => {
    // const hasil = nama ?? "Tamu"
    // console.log(`Halo, ${hasil}!`);
    console.log(`Halo, ${nama ?? 'Tamu'}!`);
}
sapa("Dek")
sapa(null)
sapa(undefined)

// SOAL 4 (MEDIUM) bagi dari detik ke jam, menit, dan detik
const formatDurasi = (totalDetik) => {
    const jam = Math.floor(totalDetik / 3600)
    const menit = Math.floor(totalDetik % 3600 / 60)
    const detik = totalDetik % 60
    console.log(`${jam} Jam ${menit} Menit ${detik} Detik`);
}
formatDurasi(60)
formatDurasi(200)
formatDurasi(3670)

// SOAL 6 (SKIP NO 5) (HARDEST) cek tahun kabisat atau engga (output true/false)
const cekTahunKabisat = (tahun) => {
    console.log((tahun % 4 == 0 && tahun % 100 > 0) || tahun % 400 == 0);
}
cekTahunKabisat(1900)
cekTahunKabisat(2024)
cekTahunKabisat(2000)