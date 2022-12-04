import fs from "fs";

export class ProductManagerFileSystem {
  constructor(path) {
    this.path = path;
    this.#init();
  }

  #init() {
    try {
      const existFile = fs.existsSync(this.path);
      if (existFile) return;

      fs.writeFileSync(this.path, JSON.stringify([]));
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      const response = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(response);
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    const products = await this.getProducts()

    const productFound = products.find((product) => product.id === id)
    return productFound
  }

async addProduct({ title, description, price, thumbnail, stock, code }) {
      const newProduct = {
        title,
        description,
        price,
        thumbnail,
        stock,
        code,
      }

      const products = await this.getProducts();

      const codeDuplicated = products.some(product => product.code === code)
      if (codeDuplicated) {
        throw new Error("The code already exists")
      }

      newProduct.id = !products.length ? 1 : products[products.length - 1].id + 1;


      products.push(newProduct);

      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

      return newProduct;
  }

  async updateProduct(id, updatedInfo) {

    const products = await this.getProducts()

    const productIndex = products.findIndex(product => product.id === id)

    if(productIndex === -1) {
      throw new Error("The product doesn't exist")
    }

    const product = products[productIndex]

    products[productIndex] = {...product, ...updatedInfo}

    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))

    return products[productIndex]
  }
}

