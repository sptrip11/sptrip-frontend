<template>
	<div class="empty-container">
		<div class="detail-container">
			<div class="user-info">
				<span>작성자: {{ gallery.userNickname }}</span>
				<span>조회: {{ gallery.boardCntWtd }} | 댓글: {{ gallery.boardCntCmt }} | 추천: {{ gallery.boardCntLkd }}</span>
			</div>
			<div class="edit-info">
				<a style="color: rgb(1, 17, 68)" @click="updateGallery"> 수정 </a> | <span style="color: crimson" @click="deleteGallery"> 삭제 </span>
			</div>
			<div class="title-info">{{ gallery.boardTitle }}</div>
			<div class="content-container">
				<div class="content">
					<div v-html="gallery.boardContent"></div>
				</div>
			</div>
			<div class="comment-container">
				<div class="comment-input-container" v-show="userNickname != null">
					<label>{{ userNickname }}</label>
					<textarea v-model="cmtContent" />
					<div>
						<button type="button" @click="postComment(gallery.boardId, cmtContent)">등록</button>
					</div>
				</div>
				<div style="width: 100%; padding: 10px 0px">댓글({{ commentItems.length }})</div>
				<div v-for="(item, index) in commentItems" :key="index" class="comment">
					<div>
						<a @click="aaaa" style="width: 8%">{{ item.userNickname }}</a>

						<text style="width: 72%"> {{ item.cmtContent }} </text>

						<div style="width: 10%">
							<a style="color: rgb(1, 17, 68)" @click="updateGallery"> 수정 </a> |
							<a style="color: crimson" @click="deleteComment(item.userSeq, item.cmtId)"> 삭제 </a>
						</div>
						<text style="width: 7%">
							<i class="fa fa-heart" :class="{ far: !item.liked, fas: item.liked, liked: item.liked }" @click="toggleLike(item, index)"></i>
							{{ item.cmtCntLkd }}
						</text>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { useCommentStore } from "@/stores/comment";
import { useGalleryStore } from "@/stores/gallery";
import { useUserStore } from "@/stores/user";
import { onMounted, ref, watch } from "vue";

const galleryStore = useGalleryStore();
const commentStore = useCommentStore();
const userStore = useUserStore();

const route = useRoute();

const userNickname = sessionStorage.getItem("userNickname");

galleryStore.galleryDetails(route.params.id);
commentStore.fetchCommentItems(route.params.id);
const { commentItems, postComment, deleteComment } = commentStore;
const { gallery } = storeToRefs(galleryStore);
const { user } = userStore;

const cmtContent = ref("");


const aaaa = () => {
	alert("메롱");
};

const toggleLike = async (item, index) => {
	let res;
	if(!item.liked) res = await commentStore.createCommentLike(item.cmtId);
	else res = await commentStore.deleteCommentLike(item.cmtId);
	if (res) {
		if(item.liked){
			commentItems[index].cmtCntLkd--;
		}else{
			commentItems[index].cmtCntLkd++;
		}
		item.liked = !item.liked;
	}
};

const updateGallery = () => {
	if (gallery.userNickname == userStore.user.userNickname) alert("same!!!");
	else alert("not same!!!");
};

const deleteGallery = () => {
	if (gallery.userNickname == userStore.user.userNickname) alert("same!!!");
	else alert("not same!!!");
};
</script>

<style scoped>
.empty-container {
	padding: 20px;
	background-color: rgb(232, 235, 238);
}

.edit-info {
	width: 100%;
	text-align: right;
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

.title-info {
	font-size: 2.5rem;
	font-weight: 600;
	color: rgb(30, 34, 52);
	text-align: left;
	margin: 2rem 0rem;

	width: 90%;
}

.content-container {
	display: flex;
	flex-direction: column;
	align-items: left;
	width: 90%;
	margin-bottom: 20px;
}

.content {
	margin-top: 5rem;
	padding: 0.5rem;
	min-height: 500px;
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

.image-container {
	display: flex;
	justify-content: center; /* 가운데 정렬 */
	margin: 1rem 1rem;
}

.image-container img {
	width: 100%;
	height: auto;
}

.comment-container {
	display: flex;
	flex-direction: column;
	justify-content: center;

	width: 100%;
	border: 2px #000000;
	border-style: solid none none none;
	padding: 0.5rem;
	align-items: center;
}

.comment {
	width: 100%;
	display: flex;
	flex-direction: column;
}

.comment > div {
	display: flex;
	justify-content: flex-start;
	width: 100%;
	gap: 2rem;
	padding: 3px 0px;
	border: 1px rgb(216, 216, 216);
	border-style: solid none none none;
}

.comment-recommend-button {
	border-style: none;
}

.comment-input-container {
	display: flex;
	flex-direction: column;
	border: 1px solid black;
	margin: 1rem auto;
	width: 95%;
}

.comment-input-container > textarea {
	width: 95%;
	margin: auto;
	height: 75px;
	resize: none;
	border: none;
	background-color: rgb(252, 252, 252);
}
.comment-input-container > div {
	display: flex;
	justify-content: flex-end;
	margin: 0.5rem;
}
.comment-input-container > label {
	margin: 0.7rem;
	font-size: 18px;
}

.comment-recomment-btn {
	border-radius: 25%;
	width: 5%;
}
</style>
