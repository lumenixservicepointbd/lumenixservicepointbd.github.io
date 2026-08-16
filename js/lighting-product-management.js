/* =========================================================
   LUMENIX
   LIGHTING PRODUCT MANAGEMENT
   Lightweight Admin Product Master
========================================================= */

"use strict";


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           ACCESS
        ================================================= */

        const isAdmin =
            localStorage.getItem(
                "adminLoggedIn"
            ) === "true";


        const accessWarning =
            document.getElementById(
                "accessWarning"
            );


        const managementPanel =
            document.getElementById(
                "managementPanel"
            );


        const productListPanel =
            document.getElementById(
                "productListPanel"
            );


        if (!isAdmin) {

            if (accessWarning) {
                accessWarning.hidden = false;
            }

            document
                .getElementById(
                    "goAdminBtn"
                )
                ?.addEventListener(
                    "click",
                    function () {

                        window.location.href =
                            "admin.html";

                    }
                );

            return;
        }


        if (managementPanel) {
            managementPanel.hidden = false;
        }


        if (productListPanel) {
            productListPanel.hidden = false;
        }



        /* =================================================
           STORAGE
        ================================================= */

        const STORAGE_KEY =
            "lumenixLightingProducts";


        let products = [];


        try {

            products =
                JSON.parse(
                    localStorage.getItem(
                        STORAGE_KEY
                    )
                ) || [];

        } catch (error) {

            products = [];

        }



        /* =================================================
           ELEMENTS
        ================================================= */

        const form =
            document.getElementById(
                "productForm"
            );


        const productId =
            document.getElementById(
                "productId"
            );


        const productName =
            document.getElementById(
                "productName"
            );


        const productCode =
            document.getElementById(
                "productCode"
            );


        const productCategory =
            document.getElementById(
                "productCategory"
            );


        const productStatus =
            document.getElementById(
                "productStatus"
            );


        const sellingPrice =
            document.getElementById(
                "sellingPrice"
            );


        const dealerPrice =
            document.getElementById(
                "dealerPrice"
            );


        const stockQuantity =
            document.getElementById(
                "stockQuantity"
            );


        const serialTracking =
            document.getElementById(
                "serialTracking"
            );


        const productDescription =
            document.getElementById(
                "productDescription"
            );


        const productSpecification =
            document.getElementById(
                "productSpecification"
            );


        const productImage =
            document.getElementById(
                "productImage"
            );


        const imagePreview =
            document.getElementById(
                "imagePreview"
            );


        const previewImage =
            document.getElementById(
                "previewImage"
            );


        const removeImageBtn =
            document.getElementById(
                "removeImageBtn"
            );


        const managementList =
            document.getElementById(
                "productManagementList"
            );


        const managementEmpty =
            document.getElementById(
                "managementEmpty"
            );


        const managementSearch =
            document.getElementById(
                "managementSearch"
            );


        const productCount =
            document.getElementById(
                "productCount"
            );


        const toast =
            document.getElementById(
                "toast"
            );


        let currentImage =
            "";


        let imageWasRemoved =
            false;



        /* =================================================
           STORAGE SAVE
        ================================================= */

        function saveProducts() {

            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(
                    products
                )
            );

        }



        /* =================================================
           TOAST
        ================================================= */

        function showToast(
            message
        ) {

            if (!toast) {
                return;
            }


            toast.textContent =
                message;


            toast.classList.add(
                "show"
            );


            clearTimeout(
                showToast.timer
            );


            showToast.timer =
                setTimeout(
                    function () {

                        toast.classList.remove(
                            "show"
                        );

                    },
                    2200
                );

        }



        /* =================================================
           ID
        ================================================= */

        function createId() {

            return (
                "LXP-" +
                Date.now().toString(36) +
                "-" +
                Math.random()
                    .toString(36)
                    .slice(2, 8)
            ).toUpperCase();

        }



        /* =================================================
           ESCAPE HTML
        ================================================= */

        function escapeHTML(
            value
        ) {

            return String(
                value || ""
            )
                .replace(
                    /&/g,
                    "&amp;"
                )
                .replace(
                    /</g,
                    "&lt;"
                )
                .replace(
                    />/g,
                    "&gt;"
                )
                .replace(
                    /"/g,
                    "&quot;"
                )
                .replace(
                    /'/g,
                    "&#039;"
                );

        }



        /* =================================================
           IMAGE COMPRESSION
        ================================================= */

        function prepareImage(
            file
        ) {

            return new Promise(
                function (
                    resolve,
                    reject
                ) {

                    if (!file) {

                        resolve("");

                        return;
                    }


                    if (
                        !file.type.startsWith(
                            "image/"
                        )
                    ) {

                        reject(
                            new Error(
                                "Please select an image file."
                            )
                        );

                        return;
                    }


                    const reader =
                        new FileReader();


                    reader.onload =
                        function () {

                            const image =
                                new Image();


                            image.onload =
                                function () {

                                    const maxSize =
                                        900;


                                    let width =
                                        image.width;


                                    let height =
                                        image.height;


                                    if (
                                        width >
                                            maxSize ||
                                        height >
                                            maxSize
                                    ) {

                                        const ratio =
                                            Math.min(
                                                maxSize /
                                                    width,
                                                maxSize /
                                                    height
                                            );


                                        width =
                                            Math.round(
                                                width *
                                                ratio
                                            );


                                        height =
                                            Math.round(
                                                height *
                                                ratio
                                            );

                                    }


                                    const canvas =
                                        document.createElement(
                                            "canvas"
                                        );


                                    canvas.width =
                                        width;


                                    canvas.height =
                                        height;


                                    const context =
                                        canvas.getContext(
                                            "2d"
                                        );


                                    context.drawImage(
                                        image,
                                        0,
                                        0,
                                        width,
                                        height
                                    );


                                    resolve(
                                        canvas.toDataURL(
                                            "image/jpeg",
                                            0.72
                                        )
                                    );

                                };


                            image.onerror =
                                function () {

                                    reject(
                                        new Error(
                                            "Image could not be processed."
                                        )
                                    );

                                };


                            image.src =
                                reader.result;

                        };


                    reader.onerror =
                        function () {

                            reject(
                                new Error(
                                    "Image could not be read."
                                )
                            );

                        };


                    reader.readAsDataURL(
                        file
                    );

                }
            );

        }



        /* =================================================
           IMAGE PREVIEW
        ================================================= */

        function updatePreview(
            image
        ) {

            if (
                image &&
                previewImage &&
                imagePreview
            ) {

                previewImage.src =
                    image;

                imagePreview.hidden =
                    false;

            } else if (imagePreview) {

                imagePreview.hidden =
                    true;

            }

        }



        productImage?.addEventListener(
            "change",
            async function () {

                const file =
                    this.files?.[0];


                if (!file) {
                    return;
                }


                try {

                    currentImage =
                        await prepareImage(
                            file
                        );


                    imageWasRemoved =
                        false;


                    updatePreview(
                        currentImage
                    );


                } catch (error) {

                    alert(
                        error.message
                    );


                    this.value =
                        "";

                }

            }
        );



        removeImageBtn?.addEventListener(
            "click",
            function () {

                currentImage =
                    "";

                imageWasRemoved =
                    true;


                productImage.value =
                    "";


                updatePreview(
                    ""
                );

            }
        );



        /* =================================================
           RESET FORM
        ================================================= */

        function resetForm() {

            form.reset();


            productId.value =
                "";


            currentImage =
                "";


            imageWasRemoved =
                false;


            updatePreview(
                ""
            );


            document
                .getElementById(
                    "saveProductBtn"
                )
                .textContent =
                "Save Product";

        }



        /* =================================================
           NEW PRODUCT
        ================================================= */

        document
            .getElementById(
                "newProductBtn"
            )
            ?.addEventListener(
                "click",
                function () {

                    resetForm();


                    productName.focus();

                }
            );



        document
            .getElementById(
                "cancelEditBtn"
            )
            ?.addEventListener(
                "click",
                resetForm
            );



        /* =================================================
           EDIT PRODUCT
        ================================================= */

        function editProduct(
            id
        ) {

            const product =
                products.find(
                    function (item) {

                        return (
                            item.id === id
                        );

                    }
                );


            if (!product) {
                return;
            }


            productId.value =
                product.id;


            productName.value =
                product.name;


            productCode.value =
                product.code;


            productCategory.value =
                product.category;


            productStatus.value =
                product.status ||
                "active";


            sellingPrice.value =
                product.sellingPrice ||
                "";


            dealerPrice.value =
                product.dealerPrice ||
                "";


            stockQuantity.value =
                product.stockQuantity ||
                0;


            serialTracking.checked =
                product.serialTracking ===
                true;


            productDescription.value =
                product.description ||
                "";


            productSpecification.value =
                product.specification ||
                "";


            currentImage =
                product.image ||
                "";


            imageWasRemoved =
                false;


            updatePreview(
                currentImage
            );


            document
                .getElementById(
                    "saveProductBtn"
                )
                .textContent =
                "Update Product";


            window.scrollTo(
                {
                    top: 0,
                    behavior: "smooth"
                }
            );

        }



        /* =================================================
           DELETE PRODUCT
        ================================================= */

        function deleteProduct(
            id
        ) {

            const product =
                products.find(
                    function (item) {

                        return (
                            item.id === id
                        );

                    }
                );


            if (!product) {
                return;
            }


            const confirmed =
                window.confirm(
                    "Delete " +
                    product.name +
                    "?"
                );


            if (!confirmed) {
                return;
            }


            products =
                products.filter(
                    function (item) {

                        return (
                            item.id !== id
                        );

                    }
                );


            saveProducts();


            renderManagementList();


            showToast(
                "Product deleted."
            );

        }



        /* =================================================
           RENDER MANAGEMENT LIST
        ================================================= */

        function renderManagementList() {

            if (!managementList) {
                return;
            }


            const search =
                managementSearch
                    ? managementSearch.value
                        .trim()
                        .toLowerCase()
                    : "";


            const filtered =
                products.filter(
                    function (product) {

                        const searchable =
                            (
                                product.name +
                                " " +
                                product.code +
                                " " +
                                product.category
                            )
                                .toLowerCase();


                        return (
                            !search ||
                            searchable.includes(
                                search
                            )
                        );

                    }
                );


            managementList.innerHTML =
                "";


            if (productCount) {

                productCount.textContent =
                    products.length +
                    (
                        products.length === 1
                            ? " Product"
                            : " Products"
                    );

            }


            if (!filtered.length) {

                if (managementEmpty) {
                    managementEmpty.hidden =
                        false;
                }

                return;
            }


            if (managementEmpty) {
                managementEmpty.hidden =
                    true;
            }


            filtered.forEach(
                function (product) {

                    const card =
                        document.createElement(
                            "article"
                        );


                    card.className =
                        "management-card";


                    const imageHTML =
                        product.image
                            ? `
                                <img
                                    src="${product.image}"
                                    alt="${escapeHTML(
                                        product.name
                                    )}"
                                >
                              `
                            : "💡";


                    card.innerHTML = `

                        <div class="management-card-image">
                            ${imageHTML}
                        </div>

                        <div>

                            <h3>
                                ${escapeHTML(
                                    product.name
                                )}
                            </h3>

                            <p>
                                Code:
                                ${escapeHTML(
                                    product.code
                                )}
                            </p>

                            <p>
                                Category:
                                ${escapeHTML(
                                    product.category
                                )}
                            </p>

                            <p>
                                Selling:
                                ৳${Number(
                                    product.sellingPrice ||
                                    0
                                ).toLocaleString()}
                            </p>

                            <p>
                                Stock:
                                ${Number(
                                    product.stockQuantity ||
                                    0
                                ).toLocaleString()}
                            </p>

                            <p>
                                Serial:
                                ${
                                    product.serialTracking
                                        ? "ON"
                                        : "OFF"
                                }
                            </p>

                            <div class="management-actions">

                                <button
                                    type="button"
                                    class="edit-product"
                                    data-edit-id="${product.id}"
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    class="delete-product"
                                    data-delete-id="${product.id}"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    `;


                    managementList.appendChild(
                        card
                    );

                }
            );

        }



        /* =================================================
           LIST ACTIONS
        ================================================= */

        managementList?.addEventListener(
            "click",
            function (event) {

                const editButton =
                    event.target.closest(
                        "[data-edit-id]"
                    );


                if (editButton) {

                    editProduct(
                        editButton.dataset.editId
                    );

                    return;
                }


                const deleteButton =
                    event.target.closest(
                        "[data-delete-id]"
                    );


                if (deleteButton) {

                    deleteProduct(
                        deleteButton.dataset.deleteId
                    );

                }

            }
        );



        managementSearch?.addEventListener(
            "input",
            renderManagementList
        );



        /* =================================================
           SAVE / UPDATE
        ================================================= */

        form?.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    productName.value.trim();


                const code =
                    productCode.value.trim();


                const category =
                    productCategory.value;


                if (
                    !name ||
                    !code ||
                    !category
                ) {

                    alert(
                        "Product Name, Code এবং Category প্রয়োজন।"
                    );

                    return;
                }


                const existingId =
                    productId.value;


                const duplicate =
                    products.find(
                        function (item) {

                            return (
                                item.code
                                    .toLowerCase() ===
                                    code.toLowerCase() &&
                                item.id !==
                                    existingId
                            );

                        }
                    );


                if (duplicate) {

                    alert(
                        "এই Product Code ইতিমধ্যে আছে।"
                    );

                    return;
                }


                const productData = {

                    id:
                        existingId ||
                        createId(),

                    name:
                        name,

                    code:
                        code,

                    category:
                        category,

                    status:
                        productStatus.value,

                    sellingPrice:
                        Number(
                            sellingPrice.value
                        ) || 0,

                    dealerPrice:
                        Number(
                            dealerPrice.value
                        ) || 0,

                    stockQuantity:
                        Number(
                            stockQuantity.value
                        ) || 0,

                    serialTracking:
                        serialTracking.checked,

                    description:
                        productDescription
                            .value
                            .trim(),

                    specification:
                        productSpecification
                            .value
                            .trim(),

                    image:
                        imageWasRemoved
                            ? ""
                            : currentImage,

                    updatedAt:
                        new Date()
                            .toISOString()

                };


                if (existingId) {

                    const index =
                        products.findIndex(
                            function (item) {

                                return (
                                    item.id ===
                                    existingId
                                );

                            }
                        );


                    if (index !== -1) {

                        products[index] =
                            productData;

                    }


                    showToast(
                        "Product updated."
                    );

                } else {

                    products.unshift(
                        productData
                    );


                    showToast(
                        "Product saved."
                    );

                }


                saveProducts();


                resetForm();


                renderManagementList();

            }
        );



        /* =================================================
           NAVIGATION
        ================================================= */

        document
            .getElementById(
                "backLightingBtn"
            )
            ?.addEventListener(
                "click",
                function () {

                    window.location.href =
                        "lighting-accessories.html";

                }
            );



        /* =================================================
           INITIALIZE
        ================================================= */

        renderManagementList();

    }
);
