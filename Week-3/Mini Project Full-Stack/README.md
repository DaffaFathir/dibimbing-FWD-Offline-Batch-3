# Program Checkout Produk

## Deskripsi Case Study

Program ini menghitung total pembayaran pelanggan berdasarkan harga produk, jumlah produk, dan status keanggotaan. Member mendapat diskon 10% dari subtotal. Ongkos kirim gratis jika total setelah diskon minimal Rp250.000; jika kurang, ongkos kirim sebesar Rp15.000.

Program menampilkan subtotal, diskon, ongkos kirim, dan total bayar. Nilai input diatur secara manual pada variabel di bagian atas [checkout.js].

## Cara Menjalankan Program

1. Pastikan Node.js sudah terpasang.
2. Buka `checkout.js` dan atur nilai input secara manual, contoh:
   ```js
   const hargaProduk = 50000;
   const jumlahProduk = 5;
   const statusMember = true;
2. Buka terminal di folder proyek.
3. Jalankan perintah:
   ```bash
   node checkout.js

## Penggunaan AI

Penggunaan AI mencakup hal berikut:

1. "Number.isInteger(x)", digunakan untuk memastikan bahwa nilai jumlahProduk adalah bilangan bulat.
2. Penggunaan method 'toLocaleString("id-ID")', digunaka untuk memformat nilai agar tampil sesuai aturan bahasa atau wilayah (pada kasus ini wilayah yang saya terapkan adalah Indonesia). Contohnya, angka "50000" akan ditampilkan sebagai "50.000" dengan pemisah ribuan berupa titik.