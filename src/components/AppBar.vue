<script setup lang="ts">
import TabsBase from "@/components/UI/Tabs/TabsBase.vue";
import { TabsName } from "@/constants";
import { ITab } from "@/components/UI/Tabs/TabsBase.types";
// import { watch, ref } from "vue";

import { useAppStore } from "@/store/app";
const store = useAppStore();

const tabs: ITab[] = [
  {
    id: "goryachie_bliuda",
    name: TabsName.goryachie_bliuda,
    icon: "mdi-food-steak",
  },
  {
    id: "soup",
    name: TabsName.soup,
    icon: "mdi-noodles",
  },
  {
    id: "salad",
    name: TabsName.salad,
    icon: "mdi-grass",
  },
  {
    id: "sousy",
    name: TabsName.sousy,
    icon: "mdi-food-variant",
  },
  {
    id: "zakuski",
    name: TabsName.zakuski,
    icon: "mdi-french-fries",
  },
];

const updateTab = (value: ITab) => {
  store.$patch({ currentTab: value });
};
</script>

<template>
  <v-app-bar class="app-bar" color="primary" density="compact" elevation="0">
    <template #image>
      <v-img gradient="to top right, rgb(177,225,214), rgb(23,119,133)" />
    </template>

    <template #prepend>
      <v-icon icon="mdi-cookie-clock" color="primary"></v-icon>
    </template>

    <template #extension>
      <TabsBase @update:modelValue="updateTab" :tabs="tabs" />
    </template>

    <v-app-bar-title class="app-bar__title">
      Мм, чтобы приготовить?
    </v-app-bar-title>
  </v-app-bar>
</template>

<style lang="scss" scoped>
.app-bar {
  &__title {
    color: #fff;
  }
}
</style>
