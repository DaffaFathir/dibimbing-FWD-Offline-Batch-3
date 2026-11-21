PROBLEM DECOMPOSITION

    A. Elemen-elemen penting        
        1. Harga Produk
        2. Jumlah Produk
        3. Status Member
        4. Hitung Subtotal
        5. Hitung Diskon
        6. Hitung Ongkos Kirim
        7. Total Bayar

    B. Input
        Terdapat 3 variabel input yaitu: 
        1. hargaProduk (harus berupa angka positif)
        2. jumlahProduk (harus berupa bilangan bulat positif). 
        Apabila ketentuan input tidak terpenuhi, maka program menampilkan pesan input tidak valid dan tidak melanjutkan perhitungan. 
        3. statusMember bernilai boolean (true/false)

    C. Proses
        Terdapat 4 proses utama, diantaranya :
        1. Menghitung subtotal, didapatkan dengan perhitungan sebagai berikut:
            - subtotal = hargaProduk x jumlahProduk

        2. Menentukan diskon, didapatkan dengan memvalidasi apakah user adalah member dari toko, jika member, maka akan mendapatkan diskon 10% dari subtotal, jika tidak, maka tidak mendapatkan diskon. Perhitungan diskon dibedakan menjadi 2, yaitu :
            - Jika member: diskon = subtotal × 10%
            - Jika bukan member: diskon = 0

        3. Menghitung total setelah diskon, dengan menggunakan rumus sebagai berikut:
            - totalSetelahDiskkon = subtotal - diskon

        4. Menghitung Ongkos Kirim, untuk perhitungannya sebagai berikut:
            - Jika totalSetelahDiskon ≥ Rp250.000: ongkosKirim = Rp0
            - Jika totalSetelahDiskon < Rp250.000: ongkosKirim = Rp15.000

        5. Menghitung total bayar, didapatkan dengan perhitungan sebagai berikut:
            - totalBayar = totalSetelahDiskon + ongkosKirim

    D. Output
        Output dari sistem adalah totalBayar

    E. Pattern Recognition (Pengenalan Pola)
        1. Input harus divalidasi sebelum perhitungan dilakukan.
        2. Subtotal selalu dihitung dari harga produk dikali jumlah produk.
        3. Status member selalu menentukan diskon:
            - Member mendapat diskon 10%
            - Non-member tidak mendapat diskon
        4. Ongkos kirim ditentukan dari total setelah diskon: 
            - Gratis jika minimal Rp250.000
            - Rp15.000 jika kurang dari Rp250.000

    F. Abstraction
        1. Perhitungan hanya berfokus pada harga produk, jumlah produk, dan status member.
        2. Detail lain seperti nama produk tidak digunakan dalam perhitungan.
        3. Hasil utama yang dibutuhkan adalah:
            - subtotal
            - diskon
            - ongkos kirim 
            - total bayar
            Keempat poin tersebut dapat ditampilkan sebagai rincian.