// TIPE DATA
const name = "Bayam Organik"   // string
const unit = 'Ikat'            // string
const price = 12000            // number
const weight = 0.25            // number

console.log(typeof name)            // string
console.log(typeof price)           // number
console.log(price * 3)              // 36000
console.log("12000" + 3)            // 120003
console.log(Number("12000") + 3)    // 12003

// BOOLEAN
console.log(5 === 5)
console.log(5 === "5")      // VALUE DAN TIPE DATA DI COMPARE
console.log(5 == "5")       // VALUE NYA AJA YANG DI COMPARE
console.log(3 !== 3)
console.log((3 !== "3"))

// GABUNG TEKS
const nama = "Bayam"
const harga = 12000
const msg = nama + " RP" + harga
const psn = `${nama} Rp${harga}`

console.log(msg)
console.log(psn)


// HITUNG TOTAL AKHIR
const prc = 3000
const qty = 4
const disc = 0.1
const total = (prc * qty) - ((prc * qty) * disc)

console.log(Math.pow(2,3));     // Math.(ada banyak), disini pow = power = pangkat
console.log("Total Rp" +total)

