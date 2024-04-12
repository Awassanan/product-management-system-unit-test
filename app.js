const baseURL = 'http://localhost:3000/products/'

// GET all
async function getProducts() {
    try {
        const response = await fetch(baseURL)
        if (!response.ok) {
            throw new Error(response.status + " : " + await response.text());
        } else if (response.body.length === 0) {
            return
        }
        const data = await response.json();
        console.log(data);
        data.forEach(element => {
            document.getElementById("tbody").innerHTML += `<tr id="${"product" + element._id}">
                <th scope="row" id="${"row" + element._id}">${element._id}</th>
                <td>
                    <div class="d-flex justify-content-between" style="width:60%">
                        <i class="bi-pencil-square" onclick='updateProductModal(${element._id}, "${element.name}", "${element.category}", ${element.price}, ${element.stock})'></i>
                        <i class="bi-trash-fill" onclick="deleteProduct('${element._id}')"></i>
                    </div>
                </td>
                <td>${element.name}</td>
                <td>${element.category}</td>
                <td>${element.price}&nbsp;Baht</td>
                <td>${element.stock}</td>
            </tr>`
        });

    } catch (error) {
        throw new Error(error.message);
    }
}

// GET by id
async function searchById(id) {
    try {
        if (id.trim() === "") {
            document.getElementById("tbody").innerHTML = "";
            getProducts();
            return;
        }

        const response = await fetch(baseURL + id)
        if (!response.ok) {
            if (response.status === 404) {
                console.log(response)
                document.getElementById("tbody").innerHTML = `<tr><td colspan="6">Product not found</td></tr>`;
                return;
            } else {
                throw new Error(await response.text());
            }
        }
        const data = await response.json();
        console.log(data);

        document.getElementById("tbody").innerHTML = `<tr id="${"product" + data._id}">
            <th scope="row" id="${"row" + data._id}">${data._id}</th>
            <td>
                <div class="d-flex justify-content-between" style="width:60%">
                    <i class="bi-pencil-square" onclick='updateProductModal(${data._id}, "${data.name}", "${data.category}", ${data.price}, ${data.stock})'></i>
                    <i class="bi-trash-fill" onclick="deleteProduct('${data._id}')"></i>
                </div>
            </td>
            <td>${data.name}</td>
            <td>${data.category}</td>
            <td>${data.price}&nbsp;Baht</td>
            <td>${data.stock}</td>
        </tr>`;
    } catch (error) {
        throw new Error(error.message);
    }
}

document.getElementById('form1').addEventListener('input', function (event) {
    const searchValue = event.target.value.trim();
    searchById(searchValue);
});

// DELETE
async function deleteProduct(id) {
    try {
        const response = await fetch(baseURL + id, {
            method: 'DELETE'
        })

        if (!response.ok) {
            throw new Error(response.status + " : " + await response.text());
        }

        document.getElementById("tbody").removeChild(document.getElementById(`product${id}`));

    } catch (error) {
        throw new Error(error.message);
    }
}

function clearInputField() {
    document.getElementById('name').value = "";
    document.getElementById('category').value = "";
    document.getElementById('price').value = "";
    document.getElementById('stock').value = "";
}

function newProductModal() {
    var modal = document.getElementById('myModal');
    var bootstrapModal = new bootstrap.Modal(modal);
    document.getElementById("myModalLabel").innerHTML = "New Product Info"

    clearInputField()

    let lastchild = document.getElementById("tbody").lastChild
    let nextId;
    let lastId;
    try {
        lastId = parseInt((lastchild.id).substring(lastchild.id.length - 1, lastchild.id.length))
        nextId = lastId + 1
    }
    catch {
        nextId = 1
    }
    finally {
        console.log(lastId)
    }

    document.getElementById('productId').placeholder = nextId;
    document.getElementById('name').placeholder = "name";
    document.getElementById('category').placeholder = "category";
    document.getElementById('price').placeholder = "price";
    document.getElementById('stock').placeholder = "stock";

    document.getElementById('saveChangesButton').onclick = function () {
        var postData = {
            _id: nextId,
            name: document.getElementById('name').value,
            category: document.getElementById('category').value,
            price: parseFloat(document.getElementById('price').value),
            stock: parseFloat(document.getElementById('stock').value)
        };
        newProduct(postData);
        bootstrapModal.hide();
        clearValidation();
    };

    bootstrapModal.show();
}

// POST
async function newProduct(postData) {
    try {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })

        if (!response.ok) {
            throw new Error(response.status + " : " + await response.text());
        }

        const data = await response.json();
        console.log('Success:', data);

        document.getElementById("tbody").innerHTML += `<tr id="product${data._id}">
            <th scope="row" id="row${data._id}">${data._id}</th>
            <td>
                <div class="d-flex justify-content-between" style="width:60%">
                    <i class="bi-pencil-square" onclick='updateProductModal(${data._id}, "${data.name}", "${data.category}", ${data.price}, ${data.stock})'></i>
                    <i class="bi-trash-fill" onclick="deleteProduct('${data._id}')"></i>
                </div>
            </td>
            <td>${data.name}</td>
            <td>${data.category}</td>
            <td>${data.price}&nbsp;Baht</td>
            <td>${data.stock}</td>
        </tr>`;
    } catch (error) {
        throw new Error(error.message);
    }
}

// PUT
function updateProductModal(id, name, category, price, stock) {
    var modal = document.getElementById('myModal');
    var bootstrapModal = new bootstrap.Modal(modal);
    document.getElementById("myModalLabel").innerHTML = "Update Product Info"

    clearInputField()

    document.getElementById('productId').placeholder = id;
    document.getElementById('name').placeholder = name;
    document.getElementById('category').placeholder = category;
    document.getElementById('price').placeholder = price;
    document.getElementById('stock').placeholder = stock;

    document.getElementById('saveChangesButton').onclick = function () {
        var updateData = {
            _id: id,
            name: document.getElementById('name').value,
            category: document.getElementById('category').value,
            price: parseFloat(document.getElementById('price').value),
            stock: parseFloat(document.getElementById('stock').value)
        };
        updateProduct(updateData);
        bootstrapModal.hide();
        clearValidation();
    };

    bootstrapModal.show();
}

async function updateProduct(updateData) {
    try {
        console.log(updateData)
        const response = await fetch(baseURL + updateData._id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        })

        console.log(response)

        if (!response.ok) {
            throw new Error(response.status + " : " + await response.text());
        }

        const data = await response.json();
        console.log('Success:', data);

        // Update the DOM elements of the corresponding table row
        const row = document.getElementById(`product${data._id}`);
        row.querySelector('td:nth-child(3)').textContent = data.name;
        row.querySelector('td:nth-child(4)').textContent = data.category;
        row.querySelector('td:nth-child(5)').textContent = `${data.price} Baht`;
        row.querySelector('td:nth-child(6)').textContent = data.stock;
    } catch (error) {
        throw new Error(error.message);
    }
}

getProducts()

function validateNumber(inputValue, inputId) {
    let validField = inputId.split("-")
    validField = validField[validField.length - 1]

    let field = document.getElementById(inputId)
    let saveButton = document.getElementById("saveChangesButton")

    if (inputValue.match(/[0-9]/)) {
        inputValue = Number.parseFloat(inputValue)
        if (inputValue < 0) {
            field.classList.remove('valid')
            field.classList.add('invalid')
            field.innerHTML = validField + " can't < 0";
            saveButton.classList.add('disabled')
        } else if (validField === "stock" && !Number.isInteger(inputValue)) {
            field.classList.remove('valid')
            field.classList.add('invalid')
            field.innerHTML = validField + ' must be an integer';
            saveButton.classList.add('disabled')
        } else {
            field.classList.remove('invalid')
            field.classList.add('valid')
            field.innerHTML = '';
            saveButton.classList.remove('disabled')
        }
    } else {
        field.classList.remove('valid')
        field.classList.add('invalid')
        field.innerHTML = validField + " can't be empty";
        saveButton.classList.add('disabled')
    }

}

document.getElementById('price').addEventListener('input', function (event) {
    const inputPrice = event.target.value.trim();
    validateNumber(inputPrice, "valid-price");
});

document.getElementById('stock').addEventListener('input', function (event) {
    const inputStock = event.target.value.trim();
    validateNumber(inputStock, "valid-stock");
});

function validateString(inputValue, inputId) {
    let validField = inputId.split("-")
    validField = validField[validField.length - 1]

    let field = document.getElementById(inputId)
    let saveButton = document.getElementById("saveChangesButton")

    if (inputValue.match(/[\u0E00-\u0E7F\u0E30-\u0E49\u0E4A-\u0E4E\u0E00-\u0E2F\u0E40-\u0E44\u0E47-\u0E4Fa-zA-Z]/)) {
        field.classList.remove('invalid')
        field.classList.add('valid')
        field.innerHTML = '';
        saveButton.classList.remove('disabled')
    } else if (inputValue.match(/[0-9]/)) {
        field.classList.remove('valid')
        field.classList.add('invalid')
        field.innerHTML = validField + " can't be only number";
        saveButton.classList.add('disabled')
    } else if (inputValue.match(/['"+-/*@#^?|(){}[\],._=<>%\\]/)) {
        field.classList.remove('valid')
        field.classList.add('invalid')
        field.innerHTML = validField + " can't be only special characters";
        saveButton.classList.add('disabled')
    } else {
        field.classList.remove('valid')
        field.classList.add('invalid')
        field.innerHTML = validField + " can't be empty";
        saveButton.classList.add('disabled')
    }
}

document.getElementById('name').addEventListener('input', function (event) {
    const inputName = event.target.value.trim();
    validateString(inputName, 'valid-name');
});

document.getElementById('category').addEventListener('input', function (event) {
    const inputCategory = event.target.value.trim();
    validateString(inputCategory, 'valid-category');
});

function clearValidation() {
    let name = document.getElementById('valid-name')
    let price = document.getElementById('valid-price')
    let category = document.getElementById('valid-category')
    let stock = document.getElementById('valid-stock')

    name.classList.remove('valid')
    name.classList.add('invalid')
    name.innerHTML = '';

    price.classList.remove('valid')
    price.classList.add('invalid')
    price.innerHTML = '';

    category.classList.remove('valid')
    category.classList.add('invalid')
    category.innerHTML = '';

    stock.classList.remove('valid')
    stock.classList.add('invalid')
    stock.innerHTML = '';
}