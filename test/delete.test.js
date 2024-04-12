const request = require("supertest");
const app = require("../server");

describe("DELETE /products/:id", () => {
    it("should delete product by _id = 1", async () => {
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

        const deleteResult = await request(app)
            .delete("/products/1")
            .send();

        expect(deleteResult.status).toBe(200);
        expect(deleteResult.text).toBe("Deleted successfully");
    });

    it("should return 404 Not Found if product _id is not found", async () => {
        const response = await request(app)
            .delete("/products/1")
            .send();

        expect(response.status).toBe(404);
        expect(response.notFound).toBe(true);
        expect(response.text).toBe("Not Found: Product not found");
    });
});