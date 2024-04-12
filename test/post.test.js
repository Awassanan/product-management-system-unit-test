const request = require("supertest");
const app = require("../server");

describe("POST /products", () => {
    it("should create a new product", async () => {
        const newProduct = {
            _id: 1,
            name: "ชื่อสินค้า wow! ใหม่สุด ๆ",
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

        const deleteResult = await request(app)
            .delete("/products/1")
            .send("Deleted successfully");

        expect(deleteResult.status).toBe(200);
        expect(deleteResult.text).toBe("Deleted successfully");
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
            .post("/products")
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
            .post("/products")
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
            .post("/products")
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
            .post("/products")
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
            .post("/products")
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
            .post("/products")
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
            .post("/products")
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
            .post("/products")
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
            .post("/products")
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
            .post("/products")
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
            .post("/products")
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
            .post("/products")
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
            .post("/products")
            .send(incompletedProduct);

        expect(response.status).toBe(400);
        expect(response.badRequest).toBe(true);
        expect(response.text).toBe("Bad Request: Stock can't be less than 0");
    });


    it("should return 400 Bad Request if name includes only special characters", async () => {
        const invalidProduct = {
            _id: 1,
            name: "---",
            category: "category1",
            price: 1.11,
            stock: 1
        };

        const response = await request(app)
            .post("/products")
            .send(invalidProduct);

        expect(response.status).toBe(400);
        expect(response.badRequest).toBe(true);
        expect(response.text).toBe("Bad Request: Name can't be only special characters");
    });

    it("should return 201 created if name includes alphabets mixs with special characters", async () => {
        const newProduct = {
            _id: 1,
            name: "a/b/c",
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

        const deleteResult = await request(app)
            .delete("/products/1")
            .send("Deleted successfully");

        expect(deleteResult.status).toBe(200);
        expect(deleteResult.text).toBe("Deleted successfully");

    });

    it("should return 400 Bad Request if category includes only special characters", async () => {
        const invalidProduct = {
            _id: 1,
            name: "name1",
            category: "***",
            price: 1.11,
            stock: 1
        };

        const response = await request(app)
            .post("/products")
            .send(invalidProduct);

        expect(response.status).toBe(400);
        expect(response.badRequest).toBe(true);
        expect(response.text).toBe("Bad Request: Category can't be only special characters");
    });

    it("should return 201 created if category includes alphabets mixs with special characters", async () => {
        const newProduct = {
            _id: 1,
            name: "name1",
            category: "a, b, c",
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

        const deleteResult = await request(app)
            .delete("/products/1")
            .send("Deleted successfully");

        expect(deleteResult.status).toBe(200);
        expect(deleteResult.text).toBe("Deleted successfully");
    });

    it("should return 400 Bad Request if request body is empty", async () => {
        const emptyProduct = {};

        const response = await request(app)
            .post("/products")
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
            .post("/products")
            .send(emptyProduct);

        expect(response.status).toBe(400);
        expect(response.badRequest).toBe(true);
        expect(response.text).toBe("Bad Request: All of values are invalid");
    });

    it("should return 400 Bad Request if some value is invalid, means missing", async () => {
        const emptyProduct = {
            _id: 1,
            name: "",
            category: null,
            price: 1.11,
            stock: undefined
        };

        const response = await request(app)
            .post("/products")
            .send(emptyProduct);

        expect(response.status).toBe(400);
        expect(response.badRequest).toBe(true);
        expect(response.text).toBe("Bad Request: Name is missing");
    });

    it("should return 400 Bad Request if id is duplicated", async () => {
        const product1 = {
            _id: 1,
            name: "name1",
            price: 1,
            category: "category1",
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

        const duplicatedProduct = {
            _id: 1,
            name: "name1",
            price: 1,
            category: "category1",
            stock: 1
        };

        const duplicatedResponse = await request(app)
            .post("/products")
            .send(duplicatedProduct);

        expect(duplicatedResponse.status).toBe(400);
        expect(duplicatedResponse.badRequest).toBe(true);
        expect(duplicatedResponse.text).toBe("Bad Request: Duplicated ID");

        const deleteResult = await request(app)
            .delete("/products/1")
            .send("Deleted successfully");

        expect(deleteResult.status).toBe(200);
        expect(deleteResult.text).toBe("Deleted successfully");
    });
});