/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

class PointOfSale {
  constructor(options) {
    this.baseUrl = options.baseUrl || "";
    this.currentPage = 1;
    this.pageSize = 10; // Default page size
  }

  async getProducts(options = {}) {
    const {
      page = this.currentPage,
      pageSize = this.pageSize,
      query = "",
    } = options;
    const fetchProductsFromAPI = async (page, pageSize, query = "") => {
      try {
        const url = `${this.baseUrl}/products?page=${page}&pageSize=${pageSize}&query=${query}`;
        const response = await fetch(url, {
          headers: {
            Authorization: `bearer ${localStorage.getItem("access-token")}`,
          },
        });
        if (response.ok) {
          return response
            .json()
            .then((data) => ({ status: response.status, data }));
        } else {
          throw Error("Failed to fetch product data from the API.");
        }
      } catch (error) {
        console.error(error);
        throw Error("An error occurred while fetching product data:", error);
      }
    };
    return fetchProductsFromAPI(page, pageSize, query).then((data) => ({
      ...data,
      next: () => {
        return fetchProductsFromAPI(page + 1, pageSize, query);
      },
    }));
  }

  async addToCart({ productId, quantity }) {
    if (productId < 0) {
      console.log("Invalid product index");
      return;
    }
    try {
      const response = await fetch("${this.baseUrl}/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (response.ok) {
        console.log(`Added ${quantity} x ${product.name} to the cart.`);
      } else {
        console.error("Failed to add to cart. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred while adding to cart:", error);
    }
  }

  async checkout() {
    try {
      const response = await fetch("${this.baseUrl}/checkout", {
        method: "POST",
        headers: {
          Authorization: `bearer ${localStorage.getItem("access-token")}`,
        },
      });

      if (response.ok) {
        console.log("Thank you for your purchase!");
      } else {
        console.error("Checkout failed. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred during checkout:", error);
    }
  }
}

module.exports = PointOfSale;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _pos__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_pos__WEBPACK_IMPORTED_MODULE_0__);

window.PointOfSale = (_pos__WEBPACK_IMPORTED_MODULE_0___default());

})();

/******/ })()
;