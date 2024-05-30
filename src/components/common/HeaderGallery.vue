<template>
    <div class="empty-container">
        <div class="header-gallery-container">
            <ul>
                <li @click="gotoListAll()">전체 목록</li>
                <li @click="gotoInsert()">글쓰기</li>
                <li @click="gotoListMe()">내 글 관리</li>
            </ul>

            <div class="header-gallery-sort-list">
                <text>조회 기준</text>
                <li @click="sortLatest()">
                    최신 순
                    <text v-if="sortFlag == 0">▼</text>
                    <text v-if="sortFlag == 1">▲</text>
                </li>
                <li @click="sortRecommend()">
                    추천 순
                    <text v-if="sortFlag == 2">▼</text>
                    <text v-if="sortFlag == 3">▲</text>
                </li>
                <li @click="sortComment()">
                    댓글 순
                    <text v-if="sortFlag == 4">▼</text>
                    <text v-if="sortFlag == 5">▲</text>
                </li>
                <li @click="sortView()">
                    조회 순
                    <text v-if="sortFlag == 6">▼</text>
                    <text v-if="sortFlag == 7">▲</text>
                </li>
                <li @click="toggleHide()">
                    <text v-if="isHide" style="font-size: 1rem">★</text>
                    <text v-else style="font-size: 1rem">☆</text>
                </li>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useGalleryStore } from '@/stores/gallery';
import { useRoute, useRouter } from 'vue-router';
const galleryStore = useGalleryStore();
const { sortLatest, sortRecommend, sortComment, sortView, toggleHide } = galleryStore;
const { sortFlag, isHide } = storeToRefs(galleryStore);

const route = useRoute();
const router = useRouter();

const gotoListAll = () => {
    if (router.currentRoute.value.path == '/gallery') {
        galleryStore.initItems();
        galleryStore.fetchGalleryItems();
    } else {
        router.push('/gallery');
    }
};
const gotoInsert = () => {
    const userSeq = sessionStorage.getItem('userSeq');
    if (userSeq == null) {
        alert('로그인 후 이용해주세요!');
    } else {
        router.push('/gallery/insert');
    }
};
const gotoListMe = () => {
    const userSeq = sessionStorage.getItem('userSeq');
    if (userSeq == null) {
        alert('로그인 후 이용해주세요!');
        return;
    }

    if (router.currentRoute.value.path == '/gallery') {
        galleryStore.toggleOnlyMe();
    } else {
        router.push('/gallery?onlyMe=true');
    }
};
</script>

<style>
.empty-container {
    background-color: rgb(232, 235, 238);
}
.header-gallery-container {
    display: flex;
    padding: 20px;
    margin: auto; /* 수직 가운데 정렬 */
    max-width: 1056px; /* 최대 너비 55% */
    width: 1056px;
}

@media (max-width: 1100px) {
    .header-gallery-container {
        max-width: 100%;
    }
}

.header-gallery-container ul li {
    float: left;
    font-size: 1.2rem;
    margin: 10px;
    color: black;
}

.header-gallery-sort-list {
    display: flex;
    margin: 10px;
    gap: 0.5rem;
}
.header-gallery-sort-list text {
    font-size: 1.2rem;
    border-radius: 10%;
    border: 0.4px solid rgb(164, 164, 168);
}
.header-gallery-sort-list li {
    font-size: 0.9rem;
    margin-top: 0.2rem;
    border-radius: 10%;
    border: 0.4px solid rgb(201, 202, 203);
}
.header-gallery-sort-list li text {
    font-size: 0.6rem;
    margin-top: 0.2rem;
    border: none;
}
</style>

<script>
/*
nav:after {
	content: "";
	display: table;
	clear: both;
}

nav ul {
	
}

nav ul li {
	margin: 0px;
	display: inline-block;
	float: left;
}*/
</script>
