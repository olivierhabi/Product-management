import ProductService from "../services/ProductService";

class ProductController {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} product object
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
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} product object
   */
  static async Update(req, res) {
    const { name, description } = req.body;
    const id = req.params.id;

    try {
      const product = await ProductService.getProduct(id);
      if (!product) {
        return res.status(404).send({
          status: 404,
          message: "Product not found",
        });
      }

      const update = await ProductService.updateProduct({
        name,
        description,
        id,
      });
      return res.status(200).send({
        status: 200,
        message: "Product updates successfull",
        data: update,
      });
    } catch (error) {
      return res.status(500).send({ message: "SERVER_ERROR" });
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} uproduct object
   */
  static async Delete(req, res) {
    const id = req.params.id;
    console.log(id);

    try {
      const product = await ProductService.getProduct(id);
      if (!product) {
        return res.status(404).send({
          status: 404,
          message: "Product not found",
        });
      }
      await ProductService.deleteProduct(id);

      return res.status(200).send({
        status: 200,
        message: "Product Deleted successfull",
      });
    } catch (error) {}

    try {
    } catch (error) {
      return res.status(500).send({ message: "SERVER_ERROR" });
    }
  }
}
export default ProductController;
