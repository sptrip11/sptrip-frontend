<template>
    <div class="background" :style="{ backgroundImage: `url(${defaultBackground})`, height: '70vh' }">
        <div class="profile-container">
            <div class="button-container">
                <router-link to="/" class="follow-button">팔로우</router-link>
                <button class="edit-button" @click="toggleEditorMode">프로필 편집</button>
            </div>
            <div class="profile-image"><img :src="profileImagePath" alt="User Image" /></div>
            <div class="profile-info">
                <h2 class="profile-name">{{ profile.userNickname }}</h2>
                <p class="profile-status">{{ profile.userStateMsg }}</p>
                <div class="profile-stats">
                    <div class="stat-item">
                        <span class="stat-label">팔로잉: </span>
                        <span class="stat-value">{{ profile.userCntFlw }}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">팔로워: </span>
                        <span class="stat-value">{{ profile.userCntFlwd }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const REST_API_PATH = 'http://localhost:8080/api';
const defaultBackground = '/src/assets/images/bg1.jpg';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { profile } = storeToRefs(userStore);

const profileImagePath = computed(() => `${REST_API_PATH}/image?path=${profile.value.userImageUrl}`);

const emit = defineEmits(['toggleEditor']);

const toggleEditorMode = () => {
    emit('toggleEditor');
};
</script>

<style>
.background {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
}

.profile-container {
    display: flex;
    align-items: center;
    background-color: rgb(239, 238, 235);
    flex-direction: column;
    padding: 20px;
    margin-top: auto;
}

.button-container {
    display: flex;
    flex-direction: row;
    justify-content: right;
    width: 70%;
    gap: 1rem;
    padding: 0% 0%;
}

.profile-image {
    bottom: 7rem;
    right: 30%;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    position: relative;
    z-index: 1;
    overflow: hidden;
}

.profile-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.profile-info {
    flex: 1;
    width: 70%;
}

.profile-name {
    position: relative;
    font-size: 1.2em;
    color: #3d3d3e;
    font-weight: 600;
    bottom: 3rem;
    left: 1rem;
    font-size: 34px;
    margin-bottom: 10px;
}

.profile-status {
    position: relative;
    bottom: 2rem;
    border: 1px groove #bcbcbc;

    font-size: 16px;
    margin-bottom: 20px;
}

.profile-stats {
    position: relative;
    bottom: 2rem;
    color: #3d3d3e;
    font-weight: 600;
    display: flex;
}

.stat-item {
    margin-right: 20px;
}

.stat-label {
    font-weight: bold;
}

.profile-buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

.follow-button {
    background-color: #007bff;
    color: #fff;
    border: 1px solid #007bff;
    padding: 8px 16px;
    position: relative;
    top: 1rem;
    border-radius: 10px;
    cursor: pointer;
    text-wrap: nowrap;
}

.edit-button {
    background-color: transparent;
    color: #007bff;
    border: 1px solid #007bff;
    padding: 8px 16px;
    position: relative;
    top: 1rem;
    border-radius: 10px;
    text-wrap: nowrap;
}
</style>
