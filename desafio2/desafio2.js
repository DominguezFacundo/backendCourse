const fs = require("fs");

class productManager {
  constructor(path) {
    this.path = path;
    this.init();
  }

  init() {
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

  async addProduct({ title, description, price, thumbnail, stock, code }) {
    try {
      if (!title || !description || !price || !thumbnail || !stock || !code)
        return { error: "All fields are required" };

      const products = await this.getProducts();

      if (products.length > 0) {
        const productId = products[products.length - 1].id + 1;
        const newProduct = {
          id: productId,
          title,
          description,
          price,
          thumbnail,
          stock,
          code,
        }

        products.push(newProduct);

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

        return newProduct;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async uptadeProduct(id, updatedInfo) {
    if ((id, updatedInfo)) {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        let result = JSON.parse(data);
        const productFound = result.find((product) => product.id == id);
        if (productFound) {
          const productUpdates = result.map((product) => {
            if (product.id == id) {
              return { ...product, ...updatedInfo };
            }
            return product;
          });
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(productUpdates, null, 2)
          );
        } else {
          console.log("There isn't a product to update");
        }
      }
    }
  }


  async deleteProduct(id) {
    if (fs.existsSync(this.path)) {
      if (id) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        let result = JSON.parse(data);
        const deleteProduct = result.filter((prod) => prod.id != id);
        result = deleteProduct;
        await fs.promises.writeFile(this.path, JSON.stringify(result, null, 2));
      } else {
        console.log("Please insert the product ID that will be delete");
      }
    } else {
      console.log(
        "Can't delete objects since the database is empty"
      );
    }
  };
}

const newProduct = new productManager(
  "./productList.json"
);

/* const productTesting = async () => {
  const savingFirstProduct = await newProduct.addProduct({
    title: "Book One", 
    description: "The first Book", 
    price: 10, 
    thumbnail: "image",
    code: "code1",
    stock: 6
  });

  console.log({ savingFirstProduct });

  const items = await newProduct.getProducts();
  console.log("Products: ", items);

  const deleteThis = await newProduct.deleteProduct(1);
  console.log({ deleteThis });
};

productTesting();  */