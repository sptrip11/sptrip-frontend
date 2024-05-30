<template>
	<h1>여긴 업데이트야</h1>
	<div class="empty-container">
		<div class="detail-container">
			<div class="user-info">
				<span>작성자: {{ gallery.userNickname }}</span>
				<span>조회: {{ gallery.boardCntWtd }} | 댓글: {{ gallery.boardCntCmd }} | 추천: {{ gallery.boardCntLkd }}</span>
			</div>
			<div class="input-title">
				<text class="input-tag">제목</text>
				<div class="input-area">
					<input style = "width: 50%" v-model="gallery.boardTitle"></input>
					<text class="input-tag-limit">(1/100)</text>
				</div>
			</div>
			<div class="input-content">
				<text class="input-tag">내용</text>
				<input style = "width: 90%" v-model="gallery.boardContent"></input>
				<text class="input-tag-limit">(1/2000)</text>
			</div>

		</div>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useGalleryStore } from "@/stores/gallery";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const galleryStore = useGalleryStore();
const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

galleryStore.galleryDetails(route.params.id);

const { gallery } = storeToRefs(galleryStore);
</script>

<style scoped>
.empty-container {
	padding: 20px;
	background-color: rgb(232, 235, 238);
}

.detail-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	margin: auto; /* 수직 가운데 정렬 */
	max-width: 1056px; /* 최대 너비 55% */
	width: 1056px;
	border: 2px solid #000000;
	background-color: rgb(242, 242, 242);
}
@media (max-width: 1100px) {
	.detail-container {
		max-width: 100%;
	}
}

.input-tag{
	font-size: 1.2rem ;
	padding: 10px;
}

.input-tag-limit{
	font-size: 1rem ;
	padding: 10px;
}

.input-title {
	font-size: 1.5rem;
	background-color: rgb(242, 242, 242);
	color: rgb(50, 54, 72);
	text-align: left;
	width: 100%;
	padding: 1rem 0;
}


.input-content {
	font-size: 1.5rem;
	background-color: rgb(242, 242, 242);
	color: rgb(50, 54, 72);
	text-align: left;
	width: 100%;
	padding: 1rem 0;
}

.content-container {
	display: flex;
	flex-direction: column;
	align-items: left;
	width: 90%;
	margin-bottom: 20px;
}

.user-info {
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 10px;
	font-size: 1rem;
	border: 2px #000000;
	border-style: none none solid none;
	padding: 0.5rem 1rem;
}

.input-area {
	display: flex;
	background-color: white;
	border: 1px solid black;

}
.input-area input {
	border: none;
	flex: 1;
	outline: none;
	/* resize: none; */
}

</style>
