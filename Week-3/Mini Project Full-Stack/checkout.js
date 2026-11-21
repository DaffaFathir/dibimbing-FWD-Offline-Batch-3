// INPUT
const hargaProduk = 50000
const jumlahProduk = 5
const statusMember = true

// PROSES
function hitungCheckout(hargaProduk, jumlahProduk, statusMember) {
    const inputValid = hargaProduk > 0 && Number.isInteger(jumlahProduk) && jumlahProduk > 0

    const subtotal = hargaProduk * jumlahProduk
    const diskon = subtotal * 0.1 * statusMember
    const totalSetelahDiskon = subtotal - diskon
    const ongkosKirim = 15000 * (totalSetelahDiskon < 250000)
    const totalBayar = totalSetelahDiskon + ongkosKirim

    const hasilOutput = (inputValid && `Subtotal: Rp${subtotal.toLocaleString("id-ID")}\nDiskon: Rp${diskon.toLocaleString("id-ID")}\nOngkir: Rp${ongkosKirim.toLocaleString("id-ID")}\nTotal bayar: Rp${totalBayar.toLocaleString("id-ID")}`) || "Input tidak valid"    
    // const hasilOutput = (inputValid && `Subtotal: ${subtotal}\nDiskon: ${diskon}\nOngkos Kirim: ${ongkosKirim}\nTotal bayar: ${totalBayar}`)
    return hasilOutput
}

// OUTPUT
console.log(hitungCheckout(hargaProduk, jumlahProduk, statusMember))