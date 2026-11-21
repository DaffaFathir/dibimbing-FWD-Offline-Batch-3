START
    INPUT hargaProduk
        IF (hargaProduk berupa angka positif)
            hargaProduk = (input)
            return hargaProduk
        ELSE
            Tampilkan "Input tidak valid"

    INPUT jumlahProduk
        IF (jumalhProduk berupa bilangan bulat positif)
            jumlahProduk = (input)
            return jumlahProduk
        ELSE
            Tampilkan "Input tidak valid"

    SUM subtotal
        subtotal = hargaProduk x jumlahProduk

    INPUT statusMember
        IF (statusMember == True)
            diskon = subtotal x 10%
        ELSE
            diskon = 0
        totalSetelahDiskon = subtotal - diskon

    SUM ongkosKirim
        IF (totalSetelahDiskon >= 250.000)
            ongkosKirim = 0
        ELSE
            ongkosKirim = 15.000

    SUM totalBayar
        totalSetelahDiskon + ongkosKirim

    OUTPUT
        - subtotal
        - diskon
        - ongkosKirim
        - totalBayar
END