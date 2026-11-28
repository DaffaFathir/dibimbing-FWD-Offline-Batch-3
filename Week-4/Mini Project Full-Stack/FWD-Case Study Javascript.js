// STRING & NUMBER

// Soal 1: Balik Kata
const reverseWords = (sentence) => {
    let arr = sentence.trim().split(/\s+/);
    let tampung = []

    for (let i = 0; i < arr.length; i++) {
        tampung.unshift(arr[i])
    }
    return tampung.join(" ")
}
// console.log(reverseWords("     halo    pak cik      gimana  kabarnya "));

// Soal 2: Cek Palindrome
const isPalindrome = (str) => {

}

// Soal 3: Format Angka ke Rupiah
const toRupiah = (amount) => {
    const arr = String(Math.round(Math.abs(amount))).split("")
    let tampung = []

    for (let i = 0; i < arr.length; i++) {
        tampung += arr[i]
        if ((arr.length - i - 1) % 3 === 0 && i !== arr.length - 1) {
            tampung += "."
        }
    }
    return `Rp${tampung}`
}
// console.log(toRupiah(150000.56));

// Soal 4: Hitung Frekuensi Kata
const wordCount = (text) => {

}

// Soal 5: FizzBuzzPlus
const fizzBuzzPlus = (n) => {
    let arr = []

    for (let i = 1; i <= n; i++) {
        arr.push(i)
    }

    for (let j = 0; j < arr.length; j++) {
        if (arr[j] % 105 === 0) {
            arr[j] = "FizzBuzzPlus"
        } else if (arr[j] % 15 === 0) {
            arr[j] = "FizzBuzz"
        } else if (arr[j] % 3 === 0) {
            arr[j] = "Fizz"
        } else if (arr[j] % 5 === 0) {
            arr[j] = "Buzz"
        } else if (arr[j] % 7 === 0) {
            arr[j] = "Plus"
        }
    }
    return arr
}
// console.log(fizzBuzzPlus(50));

// ARRAY & OBJECT

// Soal 6: Flatten Array
const flattenArray = (arr) => {

}

// Soal 7: Group By
const group = (arr, key) => {

}

// CLASS & OOP

// Soal 8: Calculator dengan Method Chaining
class Calculator {

}