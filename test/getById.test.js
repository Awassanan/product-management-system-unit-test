const request = require("supertest");
const app = require("../server");

describe("GET /products/:id", () => {
    it("should get product by _id = 1", async () => {
        const product = {
            _id: 1,
            name: "name1",
            category: "category1",
            price: 1.11,
            stock: 1
        };

        const response = await request(app)
            .post("/products")
            .send(product);

        expect(response.status).toBe(201);
        expect(response.body._id).toBe(product._id);
        expect(response.body.name).toBe(product.name);
        expect(response.body.category).toBe(product.category);
        expect(response.body.price).toBe(product.price);
        expect(response.body.stock).toBe(product.stock);

        const responseGet = await request(app)
            .get("/products/1")
            .send();

        expect(responseGet.status).toBe(200);
        expect(responseGet.body._id).toBe(product._id);
        expect(responseGet.body.name).toBe(product.name);
        expect(responseGet.body.category).toBe(product.category);
        expect(responseGet.body.price).toBe(product.price);
        expect(responseGet.body.stock).toBe(product.stock);

        const deleteResult = await request(app)
            .delete("/products/1")
            .send("Deleted successfully");

        expect(deleteResult.status).toBe(200);
        expect(deleteResult.text).toBe("Deleted successfully");
    });

    it("should return 404 Not Found if product _id is not found", async () => {
        const responseGet = await request(app)
            .get("/products/1")
            .send();

        expect(responseGet.status).toBe(404);
        expect(responseGet.notFound).toBe(true);
        expect(responseGet.text).toBe("Not Found: Product not found");
    });
});