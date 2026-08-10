/* =========================================================
   LUMENIX
   LIGHTING & ACCESSORIES
   Lightweight Product Module
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        "use strict";


        /* =================================================
           PRODUCT DATA

           No fake price / stock / business information.
           These are category placeholders only.
           ================================================= */

        const products = [

            {
                name:
                    "LED Lighting",

                description:
                    "LED lighting products and solutions.",

                category:
                    "lighting",

                icon:
                    "💡"
            },


            {
                name:
                    "Indoor Lighting",

                description:
                    "Lighting products for indoor use.",

                category:
                    "lighting",

                icon:
                    "🏠"
            },


            {
                name:
                    "Outdoor Lighting",

                description:
                    "Lighting products for outdoor applications.",

                category:
                    "lighting",

                icon:
                    "🌟"
            },


            {
                name:
                    "Lighting Accessories",

                description:
                    "Accessories related to lighting products.",

                category:
                    "accessories",

                icon:
                    "🔌"
            },


            {
                name:
                    "Electrical Accessories",

                description:
                    "Electrical accessories for lighting-related use.",

                category:
                    "accessories",

                icon:
                    "⚡"
            }


        ];


        /* =================================================
           ELEMENTS
           ================================================= */

        const productGrid =
            document.getElementById(
                "productGrid"
            );


        const emptyState =
            document.getElementById(
                "emptyState"
            );


        const searchInput =
            document.getElementById(
                "productSearch"
            );


        const categoryButtons =
            document.querySelectorAll(
                ".category-btn"
            );


        let selectedCategory =
            "all";


        /* =================================================
           RENDER
           ================================================= */

        function renderProducts() {

            if (!productGrid) {
                return;
            }


            const search =
                searchInput
                    ? searchInput.value
                        .trim()
                        .toLowerCase()
                    : "";


            const filtered =
                products.filter(
                    function (product) {

                        const matchesCategory =
                            selectedCategory === "all" ||
                            product.category ===
                                selectedCategory;


                        const searchable =
                            (
                                product.name +
                                " " +
                                product.description
                            )
                                .toLowerCase();


                        const matchesSearch =
                            !search ||
                            searchable.includes(
                                search
                            );


                        return (
                            matchesCategory &&
                            matchesSearch
                        );

                    }
                );


            productGrid.innerHTML = "";


            if (!filtered.length) {

                if (emptyState) {
                    emptyState.hidden = false;
                }

                return;
            }


            if (emptyState) {
                emptyState.hidden = true;
            }


            filtered.forEach(
                function (product) {

                    const card =
                        document.createElement(
                            "article"
                        );


                    card.className =
                        "product-card";


                    card.innerHTML = `

                        <div class="product-icon">
                            ${product.icon}
                        </div>

                        <h3>
                            ${escapeHTML(
                                product.name
                            )}
                        </h3>

                        <p>
                            ${escapeHTML(
                                product.description
                            )}
                        </p>

                        <span class="product-tag">
                            ${product.category === "lighting"
                                ? "Lighting"
                                : "Accessories"}
                        </span>

                    `;


                    productGrid.appendChild(
                        card
                    );

                }
            );

        }


        /* =================================================
           HTML SAFETY
           ================================================= */

        function escapeHTML(value) {

            return String(value || "")
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
           CATEGORY FILTER
           ================================================= */

        categoryButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        categoryButtons
                            .forEach(
                                function (item) {

                                    item.classList
                                        .remove(
                                            "active"
                                        );

                                }
                            );


                        button.classList.add(
                            "active"
                        );


                        selectedCategory =
                            button.dataset.category;


                        renderProducts();

                    }
                );

            }
        );


        /* =================================================
           SEARCH
           ================================================= */

        searchInput?.addEventListener(
            "input",
            renderProducts
        );


        /* =================================================
           HOME
           ================================================= */

        function goHome() {

            window.location.href =
                "index.html";

        }


        document
            .getElementById("homeBtn")
            ?.addEventListener(
                "click",
                goHome
            );


        document
            .getElementById("backBtn")
            ?.addEventListener(
                "click",
                goHome
            );


        /* =================================================
           ADMIN
           ================================================= */

        document
            .getElementById("adminBtn")
            ?.addEventListener(
                "click",
                function () {

                    window.location.href =
                        "admin.html";

                }
            );


        /* =================================================
           INITIALIZE
           ================================================= */

        renderProducts();


        console.log(
            "LUMENIX Lighting & Accessories loaded."
        );

    }
);
