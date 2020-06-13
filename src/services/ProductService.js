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
  static async getProduct(id, next) {
    try {
      return await database.Product.findOne({
        where: {
          id: id,
        },
      });
    } catch (error) {}
  }
  static async updateProduct(data, next) {
    const { name, description, id } = data;
    console.log(name, description, id);
    try {
      return await database.Product.update(
        {
          name: name,
          description: description,
        },
        { where: { id: id }, returning: true }
      );
    } catch (error) {
      throw error;
    }
  }
}

export default ProductService;
