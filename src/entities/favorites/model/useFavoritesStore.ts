import { ref } from 'vue';
import { defineStore } from 'pinia';

const useFavoritesStore = defineStore(
  'favorites',
  () => {
    const favorites = ref<string[]>([]);

    function addToFavorite(documentId: string): void {
      favorites.value.push(documentId);
    }

    function removeFromFavorite(documentId: string): void {
      favorites.value = favorites.value.filter((item) => item !== documentId);
    }

    function toggleFavorite(documentId: string): void {
      if (isInFavorites(documentId)) {
        removeFromFavorite(documentId);
      } else {
        addToFavorite(documentId);
      }
    }

    function isInFavorites(documentId: string): boolean {
      return favorites.value.includes(documentId);
    }

    return {
      favorites,
      toggleFavorite,
      addToFavorite,
      removeFromFavorite,
      isInFavorites,
    };
  },
  {
    persist: true,
  },
);

export default useFavoritesStore;