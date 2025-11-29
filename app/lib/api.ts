const API_BASE_URL = "https://dummyjson.com";

export interface ApiError {
  message: string;
}

export const fetcher = async (url: string, token?: string) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({
      message: "An error occurred",
    }));
    throw new Error(error.message);
  }

  return response.json();
};

export const api = {
  login: async (username: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    return response.json();
  },

  refreshToken: async (refreshToken: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error("Token refresh failed");
    }

    return response.json();
  },

  getProducts: (
    limit: number,
    skip: number,
    search?: string,
    sortBy?: string,
    order?: string,
  ) => {
    const params = new URLSearchParams();

    if (search) {
      return `${API_BASE_URL}/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
    }

    params.append("limit", limit.toString());
    params.append("skip", skip.toString());

    if (sortBy && order) {
      params.append("sortBy", sortBy);
      params.append("order", order);
    }

    return `${API_BASE_URL}/products?${params.toString()}`;
  },

  getProduct: (id: string) => `${API_BASE_URL}/products/${id}`,

  createProduct: async (product: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/products/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error("Failed to create product");
    }

    return response.json();
  },

  updateProduct: async (id: number, product: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    return response.json();
  },

  deleteProduct: async (id: number, token: string) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete product");
    }

    return response.json();
  },

  getUsers: (
    limit: number,
    skip: number,
    search?: string,
    sortBy?: string,
    order?: string,
  ) => {
    const params = new URLSearchParams();

    if (search) {
      return `${API_BASE_URL}/users/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
    }

    params.append("limit", limit.toString());
    params.append("skip", skip.toString());

    if (sortBy && order) {
      params.append("sortBy", sortBy);
      params.append("order", order);
    }

    return `${API_BASE_URL}/users?${params.toString()}`;
  },

  getUser: (id: string) => `${API_BASE_URL}/users/${id}`,

  createUser: async (user: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/users/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return response.json();
  },

  updateUser: async (id: number, user: any, token: string) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return response.json();
  },

  deleteUser: async (id: number, token: string) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    return response.json();
  },
};
