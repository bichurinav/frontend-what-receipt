<script setup lang="ts">
import { computed, ref, onUnmounted } from "vue";
import { useAppStore } from "../../store/app";
import { debounce, decodeToBase64 } from "../../utils/helpers";

const store = useAppStore();

const isLoading = ref(false);

const searchProducts = computed(() => store.$state.searchProducts);

const searchCompositionsAsync = debounce((value: string | null) => {
  if (!value?.length) {
    store.$patch({ searchProducts: [] });
    return;
  }
  isLoading.value = true;
  store
    .findProducts(decodeToBase64(value) as string)
    .finally(() => (isLoading.value = false));
});

onUnmounted(() => {
  store.$patch({ searchProducts: [] });
});
</script>

<template>
  <v-text-field
    :loading="isLoading"
    clearable
    @update:model-value="(value: string) => searchCompositionsAsync(value)"
    label="Какой продукт у вас есть на кухне?"
  >
    <template #prepend-inner>
      <v-icon icon="mdi-home-search-outline" />
    </template>
  </v-text-field>
  <v-list
    v-if="Boolean(searchProducts.length)"
    select-strategy="classic"
    v-model:selected="store.$state.selectedProducts"
  >
    <v-list-item
      v-for="product in searchProducts"
      :key="product"
      :value="product"
    >
      <template v-slot:prepend="{ isActive }">
        <v-list-item-action start>
          <v-checkbox-btn :model-value="isActive" color="secondary" />
        </v-list-item-action>
      </template>

      <v-list-item-title>{{ product }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<style lang="scss" scoped></style>
