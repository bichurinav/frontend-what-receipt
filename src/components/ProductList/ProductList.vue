<script lang="ts" setup>
import { computed, watch } from "vue";
import SearchProducts from "@/components/ProductList/SearchProducts.vue";
import { useAppStore } from "@/store/app";

const store = useAppStore();

const selectedProducts = computed(() => store.$state.selectedProducts);

watch(
  () => selectedProducts.value,
  (val: string[]) => {
    localStorage.setItem("products", JSON.stringify(val));
  }
);
</script>

<template>
  <v-expansion-panels class="product-list">
    <v-expansion-panel title="Список ваших продуктов">
      <v-expansion-panel-text>
        <v-row class="mt-2 ga-2">
          <v-col
            v-for="(selection, i) in selectedProducts"
            :key="selection + i"
            class="pa-0"
            cols="auto"
          >
            <v-chip
              closable
              @click:close="store.removeProduct(selection)"
              theme="primary"
            >
              <template #close>
                <v-icon icon="mdi-close" color="danger" />
              </template>
              {{ selection }}
            </v-chip>
          </v-col>
          <v-col
            cols="12"
            class="pa-1"
            v-if="!Boolean(selectedProducts.length)"
          >
            <span class="text-subtitle-2">Ваш cписок пуст</span>
          </v-col>
          <v-col cols="12">
            <SearchProducts />
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style lang="scss" scoped></style>
