/*class Profile{
    constructor(username, name, lastName, email) {
        this.username = username;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
    }

    descriptionProfile(){
        return "Username: "+this.username+"\tName: "+this.name+"\tLastname: "+this.lastName+"\tEmail: "+this.email 
    }
}

let rta = ""
let listOfProfiles = ""
do{
    let username = prompt("Insert your username: ")
    let name = prompt("Insert your name: ")
    let lastName = prompt("Insert your lastname: ")
    let email = prompt("Insert your email: ")

    let object_profile = new Profile(username, name, lastName, email)

    listOfProfiles = listOfProfiles + object_profile.descriptionProfile()+"\n"

    alert(listOfProfiles)
    rta = prompt("Do you wish to add another user? (Write 'ESC' to log out)")
}while(rta != 'ESC')
*/

class Product {
    constructor(id, name, price, description, img, alt, quantity = 1) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.quantity = quantity;
        this.img = img;
        this.alt = alt;
    }

    increaseQuantity() {
        this.quantity++
    }

    decreaseQuantity() {
        if (this.quantity > 1) {
            this.quantity--
        }
    }

    descriptionCart() {
        return 
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${this.img}" class="img-fluid rounded-start" alt="${this.alt}"></img>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${this.name}</h5>
                        <p class="card-text">Cantidad:
                        <button class="btn btn-dark" id="disminuir-${this.id}"><i class="fa-solid fa-minus"></i></button>
                        ${this.quantity}
                        <button class="btn btn-dark" id="aumentar-${this.id}"><i class="fa-solid fa-plus"></i></button>
                        </p>
                        <p class="card-text">Precio: $${this.price}</p>
                        <button class="btn btn-danger" id="ep-${this.id}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    }

    descriptionProduct() {
        return 
        <div class="card border-light" style="width: 18rem;">
            <img src="${this.img}" class="card-img-top" alt="${this.alt}"></img>
            <div class="card-body">
                <h5 class="card-title">${this.name}</h5>
                <p class="card-text">${this.description}</p>
                <p class="card-text">$${this.price}</p>
                <button class="btn btn-primary" id="ap-${this.id}">Añadir al cart</button>
            </div>
        </div>
    }
}

class ProductoController {
    constructor() {
        this.listOfProducts = []
    }

    add(product) {
        if (product instanceof Product) {
            this.listOfProducts.push(product)
        }
    }

    loadProducts() {
        this.add(new Product(1, "Black Swimsuit 'Bae Watch'", 25, "S'Bae Watch' Letter at the front", "https://images.unsplash.com/photo-1521920810064-3ba9506540fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=780&q=80", "Swimsuit"))
        this.add(new Product(2, "Black Hoodie", 27, "Black Hoodie back letters", "https://images.unsplash.com/photo-1633292503304-db2544550af0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80", "Hoodie"))
        this.add(new Product(3, "Black and White Tennis", 25, "Formal Shoes", "https://images.unsplash.com/photo-1563183222-ff776d1076e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80", "Shoes"))
        this.add(new Product(4, "Yellow Swimsuit", 30, "Yellow", "https://images.unsplash.com/photo-1592816348552-0f10135a5458?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80", "Swimsuit"))
        this.add(new Product(5, "White Coat", 25, "White Long Sleeve", "https://images.unsplash.com/photo-1607400444237-d733f38221a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80", "Coat"))
    }

    showDOM() {
        let product_container = document.getElementById("product_container")

        product_container.innerHTML = ""

        this.listOfProducts.forEach(product => {
            product_container.innerHTML += product.descriptionProduct()
        })

        this.listOfProducts.forEach(product => {
            const btn_ap = document.getElementById(`ap-${product.id}`)

            btn_ap.addEventListener("click", () => {
                cart.add(product)
                cart.saveInStorage()
                cart.showDOM()
            })
        })
    }
}

class Cart {
    constructor() {
        this.listCart = []
    }

    add(addProduct) {

        let exist = this.listCart.some(product => product.id == addProduct.id)

        if (exist) {
            let product = this.listCart.find(product => product.id == addProduct.id)
            product.increaseQuantity()
        } else {
            if (addProduct instanceof Product) {
                this.listCart.push(addProduct)
            }
        }
    }

    delete(deleteProduct) {
        let indice = this.listCart.findIndex(product => product.id == deleteProduct.id)
        this.listCart.splice(indice, 1)
    }

    saveInStorage() {
        let listCartJSON = JSON.stringify(this.listCart)
        localStorage.setItem("listCart", listCartJSON)
    }

    recuperarStorage() {
        let listCartJSON = localStorage.getItem("listCart")
        let listCartJS = JSON.parse(listCartJSON)
        let listAUX = []
        listCartJS.forEach(product => {
            let newProduct = new Product(product.id, product.name, product.price, product.description, product.img, product.alt, product.quantity)
            listAUX.push(newProduct)
        })
        this.listCart = listAUX
    }

    showDOM() {
        let container_cart = document.getElementById("container_cart")
        container_cart.innerHTML = ""
        this.listCart.forEach(product => {
            container_cart.innerHTML += product.descriptionCart
                ();
        })

        this.deleteEvent()
        this.addQuantityEvent()
        this.decreaseQuantityEvent()
        this.showTotal()
    }

    deleteEvent() {
        this.listCart.forEach(product => {
            const btn_eliminar = document.getElementById(`ep-${product.id}`)
            btn_eliminar.addEventListener("click", () => {
                this.delete(product)
                this.saveInStorage()
                this.showDOM()
            })
        })
    }

    addQuantityEvent() {
        this.listCart.forEach(product => {
            const btn_aumentar = document.getElementById(`aumentar-${product.id}`)
            btn_aumentar.addEventListener("click", () => {
                product.increaseQuantity()
                this.showDOM()
            })
        })
    }

    decreaseQuantityEvent() {
        this.listCart.forEach(product => {
            const btn_disminuir = document.getElementById(`disminuir-${product.id}`)
            btn_disminuir.addEventListener("click", () => {
                product.decreaseQuantity()
                this.showDOM()
            })
        })
    }

    calcularTotal() {
        return this.listCart.reduce((acumulador, product) => acumulador + product.price * product.quantity, 0)
    }
    showTotal() {
        const precio_total = document.getElementById("precio_total")
        precio_total.innerText = `Precio Total: $${this.calcularTotal()}`
    }
}

const CP = new ProductoController()
const cart = new Cart()

cart.recuperarStorage()
cart.showDOM()

CP.loadProducts()
CP.showDOM()
