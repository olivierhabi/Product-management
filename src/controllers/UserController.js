class UserController {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @return {object} user object
   */
  static async AddUser(req, res) {
    return res.send().message({
      message: "user routes",
      data: "data",
    });
  }
}

export default UserController;
