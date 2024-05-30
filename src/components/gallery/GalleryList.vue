<template>
    <div class="empty-container">
        <section class="gallery py-5" id="gallery">
            <div class="container py-md-5">
                <div class="header mb-3 mb-sm-5 text-center">
                    <h3 class="heading text-center mb-3 mb-sm-5">갤러리</h3>
                    <p class="heading text-center mb-3 mb-sm-5">우리나라의 아름다운 풍경을 공유하고, 감상해봐요!</p>
                    <div class="row news-grids text-center" v-if="isLoading">Loading...</div>
                    <div class="row news-grids text-center" v-else>
                        <Card v-for="item in galleryItems" :key="item.boardId" :item="item" v-show="!isHide || item.liked" />
                    </div>
                </div>
            </div>
        </section>
    </div>
    <!--// gallery -->
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useGalleryStore } from '@/stores/gallery';
import { onMounted, onBeforeUnmount, onUnmounted, computed, ref, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import Card from '/src/components/gallery/GalleryCard.vue';

const route = useRoute();
const galleryStore = useGalleryStore();
const { galleryItems, isHide } = storeToRefs(galleryStore);

const isLoading = computed(() => galleryStore.isLoading);

onMounted(() => {
    galleryStore.initItems();
    galleryStore.fetchGalleryItems(route.query.onlyMe);
    window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => {
    //const scrollHeight = document.documentElement.scrollHeight;
    //let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    //if (scrollHeight - (window.innerHeight + scrollPosition) < 1 && !isLoading.value) galleryStore.fetchGalleryItems();
};
</script>

<style>
.gal-img img {
    width: 100%;
    height: 15rem; /* 원하는 높이로 설정 */
    object-fit: cover;
}
.gal-img span {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
}
</style>
