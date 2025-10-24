import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useNotificationStore } from '@shoppe/entities/notification';

const useCartStore = defineStore(
  'cart',
  () => {
    const cart = ref<{ documentId: string; quantity: number }[]>([]);
    const { notify } = useNotificationStore();

    const productsQuantity = computed<number>(() => cart.value.length);

    const isCartEmpty = computed<boolean>(() => !productsQuantity.value);

    function addToCart({
      documentId,
      productName,
      quantity = 1,
    }: {
      documentId: string;
      productName: string;
      quantity?: number;
    }): void {
      cart.value.push({ documentId, quantity });
      notify.success(productName + ' added to your Shopping bag.');
    }

    function removeFromCart({ documentId }: { documentId: string }): void {
      cart.value = cart.value.filter((item) => item.documentId !== documentId);
    }

    function incrementQuantity({ documentId }: { documentId: string }): void {
      const item = cart.value.find((item) => item.documentId === documentId);
      if (!item) return;
      item.quantity++;
    }

    function decrementQuantity({ documentId }: { documentId: string }): void {
      const item = cart.value.find((item) => item.documentId === documentId);
      if (!item) return;
      item.quantity--;
    }

    function setQuantity({
      documentId,
      value,
    }: {
      documentId: string;
      value: number;
    }): void {
      const item = cart.value.find((item) => item.documentId === documentId);
      if (!item) return;
      item.quantity = value;
    }

    function isInCart({ documentId }: { documentId: string }): boolean {
      return cart.value.some((item) => item.documentId === documentId);
    }

    function findItemInCart({
      documentId,
    }: {
      documentId: string;
    }): { documentId: string; quantity: number } | undefined {
      return cart.value.find((item) => item.documentId === documentId);
    }

    return {
      cart,
      productsQuantity,
      isCartEmpty,
      addToCart,
      removeFromCart,
      incrementQuantity,
      decrementQuantity,
      setQuantity,
      isInCart,
      findItemInCart,
    };
  },
  {
    persist: true,
  },
);

export default useCartStore;