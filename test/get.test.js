const request = require("supertest");
const app = require("../server");

describe("GET /products", () => {
    it("should get list of products", async () => {
        const product1 = {
            _id: 1,
            name: "name1",
            category: "category1",
            price: 1.11,
            stock: 1
        };

        const response = await request(app)
            .post("/products")
            .send(product1);

        expect(response.status).toBe(201);
        expect(response.body._id).toBe(product1._id);
        expect(response.body.name).toBe(product1.name);
        expect(response.body.category).toBe(product1.category);
        expect(response.body.price).toBe(product1.price);
        expect(response.body.stock).toBe(product1.stock);

        const product2 = {
            _id: 2,
            name: "name2",
            category: "category2",
            price: 2.22,
            stock: 2
        };

        const response2 = await request(app)
            .post("/products")
            .send(product2);

        expect(response2.status).toBe(201);
        expect(response2.body._id).toBe(product2._id);
        expect(response2.body.name).toBe(product2.name);
        expect(response2.body.category).toBe(product2.category);
        expect(response2.body.price).toBe(product2.price);
        expect(response2.body.stock).toBe(product2.stock);
        
        const responseGet = await request(app)
            .get("/products")
            .send();

        expect(responseGet.status).toBe(200);
        expect(responseGet.body[0]._id).toBe(product1._id);
        expect(responseGet.body[0].name).toBe(product1.name);
        expect(responseGet.body[0].category).toBe(product1.category);
        expect(responseGet.body[0].price).toBe(product1.price);
        expect(responseGet.body[0].stock).toBe(product1.stock);

        expect(responseGet.body[1]._id).toBe(product2._id);
        expect(responseGet.body[1].name).toBe(product2.name);
        expect(responseGet.body[1].category).toBe(product2.category);
        expect(responseGet.body[1].price).toBe(product2.price);
        expect(responseGet.body[1].stock).toBe(product2.stock);

        const deleteResult = await request(app)
            .delete("/products/1")
            .send("Deleted successfully");

        expect(deleteResult.status).toBe(200);
        expect(deleteResult.text).toBe("Deleted successfully");

        const deleteResult2 = await request(app)
            .delete("/products/2")
            .send("Deleted successfully");

        expect(deleteResult2.status).toBe(200);
    });

    it("should get empty list of products", async () => {
        
        const response = await request(app)
            .get("/products")
            .send();

        expect(response.status).toBe(200);
        console.log(response.body)
        expect(response.body).toMatchObject([])
    });
});