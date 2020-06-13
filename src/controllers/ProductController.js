import ProductService from "../services/ProductService";

class ProductController {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} user object
   */
  static async Create(req, res) {
    const { name, description } = req.body;

    try {
      const createProduct = await ProductService.addProduct({
        name,
        description,
      });
      return res.status(201).send({
        status: 201,
        message: "Product created successfull",
        data: createProduct,
      });
    } catch (error) {}

    try {
    } catch (error) {
      return res.status(500).send({ message: "SERVER_ERROR" });
    }
  }
}
export default ProductController;
