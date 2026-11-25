// CLASS
class Mahasiswa {
    constructor(nama, jurusan, ...hobi) {
        this.nama = nama
        this.jurusan = jurusan
        this.hobi = [...hobi].join(", ")
    }

    perkenalan() {
        return `Halo, saya ${this.nama} dari ${this.jurusan}, hobi saya adalah ${this.hobi}`
    }
}

const mhs1 = new Mahasiswa("Gibran", "Tadi", "Kritik Pemerintah", "Ga ngapa-ngapain", "Main PUBG")
// console.log(mhs1.perkenalan());

// STATIC
class MathHelper {
    static tambah(a, b) {
        return a + b
    }
    static PI = 3.14159
}

// console.log(MathHelper.tambah(3, 5));
// console.log(MathHelper.PI);

// PRIVATE FIELD
class Rekening {
    #saldo = 0  // Private field

    deposit(jumlah) {
        if (jumlah > 0) this.#saldo += jumlah
        console.log(`Saldo Anda: ${jumlah}`);
    }

    tarik(jumlah) {
        if (jumlah <= this.#saldo) {
            this.#saldo -= jumlah
            console.log(`Jumlah penarikan: ${jumlah}`);

        }
        else console.log("Saldo tidak cukup");
    }
    get saldo() {
        return (`Sisa saldo Anda: ${this.#saldo}`)
    }
}

const rek = new Rekening()
// rek.deposit(500000)
// rek.tarik(200000)
// console.log(rek.saldo)
// console.log(rek.#saldo);

// PRIVATE GETTER SETTER
class Presiden {
    #nama
    constructor(nama, urutan) {
        this.nama = nama
        this.urutan = urutan
    }

    get nama() {
        return `${this.#nama} adalah presidenmu yang ke-${this.urutan}`
    }

    set nama(isi) {
        if (isi !== "Prabowo") throw new Error("LU SIAPEE!?!?")
        this.#nama = isi
    }
}

// const wowok = new Presiden("Prabowo", Infinity)
// console.log(wowok.nama);
// const seskab = new Presiden("Teddy", 69)
// console.log(seskab.nama);

// INHERITANCE (extends & super)
class Raja {
    constructor(nama, panggilan) {
        this.nama = nama
        this.panggilan = panggilan
    }
    bersuara() {
        return `PRABOWO: "${this.nama} tolongin aku dong ${this.panggilan}`
    }
}

class Selir extends Raja {                       // extend dari class Raja
    constructor(nama, ...status) {
        super(nama, "sayang")                   // menggunakan super, lgsg mengisi (panggilan) dari raja menggunakan "sayang"      
        this.status = [...status].join(", ")
    }
    info() {
        return `${this.bersuara()}. Aku lagi ${this.status}"`
    }
}

const pres = new Selir("Teddy", "gaenak badan", "mules", "sariawan")
// console.log(pres.info());

// POLYMORPHISM
class Shape {
    hitungLuas() { return 0 }
}
class Persegi extends Shape {
    constructor(sisi) { super(); this.sisi = sisi }
    hitungLuas() { return this.sisi * 2 }
}
class Lingkaran extends Shape {
    constructor(r) { super(); this.r = r }
    hitungLuas() { return Math.PI * this.r ** 2 }
}
class Segitiga extends Shape {
    constructor(alas, tinggi) { super(); this.alas = alas, this.tinggi = tinggi }
    hitungLuas() { return 0.5 * this.alas * this.tinggi }
}

const shapes = [new Persegi(4), new Lingkaran(3), new Segitiga(6, 5)]
shapes.forEach(s => console.log(`Luas: ${s.hitungLuas().toFixed(2)}`))