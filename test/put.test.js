const request = require("supertest");
const app = require("../server");

describe("PUT /products/:id", () => {
    it("should update product by _id = 1", async () => {
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

        const updatedProduct = {
            _id: 1,
            name: "name2",
            category: "category2",
            price: 2.22,
            stock: 2
        };

        const responsePut = await request(app)
            .put("/products/1")
            .send(updatedProduct);

        expect(responsePut.status).toBe(200);
        expect(responsePut.body._id).toBe(updatedProduct._id);
        expect(responsePut.body.name).toBe(updatedProduct.name);
        expect(responsePut.body.category).toBe(updatedProduct.category);
        expect(responsePut.body.price).toBe(updatedProduct.price);
        expect(responsePut.body.stock).toBe(updatedProduct.stock);

        const deleteResult = await request(app)
            .delete("/products/1")
            .send("Deleted successfully");

        expect(deleteResult.status).toBe(200);
        expect(deleteResult.text).toBe("Deleted successfully");
    });

    it("should return 404 Not Found if product _id is not found", async () => {
        const updatedProduct = {
            _id: 1,
            name: "name2",
            category: "category2",
            price: 2.22,
            stock: 2
        };

        const response = await request(app)
            .put("/products/1")
            .send(updatedProduct);

        expect(response.status).toBe(404);
        expect(response.notFound).toBe(true);
        expect(response.text).toBe("Not Found: Product not found");
    });

    // validation test
    it("should return 400 Bad Request if _id is missing", async () => {
        const incompletedProduct = {
            name: "name2",
            category: "category2",
            price: 2.22,
            stock: 2
        };

        const response = await request(app)
            .put("/products/1")
            .send(incompletedProduct);

        expect(response.status).toBe(400);
        expect(response.badRequest).toBe(true);
        expect(response.text).toBe("Bad Request: Id is missing");
    });

    it("should return 400 Bad Request if _id is not a number", async () => {
        const incompletedProduct = {
            _id: "3",
            name: "name3",
            category: "category3",
            price: 3.33,
            stock: 3
        };

        const response = await request(app)
            .put("/products/3")
            .send(incompletedProduct);

        expect(response.status).toBe(400);
        expect(response.badRequest).toBe(true);
        expect(response.text).toBe("Bad Request: Id must be a number");
    });

    it("should return 400 Bad Request if name is missing", async () => {
        const incompletedProduct = {
            _id: 4,
            category: "category4",
            price: 4.44,
            stock: 4
        };

        const response = await request(app)
            .put("/products/4")
            .send(incompletedProduct);

        expect(response.status).toBe(400);
        expect(response.badRequest).toBe(true);
        expect(response.text).toBe("Bad Request: Name is missing");
    });

    it("should return 400 Bad Request if name is not a string", async () => {
        const incompletedProduct = {
            _id: 5,
            name: 5,
            category: "category5",
            price: 5.55,
            stock: 5
        };

        const response = await request(app)
            .put("/products/5")
            .send(incompletedProduct);

        expect(response.status).toBe(400);
        expect(response.badRequest).toBe(true);
        expect(response.text).toBe("Bad Request: Name must be a string");
    });

    it("should return 400 Bad Request if category is missing", async () => {
        const incompletedProduct = {
            _id: 6,
            name: "name6",
            price: 6.66,
            stock: 6
        };

        const response = await request(app)
            .put("/products/6")
            .send(incompletedProduct);

        expect(response.status).toBe(400);
        expect(response.badRequest).toBe(true);
        expect(response.text).toBe("Bad Request: Category is missing");
    });

    it("should return 400 Bad Request if category is not a string", async () => {
        const incompletedProduct = {
            _id: 7,
            name: "name7",
            category: 7,
            price: 7.77,
            stock: 7
        };

        const response = await request(app)
            .put("/products/7")
            .send(incompletedProduct);

        expect(response.status).toBe(400);
        expect(response.badRequest).toBe(true);
        expect(response.text).toBe("Bad Request: Category must be a string");
    });

    it("should return 400 Bad Request if price is missing", async () => {
        const incompletedProduct = {
            _id: 8,
            name: "name8",
            category: "category8",
            stock: 8
        };

        const response = await request(app)
            .put("/products/8")
            .send(incompletedProduct);

        expect(response.status).toBe(400);
        expect(response.badRequest).toBe(true);
        expect(response.text).toBe("Bad Request: Price is missing");
    });

    it("should return 400 Bad Request if price is not a number", async () => {
        const incompletedProduct = {
            _id: 9,
            name: "name9",
            price: "a",
            category: "category9",
            stock: 9
        };

        const response = await request(app)
            .put("/products/9")
            .send(incompletedProduct);

        expect(response.status).toBe(400);
        expect(response.badRequest).toBe(true);
        expect(response.text).toBe("Bad Request: Price must be a number");
    });

    it("should return 400 Bad Request if price < 0", async () => {
        const incompletedProduct = {
            _id: 10,
            name: "name10",
            price: -1,
            category: "category10",
            stock: 10
        };

        const response = await request(app)
            .put("/products/10")
            .send(incompletedProduct);

        expect(response.status).toBe(400);
        expect(response.badRequest).toBe(true);
        expect(response.text).toBe("Bad Request: Price can't be less than 0");
    });

    it("should return 400 Bad Request if stock is missing", async () => {
        const incompletedProduct = {
            _id: 11,
            name: "name11",
            price: 11,
            category: "category11"
        };

        const response = await request(app)
            .put("/products/11")
            .send(incompletedProduct);

        expect(response.status).toBe(400);
        expect(response.badRequest).toBe(true);
        expect(response.text).toBe("Bad Request: Stock is missing");
    });

    it("should return 400 Bad Request if stock is not a number", async () => {
        const incompletedProduct = {
            _id: 12,
            name: "name12",
            price: 12,
            category: "category12",
            stock: "b"
        };

        const response = await request(app)
            .put("/products/12")
            .send(incompletedProduct);

        expect(response.status).toBe(400);
        expect(response.badRequest).toBe(true);
        expect(response.text).toBe("Bad Request: Stock must be a number");
    });

    it("should return 400 Bad Request if stock is not an integer", async () => {
        const incompletedProduct = {
            _id: 13,
            name: "name13",
            price: 13,
            category: "category13",
            stock: 0.5
        };

        const response = await request(app)
            .put("/products/13")
            .send(incompletedProduct);

        expect(response.status).toBe(400);
        expect(response.badRequest).toBe(true);
        expect(response.text).toBe("Bad Request: Stock must be an integer");
    });

    it("should return 400 Bad Request if stock < 0", async () => {
        const incompletedProduct = {
            _id: 14,
            name: "name14",
            price: 14,
            category: "category14",
            stock: -1
        };

        const response = await request(app)
            .put("/products/14")
            .send(incompletedProduct);

        expect(response.status).toBe(400);
        expect(response.badRequest).toBe(true);
        expect(response.text).toBe("Bad Request: Stock can't be less than 0");
    });

    //////
    it("should return 400 Bad Request if name includes only special characters", async () => {
        const newProduct = {
            _id: 1,
            name: "name1",
            category: "category1",
            price: 1.11,
            stock: 1
        };

        const response = await request(app)
            .post("/products")
            .send(newProduct);

        expect(response.status).toBe(201);
        expect(response.body._id).toBe(newProduct._id);
        expect(response.body.name).toBe(newProduct.name);
        expect(response.body.category).toBe(newProduct.category);
        expect(response.body.price).toBe(newProduct.price);
        expect(response.body.stock).toBe(newProduct.stock);

        const updatedProduct = {
            _id: 1,
            name: "---",
            category: "category1",
            price: 1.11,
            stock: 1
        };

        const responseUpdate = await request(app)
            .put("/products/1")
            .send(updatedProduct);

        expect(responseUpdate.status).toBe(400);
        expect(responseUpdate.badRequest).toBe(true);
        expect(responseUpdate.text).toBe("Bad Request: Name can't be only special characters");

        const deleteResult = await request(app)
            .delete("/products/1")
            .send("Deleted successfully");

        expect(deleteResult.status).toBe(200);
        expect(deleteResult.text).toBe("Deleted successfully");
    });

    it("should update the product if name includes alphabets mixs with special characters", async () => {
        const newProduct = {
            _id: 1,
            name: "name1",
            category: "category1",
            price: 1.11,
            stock: 1
        };

        const response = await request(app)
            .post("/products")
            .send(newProduct);

        expect(response.status).toBe(201);
        expect(response.body._id).toBe(newProduct._id);
        expect(response.body.name).toBe(newProduct.name);
        expect(response.body.category).toBe(newProduct.category);
        expect(response.body.price).toBe(newProduct.price);
        expect(response.body.stock).toBe(newProduct.stock);

        const updatedProduct = {
            _id: 1,
            name: "a-b-c",
            category: "category1",
            price: 1.11,
            stock: 1
        };

        const responseUpdate = await request(app)
            .put("/products/1")
            .send(updatedProduct);

        expect(responseUpdate.status).toBe(200);
        expect(responseUpdate.ok).toBe(true);
        expect(responseUpdate.body._id).toBe(updatedProduct._id);
        expect(responseUpdate.body.name).toBe(updatedProduct.name);
        expect(responseUpdate.body.category).toBe(updatedProduct.category);
        expect(responseUpdate.body.price).toBe(updatedProduct.price);
        expect(responseUpdate.body.stock).toBe(updatedProduct.stock);

        const deleteResult = await request(app)
            .delete("/products/1")
            .send("Deleted successfully");

        expect(deleteResult.status).toBe(200);
        expect(deleteResult.text).toBe("Deleted successfully");
    });

    it("should return 400 Bad Request if category includes only special characters", async () => {
        const newProduct = {
            _id: 1,
            name: "name1",
            category: "category1",
            price: 1.11,
            stock: 1
        };

        const response = await request(app)
            .post("/products")
            .send(newProduct);

        expect(response.status).toBe(201);
        expect(response.body._id).toBe(newProduct._id);
        expect(response.body.name).toBe(newProduct.name);
        expect(response.body.category).toBe(newProduct.category);
        expect(response.body.price).toBe(newProduct.price);
        expect(response.body.stock).toBe(newProduct.stock);

        const updatedProduct = {
            _id: 1,
            name: "name1",
            category: "///",
            price: 1.11,
            stock: 1
        };

        const responseUpdate = await request(app)
            .put("/products/1")
            .send(updatedProduct);

        expect(responseUpdate.status).toBe(400);
        expect(responseUpdate.badRequest).toBe(true);
        expect(responseUpdate.text).toBe("Bad Request: Category can't be only special characters");

        const deleteResult = await request(app)
            .delete("/products/1")
            .send("Deleted successfully");

        expect(deleteResult.status).toBe(200);
        expect(deleteResult.text).toBe("Deleted successfully");
    });

    it("should update the product if category includes alphabets mixs with special characters", async () => {
        const newProduct = {
            _id: 1,
            name: "name1",
            category: "category1",
            price: 1.11,
            stock: 1
        };

        const response = await request(app)
            .post("/products")
            .send(newProduct);

        expect(response.status).toBe(201);
        expect(response.body._id).toBe(newProduct._id);
        expect(response.body.name).toBe(newProduct.name);
        expect(response.body.category).toBe(newProduct.category);
        expect(response.body.price).toBe(newProduct.price);
        expect(response.body.stock).toBe(newProduct.stock);

        const updatedProduct = {
            _id: 1,
            name: "name1",
            category: "a-b-c",
            price: 1.11,
            stock: 1
        };

        const responseUpdate = await request(app)
            .put("/products/1")
            .send(updatedProduct);

        expect(responseUpdate.status).toBe(200);
        expect(responseUpdate.ok).toBe(true);
        expect(responseUpdate.body._id).toBe(updatedProduct._id);
        expect(responseUpdate.body.name).toBe(updatedProduct.name);
        expect(responseUpdate.body.category).toBe(updatedProduct.category);
        expect(responseUpdate.body.price).toBe(updatedProduct.price);
        expect(responseUpdate.body.stock).toBe(updatedProduct.stock);

        const deleteResult = await request(app)
            .delete("/products/1")
            .send("Deleted successfully");

        expect(deleteResult.status).toBe(200);
        expect(deleteResult.text).toBe("Deleted successfully");
    });
    //////

    it("should return 400 Bad Request if request body is empty", async () => {
        const emptyProduct = {};

        const response = await request(app)
            .put("/products/1")
            .send(emptyProduct);

        expect(response.status).toBe(400);
        expect(response.badRequest).toBe(true);
        expect(response.text).toBe("Bad Request: Request body is empty");
    });

    it("should return 400 Bad Request if all of values are invalid", async () => {
        const emptyProduct = {
            _id: undefined,
            name: "",
            category: "",
            price: null,
            stock: undefined
        };

        const response = await request(app)
            .put("/products/1")
            .send(emptyProduct);

        expect(response.status).toBe(400);
        expect(response.badRequest).toBe(true);
        expect(response.text).toBe("Bad Request: All of values are invalid");
    });

    it("should return 400 Bad Request if some value is invalid, means missing", async () => {
        const emptyProduct = {
            _id: 1,
            name: "name1",
            category: null,
            price: 1.11,
            stock: undefined
        };

        const response = await request(app)
            .put("/products/1")
            .send(emptyProduct);

        expect(response.status).toBe(400);
        expect(response.badRequest).toBe(true);
        expect(response.text).toBe("Bad Request: Category is missing");
    });
});