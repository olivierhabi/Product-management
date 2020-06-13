import database from "../models";

class ProductService {
  static async addProduct(product, next) {
    try {
      return await database.Product.create(product);
    } catch (error) {
      throw error;
    }
    next();
  }
}

export default ProductService;
