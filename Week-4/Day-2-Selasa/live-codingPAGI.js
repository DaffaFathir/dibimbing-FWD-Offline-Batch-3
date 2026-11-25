function unique_letters(text) {
    let hurufKecil = text.toLowerCase();
    let hanyaHuruf = hurufKecil.match(/[a-z]/g) || [];
    let urut = hanyaHuruf.sort();
    const apusSama = new Set(urut);

    return [...apusSama].join("");
}
console.log(unique_letters("Programming"));

// function unique_letters(text) {
//     let set = new Set()

//     text = text.toLowerCase()

//     for (let i = 0; i < text.length; i++) {
//         if (text[i] >= "a" && text[i] <= "z") {
//             set.add(text[i])
//         }
//     }

//     let array = Array.from(set)

//     return array.sort().join("")
// }

// console.log(unique_letters("Programming"));