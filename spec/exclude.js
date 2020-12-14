const { Validator, expect } = require("./setup.js");

describe("exclude", function () {
  it("should exclude_if", function () {
    let validator = new Validator({ fname: "mike", lname: "erickson" }, { fname: "exclude_if:lname,erickson" });
    expect(validator.passes()).to.be.true;

    validator = new Validator({ fname: "mike", lname: "johnson" }, { fname: "exclude_if:lname,erickson" });
    expect(validator.passes()).to.be.false;
    expect(validator.errors.first("fname")).to.equal("The fname will be excluded if lname,erickson.");
  });

  it("should exclude_unless", function () {
    let validator = new Validator({ fname: "mike", lname: "johnson" }, { fname: "exclude_unless:lname,erickson|max:2" });
    expect(validator.fails()).to.be.true;

    validator = new Validator({ fname: "mike", lname: "erickson" }, { fname: "exclude_unless:lname,erickson|max:2" });
    expect(validator.passes()).to.be.false;
    let errors = validator.errors.all()["fname"];
    expect(errors.includes("The fname will be excluded if lname,erickson."));
    expect(errors.includes("The fname may not be greater than 2 characters."));
  });
});
