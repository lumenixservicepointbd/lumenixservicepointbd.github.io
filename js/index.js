/* =========================================================
   LUMENIX™
   HOME PAGE CONTROLLER
   Lightweight / Mobile First
   ========================================================= */

"use strict";


document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       CONFIG
    ===================================================== */

    const WHATSAPP_NUMBER =
        "8801710897732";

    const PRODUCT_STORAGE_KEY =
        "lumenix_lighting_products";


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const menuBtn =
        document.getElementById("menuBtn");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const exploreBtn =
        document.getElementById("exploreBtn");

    const productGrid =
        document.getElementById(
            "lightingProductGrid"
        );

    const productModal =
        document.getElementById(
            "productModal"
        );

    const modalClose =
        document.getElementById(
            "modalClose"
        );

    const modalContent =
        document.getElementById(
            "modalProductContent"
        );

    const toast =
        document.getElementById("toast");


    /* =====================================================
       DEFAULT PRODUCT DATA

       এই data structure রাখা হয়েছে যাতে ভবিষ্যতে
       Admin section থেকে product data replace/update
       করা সহজ হয়।

       Product name English.
       Description/details বাংলা।
       ===================================================== */

    const defaultProducts = [

    {
        id: "7W",
        name: "7 Watt",
        brand: "LUMENIX™",
        image: "images/7watt.png",
        packageImage: "images/7watt-package.png",
        description:
            "দৈনন্দিন আলো ব্যবহারের জন্য উপযোগী LUMENIX™ 7 Watt লাইট।",
        details:
            "LUMENIX™ 7 Watt লাইটের বিস্তারিত তথ্য ও বৈশিষ্ট্য Admin section থেকে পরবর্তীতে পরিবর্তন করা যাবে।",
        active: true
    },

    {
        id: "12W",
        name: "12 Watt",
        brand: "LUMENIX™",
        image: "images/12watt.png",
        packageImage: "images/12watt-package.png",
        description:
            "বাড়ি, দোকান ও প্রয়োজনীয় বিভিন্ন স্থানে ব্যবহারের জন্য উপযোগী LUMENIX™ 12 Watt লাইট।",
        details:
            "LUMENIX™ 12 Watt লাইটের বিস্তারিত তথ্য ও বৈশিষ্ট্য Admin section থেকে পরবর্তীতে পরিবর্তন করা যাবে।",
        active: true
    },

    {
        id: "20W",
        name: "20 Watt",
        brand: "LUMENIX™",
        image: "images/20watt.png",
        packageImage: "images/20watt-package.png",
        description:
            "বেশি আলোর প্রয়োজনের জন্য উপযোগী LUMENIX™ 20 Watt লাইট।",
        details:
            "LUMENIX™ 20 Watt লাইটের বিস্তারিত তথ্য ও বৈশিষ্ট্য Admin section থেকে পরবর্তীতে পরিবর্তন করা যাবে।",
        active: true
    }

];


    /* =====================================================
       HELPERS
    ===================================================== */

    function escapeHTML(value) {

        return String(value ?? "")

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


    function showToast(message) {

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
                2400
            );
    }


    function getStoredProducts() {

        try {

            const saved =
                localStorage.getItem(
                    PRODUCT_STORAGE_KEY
                );

            if (!saved) {

                return defaultProducts;
            }


            const parsed =
                JSON.parse(saved);


            if (
                !Array.isArray(parsed)
            ) {

                return defaultProducts;
            }


            return parsed;

        } catch (error) {

            console.warn(
                "LUMENIX product data could not be loaded.",
                error
            );

            return defaultProducts;
        }
    }


    /* =====================================================
       MENU
    ===================================================== */

    if (
        menuBtn &&
        mobileMenu
    ) {

        menuBtn.addEventListener(
            "click",
            function () {

                const active =
                    mobileMenu.classList.toggle(
                        "active"
                    );


                menuBtn.setAttribute(
                    "aria-expanded",
                    active
                        ? "true"
                        : "false"
                );

            }
        );

    }


    /* =====================================================
       CLOSE MENU AFTER NAVIGATION
    ===================================================== */

    if (mobileMenu) {

        mobileMenu
            .querySelectorAll("a")
            .forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            mobileMenu.classList.remove(
                                "active"
                            );

                            if (menuBtn) {

                                menuBtn.setAttribute(
                                    "aria-expanded",
                                    "false"
                                );

                            }

                        }
                    );

                }
            );

    }


    /* =====================================================
       EXPLORE
    ===================================================== */

    if (exploreBtn) {

        exploreBtn.addEventListener(
            "click",
            function () {

                const ecosystem =
                    document.getElementById(
                        "ecosystem"
                    );


                if (ecosystem) {

                    ecosystem.scrollIntoView({
                        behavior:
                            "smooth",
                        block:
                            "start"
                    });

                }

            }
        );

    }


    /* =====================================================
       PRODUCT IMAGE FALLBACK
    ===================================================== */

    function addImageFallbacks() {

        if (!productGrid) {
            return;
        }


        productGrid
            .querySelectorAll(
                "img"
            )
            .forEach(
                function (image) {

                    image.addEventListener(
                        "error",
                        function () {

                            image.style.display =
                                "none";

                            const parent =
                                image.parentElement;


                            if (
                                parent &&
                                !parent.querySelector(
                                    ".image-fallback"
                                )
                            ) {

                                const fallback =
                                    document.createElement(
                                        "div"
                                    );

                                fallback.className =
                                    "image-fallback";

                                fallback.textContent =
                                    "ছবি যোগ করা হয়নি";

                                fallback.style.cssText =
                                    `
                                    color:#667085;
                                    font-size:13px;
                                    text-align:center;
                                    `;

                                parent.appendChild(
                                    fallback
                                );

                            }

                        },
                        {
                            once: true
                        }
                    );

                }
            );

    }


    /* =====================================================
       RENDER PRODUCTS
    ===================================================== */

    function renderProducts() {

        if (!productGrid) {
            return;
        }


        const products =
            getStoredProducts()
                .filter(
                    function (product) {

                        return (
                            product &&
                            product.active !== false
                        );

                    }
                );


        if (!products.length) {

            productGrid.innerHTML = `

                <div
                    style="
                        grid-column:1/-1;
                        text-align:center;
                        padding:30px;
                        color:#667085;
                    "
                >
                    বর্তমানে কোনো পণ্য প্রদর্শনের জন্য নেই।
                </div>

            `;

            return;
        }


        productGrid.innerHTML =
            products
                .map(
                    function (product) {

                        return `

                            <article
                                class="product-card"
                                data-product-id="${escapeHTML(
                                    product.id
                                )}"
                            >

                                <div
                                    class="product-image-wrap"
                                >

                                    <img
                                        src="${escapeHTML(
                                            product.image
                                        )}"
                                        alt="${escapeHTML(
                                            product.name
                                        )}"
                                        class="product-image"
                                        loading="lazy"
                                    >

                                </div>


                                <div class="product-info">

                                    <span
                                        class="product-brand"
                                    >
                                        ${escapeHTML(
                                            product.brand ||
                                            "LUMENIX™"
                                        )}
                                    </span>


                                    <h3
                                        class="product-name"
                                    >
                                        ${escapeHTML(
                                            product.name
                                        )}
                                    </h3>


                                    <p
                                        class="product-description"
                                    >
                                        ${escapeHTML(
                                            product.description
                                        )}
                                    </p>


                                    <button
                                        type="button"
                                        class="product-view-btn"
                                        data-product-view="${escapeHTML(
                                            product.id
                                        )}"
                                    >
                                        View Details
                                    </button>

                                </div>

                            </article>

                        `;

                    }
                )
                .join("");


        addImageFallbacks();

    }


    /* =====================================================
       OPEN PRODUCT DETAILS
    ===================================================== */

    function openProductDetails(
        productId
    ) {

        const products =
            getStoredProducts();


        const product =
            products.find(
                function (item) {

                    return (
                        item.id ===
                        productId
                    );

                }
            );


        if (!product) {

            showToast(
                "পণ্যের তথ্য পাওয়া যায়নি।"
            );

            return;
        }


        if (!modalContent) {
            return;
        }


        const packageImage =
            product.packageImage;


        modalContent.innerHTML = `

            <div>

                <img
                    src="${escapeHTML(
                        product.image
                    )}"
                    alt="${escapeHTML(
                        product.name
                    )}"
                    class="modal-product-image"
                    id="modalProductImage"
                >


                <span
                    style="
                        color:#F58220;
                        font-size:11px;
                        font-weight:900;
                    "
                >
                    ${escapeHTML(
                        product.brand ||
                        "LUMENIX™"
                    )}
                </span>


                <h2>
                    ${escapeHTML(
                        product.name
                    )}
                </h2>


                <p>
                    ${escapeHTML(
                        product.details ||
                        product.description ||
                        ""
                    )}
                </p>


                ${
                    packageImage
                        ? `
                            <button
                                type="button"
                                id="showPackageBtn"
                                class="small-btn"
                            >
                                প্যাকেটের ছবি দেখুন
                            </button>
                          `
                        : ""
                }


                <a
                    href="https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        "আমি LUMENIX™ " +
                        product.name +
                        " সম্পর্কে জানতে চাই।"
                    )}"
                    target="_blank"
                    rel="noopener"
                    class="whatsapp-large"
                    style="
                        width:100%;
                        margin-top:10px;
                    "
                >
                    <span class="wa-symbol">
                        ◉
                    </span>

                    WhatsApp-এ জানতে চাই

                </a>

            </div>

        `;


        if (productModal) {

            productModal.classList.add(
                "active"
            );

            productModal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow =
                "hidden";

        }


        const packageBtn =
            document.getElementById(
                "showPackageBtn"
            );


        if (packageBtn) {

            packageBtn.addEventListener(
                "click",
                function () {

                    const image =
                        document.getElementById(
                            "modalProductImage"
                        );


                    if (!image) {
                        return;
                    }


                    if (
                        image.dataset.package !==
                        "true"
                    ) {

                        image.src =
                            product.packageImage;

                        image.dataset.package =
                            "true";

                        packageBtn.textContent =
                            "লাইটের ছবি দেখুন";

                    } else {

                        image.src =
                            product.image;

                        image.dataset.package =
                            "false";

                        packageBtn.textContent =
                            "প্যাকেটের ছবি দেখুন";

                    }

                }
            );

        }

    }


    /* =====================================================
       PRODUCT CLICK
    ===================================================== */

    if (productGrid) {

        productGrid.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(
                        "[data-product-view]"
                    );


                if (!button) {
                    return;
                }


                openProductDetails(
                    button.dataset.productView
                );

            }
        );

    }


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    function closeProductModal() {

        if (!productModal) {
            return;
        }


        productModal.classList.remove(
            "active"
        );

        productModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";

    }


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeProductModal
        );

    }


    if (productModal) {

        const backdrop =
            productModal.querySelector(
                ".modal-backdrop"
            );


        if (backdrop) {

            backdrop.addEventListener(
                "click",
                closeProductModal
            );

        }

    }


    /* =====================================================
       ESCAPE
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                productModal &&
                productModal.classList.contains(
                    "active"
                )
            ) {

                closeProductModal();

            }

        }
    );


    /* =====================================================
       ADMIN DATA SYNC

       অন্য module থেকে localStorage-এ
       product update হলে Home Page refresh
       করতে পারবে।
    ===================================================== */

    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key ===
                PRODUCT_STORAGE_KEY
            ) {

                renderProducts();

            }

        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    renderProducts();


    console.log(
        "LUMENIX™ Home Page loaded successfully."
    );

});
