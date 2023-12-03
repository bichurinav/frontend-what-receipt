<script setup lang="ts">
import { ref } from "vue";
import { ICard } from "./types";

const props = defineProps<{ data: ICard }>();

const expand = ref<boolean>(false);

const isExistInProducts = (
  matchedProducts: string[],
  currentProduct: string
) => {
  return matchedProducts.includes(currentProduct);
};
</script>

<template>
  <v-card class="receipt-card mx-auto">
    <v-img
      class="align-end text-white"
      height="200"
      :src="props.data.image"
      cover
    >
      <v-card-title class="receipt-card__title text-subtitle-2 text-sm-h6">{{
        props.data.title
      }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4">
      Время готовки: {{ props.data.cooktime }}
    </v-card-subtitle>

    <v-expand-transition>
      <div v-if="expand" class="pa-0 px-4">
        <v-list class="bg-transparent" density="compact">
          <v-list-item
            class="pa-0 ma-0"
            v-for="(item, idx) in props.data.compositions"
            :key="item + idx"
            :title="item"
          >
            <template #prepend>
              <v-icon
                v-if="isExistInProducts(props.data.matchedProducts, item)"
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
        :href="props.data.link"
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
