import bcrypt from "bcryptjs";
import "@babel/polyfill";
import token from "../helpers/genToken";
import UserService from "../services/UserService";
import hashPassword from "../helpers/hashPassword";

class UserController {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} user object
   */
  static async AddUser(req, res) {
    const { email, password } = req.body;
    const hashedPassword = await hashPassword(password);

    try {
      const createUser = await UserService.addUser({
        email,
        password: hashedPassword,
      });

      return res.status(201).send({
        status: 201,
        message: "Signup successfull",
        data: createUser,
      });
    } catch (e) {
      if (e.name === "SequelizeUniqueConstraintError") {
        const { message } = e.errors[0];
        let errorMessage = message;
        if (message === "email must be unique") {
          errorMessage = "The email is already taken";
        }
        return res.status(400).send({ status: 400, message: errorMessage });
      }
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} user object
   */
  static async Login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserService.findUser(email);
      if (!user) {
        return res
          .status(400)
          .send({ status: 400, message: "Invalid email or password" });
      }
      const validPassword = await bcrypt.compare(
        password,
        user.dataValues.password
      );
      if (!validPassword) {
        return res
          .status(400)
          .send({ status: 400, message: "Invalid email or password" });
      }
      const data = await token({
        id: user.dataValues.id,
        email: user.dataValues.email,
      });

      return res.status(200).send({
        status: 200,
        message: "User is successfully logged in",
        token: data,
      });
    } catch (error) {
      return res.status(500).send({ message: "SERVER_ERROR" });
    }
  }
}

export default UserController;
