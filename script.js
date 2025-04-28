document.addEventListener("DOMContentLoaded", function () {
    console.log("Script Loaded Successfully!");  // Debugging check

    // Get elements
    const addProductBtn = document.getElementById("addProductBtn");
    const scanBarcodeBtn = document.getElementById("scanBarcodeBtn");
    const popupForm = document.getElementById("popupForm");
    const simplePopupForm = document.getElementById("simplePopupForm");
    const closeBtn = document.querySelector(".close-btn");
    const closeSimpleBtn = document.querySelector(".close-simple-btn");
    const barcodeInput = document.getElementById("barcodeInput");
    const productNameInput = document.getElementById("productName");
    const quantityInput = document.getElementById("quantity");
    const priceInput = document.getElementById("price");
    const productForm = document.getElementById("productForm");
    const simpleProductForm = document.getElementById("simpleProductForm");
    const simpleProductNameInput = document.getElementById("simpleProductName");
    const simpleQuantityInput = document.getElementById("simpleQuantity");
    const simplePriceInput = document.getElementById("simplePrice");
    const menuBtn = document.querySelector(".menu-btn");
    const sidebar = document.querySelector(".sidebar");
    const closeSidebarBtn = document.querySelector(".close-sidebar-btn");

    // Check if elements exist before adding event listeners
    function checkElement(element, name) {
        if (!element) {
            console.error(`Element not found: ${name}`);
        }
    }

    checkElement(addProductBtn, "addProductBtn");
    checkElement(scanBarcodeBtn, "scanBarcodeBtn");
    checkElement(popupForm, "popupForm");
    checkElement(simplePopupForm, "simplePopupForm");
    checkElement(closeBtn, "closeBtn");
    checkElement(closeSimpleBtn, "closeSimpleBtn");

    // Simulated Product Database
    const productDatabase = {
        "7622202225550": { name: "Oreo", quantity: 1, price: 10 },
        "5449000000996": { name: "Coke Can", quantity: 1, price: 60},
        "7622201141585": { name: "Dairy Milk", quantity: 1, price: 80},
        "8901063093416": { name: "Biscuit Good Day", quantity: 1, price: 10},
    };

    // Show full form (Scan Barcode)
    if (scanBarcodeBtn) {
        scanBarcodeBtn.addEventListener("click", () => {
            popupForm.style.display = "block";
            barcodeInput.focus();
        });
    }

    // Show simple form (Add Product Manually)
    if (addProductBtn) {
        addProductBtn.addEventListener("click", () => {
            simplePopupForm.style.display = "block";
            simpleProductNameInput.focus();
        });
    }

    // Close full form
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            popupForm.style.display = "none";
        });
    }

    // Close simple form
    if (closeSimpleBtn) {
        closeSimpleBtn.addEventListener("click", () => {
            simplePopupForm.style.display = "none";
        });
    }

    // Barcode Scanning: Auto-fill details if found
    if (barcodeInput) {
        barcodeInput.addEventListener("input", function () {
            let barcode = barcodeInput.value.trim();
            console.log("Scanned Barcode:", barcode);

            if (productDatabase.hasOwnProperty(barcode)) {
                console.log("Product Found:", productDatabase[barcode]);

                productNameInput.value = productDatabase[barcode].name;
                quantityInput.value = productDatabase[barcode].quantity;
                priceInput.value = productDatabase[barcode].price;
            } else {
                console.log("Product Not Found!");
                productNameInput.value = "";
                quantityInput.value = "1"; // Default quantity
                priceInput.value = "";
            }
        });
    }

    // Handle full form submission (Scan Barcode)
    if (productForm) {
        productForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const barcode = barcodeInput.value.trim();
            const productName = productNameInput.value.trim();
            let quantity = parseInt(quantityInput.value, 10);
            const price = parseFloat(priceInput.value);

            if (!barcode || !productName || isNaN(quantity) || isNaN(price)) {
                alert("Please fill all fields correctly before submitting!");
                return;
            }

            let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
            let existingProduct = inventory.find(item => item.barcode === barcode);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                inventory.push({ barcode, productName, quantity, price });
            }

            localStorage.setItem("inventory", JSON.stringify(inventory));
            alert("Product Added Successfully!");

            productForm.reset();
            popupForm.style.display = "none";
        });
    }

    // Handle simple form submission (Add Product Manually)
    if (simpleProductForm) {
        simpleProductForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const productName = simpleProductNameInput.value.trim();
            const quantity = parseInt(simpleQuantityInput.value, 10);
            const price = parseFloat(simplePriceInput.value);

            if (!productName || isNaN(quantity) || isNaN(price)) {
                alert("Please fill all fields correctly before submitting!");
                return;
            }

            let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
            let existingProduct = inventory.find(item => item.productName === productName);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                inventory.push({ productName, quantity, price });
            }

            localStorage.setItem("inventory", JSON.stringify(inventory));
            alert("Product Added Successfully!");

            simpleProductForm.reset();
            simplePopupForm.style.display = "none";
        });
    }

    // Sidebar functionality
    if (menuBtn) {
        menuBtn.addEventListener("click", function () {
            sidebar.classList.toggle("active");

            if (sidebar.classList.contains("active")) {
                sidebar.style.backgroundColor = "black";
                menuBtn.style.backgroundColor = "blue";
                document.querySelectorAll(".sidebar a").forEach(link => {
                    link.style.color = "white";
                });
            } else {
                sidebar.style.backgroundColor = "";
                menuBtn.style.backgroundColor = "";
            }
        });
    }

    // Close sidebar
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener("click", function () {
            sidebar.classList.remove("active");
            menuBtn.style.backgroundColor = "";
        });
    }
    
});
