import fs from 'fs';
import { productManager } from "../productManager/index.js";

export class CartManagerFileSystem {
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

  async getCart() {
    try {
      const response = await fs.promises.readFile(this.path, 'utf-8');
      return JSON.parse(response);
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(id) {
    const carts = await this.getCart();

    const cartFound = carts.find((cart) => cart.id === id);
    return cartFound;
  }

  async createCart() {
    const newCart = {
      products: [],
    };

    const carts = await this.getCart();

    newCart.id = !carts.length ? 1 : carts[carts.length - 1].id + 1;

    carts.push(newCart);

    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));

    return newCart;
  }

  async addProductToCart(cid, pid) {
    const carts = await this.getCart();
    const products = await productManager.getProducts();

    const cartFound = carts.find((cart) => cart.id === cid);
    const productFound = products.find((product) => product.id === pid);

    if (!cartFound) {
      throw new Error('Cart not found');
    }

    if (!productFound) {
      throw new Error('Product not found');
    }

    const productInCart = cartFound.products.find((product) => product.id === pid);

    if (productInCart) {
      productInCart.quantity++;
    } else {
      cartFound.products.push({ id: pid, quantity: 1 });
    }

    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));

    return cartFound;
  }

}
