import { expect, server } from "./setup";

describe("Index page test", () => {
  it("gets base url", (done) => {
    server
      .post(`localhost:5000/api/user/signin`)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal(
          "Environment variable is coming across."
        );
        done();
      });
  });
});
