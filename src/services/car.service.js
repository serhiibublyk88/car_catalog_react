import { apiClient } from '@/services';

export const CarService = {
  getAll: () => request('get', '/cars'),
  getById: (id) => request('get', `/cars/${id}`),
  create: (car) => request('post', '/cars', car),
  deleteCar: (id) => request('delete', `/cars/${id}`),
  update: (id, updatedCar) => request('put', `/cars/${id}`, updatedCar),
};

async function request(method, url, data) {
  const response = await apiClient({ method, url, data });
  return response.data;
}
