import axios from "axios";

export const fetchProductById = async (id) => {
  const data = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return data;
};
