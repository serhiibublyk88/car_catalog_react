import { api } from "./api";

export const CarService = {
  async getAll() {
    const response = await api.get("/cars");
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/cars/${id}`);
    return response.data;
  },

  async create(car) {
    const response = await api.post("/cars", car);
    return response.data;
  },

  async deleteCar(id) {
    const response = await api.delete(`/cars/${id}`);
    return response.data;
  },

  async update(id, updatedCar) {
    const response = await api.put(`/cars/${id}`, updatedCar);
    return response.data;
  },
};
