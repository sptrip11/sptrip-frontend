<template>
	<HeaderGallery />
	<RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
import HeaderGallery from "@/components/common/HeaderGallery.vue";
</script>
