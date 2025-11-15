import React from "react";
import axios from "axios";
import { API_URL } from "../../../src/admin/config";

export const getWishlist = (token) =>
  axios.get(`${API_URL}/wishlist`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const removeFromWishlist = (productId, token) =>
  axios.delete(`${API_URL}/wishlist/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const addToWishlist = (productId, token) =>
  axios.post(
    `${API_URL}/wishlist/add`,
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
