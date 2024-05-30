<template>
	<h1>빰빰빰</h1>
	<button @click="toggleEditorMode">편집 모드 전환</button>
	<!--
	<div class="background" :style="{ backgroundImage: `url(${defaultBackground})`, height: '70vh' }">
		<div class="profile-container">
			<div class="button-container">
				<router-link to="/" class="follow-button">팔로우</router-link>
				<router-link to="/" class="edit-button">프로필 편집</router-link>
			</div>
			<div class="profile-image"><img :src="profile.userImageUrl" alt="User Image" /></div>
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
	</div>-->
</template>

<script setup>
const defaultBackground = "/src/assets/images/bg1.jpg";
const userImageUrl = "/src/assets/images/profile/noImage.png";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const { profile } = userStore;

const emit = defineEmits(["toggleEditor"]);

const toggleEditorMode = () => {
	emit("toggleEditor");
};
</script>

<style></style>
