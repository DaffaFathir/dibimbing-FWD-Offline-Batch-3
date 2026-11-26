const skor = ["1:0", "2:0", "3:0", "4:0", "2:1", "3:1", "4:1", "3:2", "4:2", "4:3"]

function points(games) {
    const score = games.map(item => {
        if (+item[0] > +item[2]) return 3
        if (+item[0] == +item[2]) return 1
        return 0
    })
    return score.reduce((acc, value) => acc + value, 0)
}
console.log(points(skor));

// // const a = games.at(0)
// // const x = Number(a[0])
// // const y = Number(a[2])
// const pertama = +skor.at(0)
// const kedua = skor.at(0)
// console.log(typeof pertama);
// console.log(typeof kedua);

// function points(games) {
//     let tampung = 0
//     for (let i = 0; i < games.length; i++) {
//         let a = games.at(i)
//         let x = Number(a[0])
//         let y = Number(a[2])

//         if (x > y) {tampung += 3}
//         else if (x < y) {tampung += 0}
//         else {tampung += 1}
//     }
//     return tampung
// }

// console.log(points(skor))