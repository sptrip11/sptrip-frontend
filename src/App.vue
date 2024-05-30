<template>
    <div class="GowunBatang-Regular">
        <header v-if="isHeaderTransparent" style="background-color: rgba(0, 0, 30, 0.4)">
            <Header></Header>
        </header>
        <div class="container-fluid bg-secondary" v-else>
            <Header />
        </div>
        <router-view></router-view>
    </div>
</template>

<script setup>
import Header from '/src/components/common/Header.vue';
import Footer from '/src/components/common/Footer.vue';
import KakaoMap from './views/MapView.vue';
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useGalleryStore } from '@/stores/gallery';
import { useCommentStore } from '@/stores/comment';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const commentStore = useCommentStore();
const galleryStore = useGalleryStore();
const isHeaderTransparent = computed(() => route.path === '/');

onMounted(() => {
    userStore.init();
    galleryStore.init();
    commentStore.init();
    if (sessionStorage.getItem('token')) {
        userStore.user.userseq = sessionStorage.getItem('userseq');
        userStore.user.userId = sessionStorage.getItem('userId');
        userStore.user.userNickname = sessionStorage.getItem('userNickname');
    }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap');
</style>
