import api from "./api.js";

// CREATE
export const createCategory = (data) => {
  return api.post("/categories", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// GET ALL
export const getCategories = () => {
  return api.get("/categories");
};

// GET ONE
export const getCategoryById = (id) => {
  return api.get(`/categories/${id}`);
};

// UPDATE
export const updateCategory = (id, data) => {
  return api.put(`/categories/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// DELETE
export const deleteCategory = (id) => {
  return api.delete(`/categories/${id}`);
};
