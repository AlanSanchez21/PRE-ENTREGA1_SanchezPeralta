class Product{
    constructor(id,name,price){
        this.id = id
        this.name = name
        this.price = price
        this.quantity = 0
    }

    addQuantity(quantityWanted){
        this.quantity = this.quantity + quantityWanted

    }

    description(){
        return "id: "+this.id+ " name: "+this.name+ " price: $"+this.price+"\n"
    }

    cartDescription(){
        return "id: "+this.id+ " name: "+this.name+ " price: $"+this.price+ " quantity: "+this.quantity+"\n"
    }
}

class Cart{
    constructor(){
        this.listCart = []
    }

    add(newProduct){
        let exist = this.listCart.some(product => product.id == newProduct.id)
        if(!exist){
            this.listCart.push(newProduct)
        }
    }

    show(){
        let shoppingListDescription = "Cart: \n\n"
        this.listCart.forEach( product => {
            shoppingListDescription = shoppingListDescription + product.cartDescription()
        })
        return shoppingListDescription
    }

    calculateTotal(){
        return this.listCart.reduce( (total,product) => total + product.price * product.quantity ,0)
    }
}

class ProductController{
    constructor(){
        this.listProduct = []
    }

    add(product){
        this.listProduct.push(product)
    }

    show(){
        let productListDescription = "Remember the Product's ID that you want\n\n"
        this.listProduct.forEach( product => {
            productListDescription = productListDescription + product.description()
        })
        return productListDescription
    }

    searchId(id){
        return this.listProduct.find(product => product.id == id)
    }
}

const p1 = new Product(1,"iPad",250)
const p2 = new Product(2,"iPhone",250)
const p3 = new Product(3,"MacBook",400)
const p4 = new Product(4,"AirPods",150)
const p5 = new Product(5,"AirPods Pro",200)

const cart = new Cart()
const prodController = new ProductController()

prodController.add(p1)
prodController.add(p2)
prodController.add(p3)
prodController.add(p4)
prodController.add(p5)

let rta

do{
    alert( prodController.show() )
    let id = Number(prompt("Insert the Product's ID!"))
    const product = prodController.searchId(id)
    let quantityWanted = Number(prompt("Insert how many of this product you want"))
    product.addQuantity(quantityWanted)
    cart.add(product)
    alert( cart.show() )


    rta = prompt("¿Are you done buying? (write 'Yes' if you're done buying)").toLowerCase()
}while(rta != "yes")

//show total
alert( "The total price is: $"+cart.calculateTotal() )