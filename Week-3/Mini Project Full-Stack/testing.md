Berikut adalah 8 skenario pengujian beserta hasilnya:

A. Member
    - Input:
        1. hargaProduk = 100000
        2. jumlahProduk = 3
        3. statusMember = true
    - OuTput:
        1. Subtotal = 300000
        2. Diskon = 30000
        3. Ongkir = 0
        4. Total bayar = 270000

    Output yang diharapkan adalah 270000, dikarenakan input statusMember adalah true, kemudian dengan subtotal 300000, maka user mendapatkan diskon 10% dengan nominal diskon 30000,, kemudian berhubung total setelah diskon user memenuhi syarat minimal gratis ongkir yaitu belanja 250000, maka ongkos kirim gratis alisa 0.
    
B. Non-member
    - Input:
        1. hargaProduk = 100000
        2. jumlahProduk = 3
        3. statusMember = false
    - Output:
        1. Subtotal = 300000
        2. Diskon = 0
        3. Ongkir = 0
        4. Total bayar = 300000

    Output yang diharapkan adalah 300000, dikarenakan input statusMember adalah false, kemudian dengan subtotal 300000, maka user tidak mendapatkan diskon, kemudian berhubung total setelah diskon user memenuhi syarat minimal gratis ongkir yaitu belanja 250000, maka ongkos kirim gratis alisa 0.

C. totalBayar < Rp250.000
    - Input:
        1. hargaProduk = 70000
        2. jumlahProduk = 3
        3. statusMember = false
    - Output:
        1. Subtotal = 210000
        2. Diskon = 0
        3. Ongkir = 15000
        4. Total bayar = 225000

    Output yang diharapkan adalah 225000, dikarenakan input statusMember adalah false, maka user tidak mendapatkan diskon, kemudian berhubung total setelah diskon user tidak memenuhi syarat minimal gratis ongkir yaitu belanja 250000, maka dikenakan ongkos kirim sebesar 15000.
    
D. totalBayar = Rp250.000
    - Input:
        1. hargaProduk = 50000
        2. jumlahProduk = 5
        3. statusMember = false
    - Output:
        1. Subtotal = 250000
        2. Diskon = 0
        3. Ongkir = 0
        4. Total bayar = 250000

    Output yang diharapkan adalah 250000, dikarenakan input statusMember adalah false, maka user tidak mendapatkan diskon, kemudian berhubung total setelah diskon user memenuhi syarat minimal gratis ongkir yaitu belanja 250000, maka user mendapatan gratis ongkir.

E. totalBayar > Rp250.000
    - Input:
        1. hargaProduk = 60000
        2. jumlahProduk = 5
        3. statusMember = false
    - Output:
        1. Subtotal = 300000
        2. Diskon = 0
        3. Ongkir = 0
        4. Total bayar = 300000
        
    Output yang diharapkan adalah 300000, dikarenakan input statusMember adalah false, maka user tidak mendapatkan diskon, kemudian berhubung total setelah diskon user memenuhi syarat minimal gratis ongkir yaitu belanja 250000, maka user mendapatkan gratis ongkir.

F. jumlahProduk = 0
    - Input:
        1. hargaProduk = 60000
        2. jumlahProduk = 0
        3. statusMember = false
    - Output:
        Input tidak valid
    
    Output yang diharapkan adalah "Input tidak valid", dikarenakan input jumlahProduk tidak memenuhi persyaratan yaitu input harus berupa bilangan bulat positif, sedangkan inputnya disini adalah 0 (tidak lebih dari 0).

G. jumlahProduk adalah pecahan
    - Input:
        1. hargaProduk = 60000
        2. jumlahProduk = 3/5
        3. statusMember = false
    - Output:
        Input tidak valid

    Output yang diharapkan adalah "Input tidak valid", dikarenakan input jumlahProduk tidak memenuhi persyaratan yaitu input harus berupa bilangan bulat positif, sedangkan inputnya disini adalah 3/5 (pecahan).
    
H. hargaProduk tidak valid
    - Input:
        1. hargaProduk = 60000
        2. jumlahProduk = 3/5
        3. statusMember = false
    - Output:
        Input tidak valid
    
    Output yang diharapkan adalah "Input tidak valid", dikarenakan input hargaProduk tidak memenuhi persyaratan yaitu input harus berupa angka positif, sedangkan inputnya disini adalah 0.

I. statusMember tidak valid
    - Input:
        1. hargaProduk = 60000
        2. jumlahProduk = 3
        3. statusMember = 1
    - Output:
        Input tidak valid
    
    Output yang diharapkan adalah "Input tidak valid", dikarenakan input statusMember tidak memenuhi persyaratan yaitu input harus berupa boolean (true/false), sedangkan inputnya disini adalah 1.