<script setup lang="ts">
import { ref, computed } from "vue";
import { ICard } from "./types";
import { useAppStore } from "@/store/app";

const props = defineProps<ICard>();

const store = useAppStore();

const expand = ref<boolean>(false);

const selectedProducts = computed(
  (): string[] => store.$state.selectedProducts
);

const isExistInProducts = (currentProduct: string) => {
  let isExist = false;

  selectedProducts.value.forEach((el) => {
    if (isExist) return;
    const product = [...el].slice(0, -1).join("");
    isExist = new RegExp(product, "gi").test(currentProduct);
  });

  return isExist;
};
</script>

<template>
  <v-card class="receipt-card mx-auto">
    <v-img class="align-end text-white" height="200" :src="props.image" cover>
      <v-card-title class="receipt-card__title text-subtitle-2 text-sm-h6">{{
        props.title
      }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4">
      Время готовки: {{ props.cooktime }}
    </v-card-subtitle>

    <v-expand-transition>
      <div v-if="expand" class="pa-0 px-4">
        <v-list class="bg-transparent" density="compact">
          <v-list-item
            class="pa-0 ma-0"
            v-for="(item, idx) in props.compositions"
            :key="item + idx"
            :title="item"
          >
            <template #prepend>
              <v-icon
                v-if="isExistInProducts(item)"
                icon="mdi-check"
                color="success"
              />
              <v-icon v-else icon="mdi-minus" color="danger" />
            </template>
          </v-list-item>
        </v-list>
      </div>
    </v-expand-transition>

    <v-card-actions class="mt-2">
      <v-btn
        :href="$props.link"
        target="_blan"
        rel="nofollow"
        color="secondary"
        class="text-uppercase text-body-2 text-sm-button"
      >
        Смотреть рецепт
      </v-btn>
      <v-btn
        @click="expand = !expand"
        class="text-uppercase text-body-2 text-sm-button"
      >
        {{ !expand ? "Что используется?" : "Скрыть" }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>
.receipt-card {
  &__title {
    color: #fff;
    background: rgba(0, 0, 0, 0.4);
  }
}
</style>
