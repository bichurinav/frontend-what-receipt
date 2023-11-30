<script lang="ts" setup>
import ProductList from "@/components/ProductList/ProductList.vue";
import ReceiptList from "@/components/ReceiptList/ReceiptList.vue";
import { onMounted } from "vue";
import { useAppStore } from "@/store/app";

const store = useAppStore();

onMounted(() => {
  let products = localStorage.getItem("products") || null;
  products = JSON.parse(products as string);
  if (Array.isArray(products)) {
    store.$patch({ selectedProducts: products });
  }
});
</script>

<template>
  <ProductList />
  <ReceiptList />
</template>

<style lang="scss"></style>
