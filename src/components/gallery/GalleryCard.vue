<template>
    <div class="col-md-4 gal-img">
        <router-link :to="{ name: 'galleryDetail', params: { id: item.boardId } }" custom v-slot="{ navigate }">
            <div class="img-container">
                <a @click="navigate" role="link">
                    <img :src="profileImagePath" class="img-fluid" />
                    <span>{{ item.boardTitle }}</span>
                    <div class="card-stat">
                        <div style="width: 30%; text-align: left; font-weight: 300">&nbsp;&nbsp;{{ item.userNickname }}</div>
                        <div style="width: 70%">👁‍🗨 {{ item.boardCntWtd }} 💬 {{ item.boardCntCmt }} 👍 {{ item.boardCntLkd }}</div>
                    </div>
                </a>
                <div class="like-container">
                    <i class="fa fa-heart" :class="{ far: !likeFlag, fas: likeFlag, liked: likeFlag }" @click="toggleLike()"></i>
                </div>
            </div>
        </router-link>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useGalleryStore } from '@/stores/gallery';
import { storeToRefs } from 'pinia';
const galleryStore = useGalleryStore();
const { galleryItem } = storeToRefs(galleryStore);
const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});

const likeFlag = computed(() => props.item.liked);
const profileImagePath = computed(() => `http://localhost:8080/api/image?path=${props.item.boardImageUrl}`);
const toggleLike = async () => {
    let res;
    if (!props.item.liked) res = await galleryStore.createBoardLike(props.item.boardId);
    else res = await galleryStore.deleteBoardLike(props.item.boardId);
    if (res) {
        if (props.item.liked) {
            props.item.boardCntLkd--;
            props.item.liked = false;
        } else {
            props.item.boardCntLkd++;
            props.item.liked = true;
        }
    }
};
</script>

<style>
.card-stat {
    display: flex;
    justify-content: flex-start;
}
</style>
