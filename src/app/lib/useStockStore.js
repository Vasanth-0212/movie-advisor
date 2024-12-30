import { create } from 'zustand';

const useStore = create((set) => ({
  wishlist: [],
  setWishList : (wishlist) => set({ wishlist }),
}));

export default useStore;