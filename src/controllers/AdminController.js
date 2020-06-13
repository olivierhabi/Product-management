import UserService from "../services/UserService";
import hashPassword from "../helpers/hashPassword";
import dotenv from "dotenv";

import database from "../models";

dotenv.config();

const createAdministrator = async (req, res) => {
  const email = process.env.USER_EMAIL;
  const password = process.env.USER_PASSWORD;

  const hashedPassword = await hashPassword(password);
  try {
    const exists = await database.User.findOne({
      where: {
        email: email,
      },
    });
    if (!exists) {
      await UserService.addUser({
        email,
        password: hashedPassword,
      }).then(async (user) => {
        console.log("User created");
      });
    }
  } catch (error) {
    throw error;
  }
};

export default createAdministrator;
