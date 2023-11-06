class PointOfSale {
  constructor(options) {
    this.baseUrl = options.baseUrl || "";
    this.page = options.page || 1;
    this.pageSize = options.pageSize || 10;
  }

  async getProducts(options = {}) {
    const { page = this.page, pageSize = this.pageSize, query = "" } = options;
    const fetchProductsFromAPI = async (page, pageSize, query = "") => {
      try {
        const url = `${this.baseUrl}/api/v1/products?page=${page}&pageSize=${pageSize}&query=${query}`;
        const response = await fetch(url, {
          headers: {
            Authorization: `bearer ${localStorage.getItem("access-token")}`,
            "X-API-Key": localStorage.getItem("access-token"),
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
      currentPage: page,
      prev:
        page - 1 > 0
          ? () => {
              return this.getProducts({ page: page - 1, pageSize, query });
            }
          : undefined,
      next: () => {
        return this.getProducts({ page: page + 1, pageSize, query });
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
