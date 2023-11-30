<script lang="ts" setup>
import AppBar from "@/components/AppBar.vue";
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <AppBar />
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
.bar-title {
  color: #fff;
  text-align: center;
}
</style>
