<script setup lang="ts">
import { ITab } from "./TabsBase.types";

interface Props {
  tabs: ITab[];
}

const props = defineProps<Props>();
</script>

<template>
  <v-tabs
    class="w-100 tabs"
    align-tabs="center"
    show-arrows
    center-active
    bg-color="primary"
  >
    <v-tab
      v-for="tab in props.tabs"
      :key="tab.id"
      :prepend-icon="tab.icon"
      :value="tab"
    >
      {{ tab.name }}
    </v-tab>
  </v-tabs>
</template>
