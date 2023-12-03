<script setup lang="ts">
import ReceiptCard from "./ReceiptCard.vue";
import { useAppStore } from "../../store/app";
import { ref, computed, watchEffect } from "vue";
import { ICard } from "./types";
const store = useAppStore();

const selectedProducts = computed(() => store.$state.selectedProducts);
const currentCateogory = computed(() => store.$state.currentTab);
const receiptList = computed((): ICard[] | [] => store.$state.receiptList);
const total = computed((): number => store.$state.totalReceipts);
const isLoading = ref<boolean>(false);

watchEffect(() => {
  if (!selectedProducts.value.length) {
    if (receiptList.value.length) {
      store.$patch({ receiptList: [], totalReceipts: 0 });
    }
    return;
  }
  isLoading.value = true;
  store.getReceipts(currentCateogory.value.id).finally(() => {
    isLoading.value = false;
  });
});
</script>

<template>
  <div class="receipt-list">
    <h3 class="my-3 text-h6 d-flex align-center">
      Список подходящих рецептов ({{ total }})
      <v-progress-circular
        v-if="isLoading"
        class="ms-2"
        color="secondary"
        indeterminate
        :size="24"
      ></v-progress-circular>
    </h3>
    <h5 class="text-silver text-subtitle-1" v-if="!receiptList.length">
      Пополните список продуктов
    </h5>
    <v-virtual-scroll :height="605" :items="receiptList">
      <template v-slot:default="{ item }">
        <ReceiptCard class="mb-2" :data="item" />
      </template>
    </v-virtual-scroll>
  </div>
</template>

<style lang="scss" scoped></style>
