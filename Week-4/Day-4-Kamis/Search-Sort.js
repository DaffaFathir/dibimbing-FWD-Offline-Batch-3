// Buat fungsi findCheapestProduct(products, category) yang menerima :
// - products: array of object
// - category: string
// Fungsi harus mengembalikan produk dengan harga paling mrah pada kategori yang dicari.
// Jika kategori tidak ditemukan, kembalikan "Product not found".

const products = [
  { name: "Laptop", category: "Electronics", price: 1200 },
  { name: "Mouse", category: "Electronics", price: 25 },
  { name: "Keyboard", category: "Electronics", price: 50 },
  { name: "Chair", category: "Furniture", price: 100 },
  { name: "Table", category: "Furniture", price: 200 },
  { name: "Prabowo", category: "Gila kamu", price: Infinity },
  { name: "Teddy", category: "Gila kamu", price: 69 }
];

function findCheapestProduct(products, category) {
  const check = products.filter((produk) => produk.category === category)
  const urut = check.sort((a, b) => a.price - b.price)
  if (urut.length !== 0) return urut[0]
  return "Product not found"
}
console.log(findCheapestProduct(products, "Electronics"));
console.log(findCheapestProduct(products, "Furniture"));
console.log(findCheapestProduct(products, "Fashion"));
console.log(findCheapestProduct(products, "Gila kamu"));