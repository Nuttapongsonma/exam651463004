const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RegisterDisaster contract", function () {
    let registerDisaster, owner;

    beforeEach(async () => {
        const [deployer] = await ethers.getSigners();
        registerDisaster = await ethers.deployContract("RegisterDisaster");
        owner = deployer;
    });

    describe("Deployment", () => {
        it("Should set the right owner", async () => {
            expect(await registerDisaster.owner()).to.equal(owner.address);
        });
    });

    describe("Registration", () => {
        it("Should allow a person to register", async () => {
            await registerDisaster.registerPerson("1234567890", "John", "Doe", "123 Main St");
            const person = await registerDisaster.getID("1234567890");
            expect(person.idCard).to.equal("1234567890");
            expect(person.firstName).to.equal("John");
            expect(person.lastName).to.equal("Doe");
            expect(person.addr).to.equal("123 Main St");
        });
    });

    describe("Get ID", () => {
        it("Should find a person by ID", async () => {
            await registerDisaster.registerPerson("1234567890", "John", "Doe", "123 Main St");

            const person = await registerDisaster.getID("1234567890");
            expect(person.idCard).to.equal("1234567890");
            expect(person.firstName).to.equal("John");
            expect(person.lastName).to.equal("Doe");
            expect(person.addr).to.equal("123 Main St");
        });

        it("Should not find a person by ID if not registered", async () => {
            const unregisteredID = "9999999999";
            await expect(registerDisaster.getID(unregisteredID)).to.be.revertedWith("Person not found");
        });

    });

    describe("Get Person", () => {
        it("Should get a person by index", async () => {
            await registerDisaster.registerPerson("1234567890", "John", "Doe", "123 Main St");
            await registerDisaster.registerPerson("1234567891", "Jane", "Doe", "456 Main St");
            const person = await registerDisaster.getPerson(0);
            expect(person.idCard).to.equal("1234567890");
            expect(person.firstName).to.equal("John");
            expect(person.lastName).to.equal("Doe");
            expect(person.addr).to.equal("123 Main St");
        });
    });

    describe("Get All People", () => {
        it("Should get all people", async () => {
            await registerDisaster.registerPerson("1234567890", "John", "Doe", "123 Main St");
            await registerDisaster.registerPerson("1234567891", "Jane", "Doe", "456 Main St");
            const allPeople = await registerDisaster.getAll();
            expect(allPeople.length).to.equal(2);
            expect(allPeople[0].idCard).to.equal("1234567890");
            expect(allPeople[1].idCard).to.equal("1234567891");
        });
    });
});