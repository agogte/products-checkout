class Product{
    id: number;
    priceInCents: number;
    name: string;

    constructor(id: number, priceInCents: number, name: string){
        this.id = id;
        this.priceInCents = priceInCents;
        this.name = name;
    }
}

const products = new Map<number, Product>();

let nextId: number = 0;

function addProduct(name: string, princeInCents: number){
    let id = ++nextId;
    products.set(id, new Product(id, princeInCents, name));
}

addProduct("Aura", 100);

export default products;