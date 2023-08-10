class Person{
    constructor(name, age, address) {
        this.name = name;
        this.age   = age;
        this.address  = address;
    }

    descripction(){
        return "Name: "+this.name+"\tage: "+this.age+"\tAddress: "+this.address
    }
}

let rta = ""
let listOfPeople = ""
do{

    let name = prompt("Insert your name:")
    let age = Number(prompt("Insert your age:"))
    let address = prompt("Insert your address:")

    let object_person = new Person(name, age, address)

    listOfPeople = listOfPeople + object_person.descripction() + "\n"

    alert(listOfPeople)

    rta = prompt("Do you want to insert another user? (Write 'ESC' to log out)")
}while (rta != 'ESC')


class Product{
    constructor(id,name,price){
        this.id = id
        this.name = name
        this.price = price
        this.quantity = 1
    }
}

const listOfProducts = []
const cart = []
let productsDescription = ""

listOfProducts.push(new Product(1,"iPad",250))
listOfProducts.push(new Product(2,"iPhone",350))
listOfProducts.push(new Product(3,"iMac", 250))
listOfProducts.push(new Product(4,"AirPods", 300))
listOfProducts.push(new Product(5,"AirPods Pro", 500))

console.log("If you wanna select a product, insert the product's ID")

//mostrarla
for (const object of listOfProducts) {
    productsDescription = productsDescription + "id: "+object.id+"\nProducto: "+object.name+"\nPrecio: $"+object.price+"\n"
}

let id = prompt(productsDescription + "\n" + "Insert the product's ID")

for (let i = 0; i < listOfProducts.length; i++) {
    
    let object = listOfProducts[i]

    if(id == object.id){
        cart.push(object)
        let quantity = Number(prompt("Insert the quantity of how many products you want"))
        object.quantity = quantity
    }
}
console.log(cart)