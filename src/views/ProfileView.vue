<template>
	<div v-show="!editorMode">
		<ProfileInfo @toggleEditor="toggleEditorMode" />
		<ProfileStat />
	</div>
	<div v-show="editorMode">
		<ProfileEdit @toggleEditor="toggleEditorMode" />
	</div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import ProfileInfo from "@/components/profile/ProfileInfo.vue";
import ProfileStat from "@/components/profile/ProfileStat.vue";
import ProfileEdit from "@/components/profile/ProfileEdit.vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const { profile } = userStore;
const route = useRoute();

watch(
	() => route.params.userNickname,
	async (newUserNickname) => {
		console.log("watching userNickname, " + newUserNickname);
		const data = await userStore.fetchProfileData(newUserNickname);
		if (data.result == "success") {
			profile.userId = data.userId;
			profile.userNickname = data.userNickname;
			profile.userImageUrl = data.userImageUrl;
			profile.userRegDate = data.userRegDate;
			profile.userSeq = data.userSeq;
			profile.userStateMsg = data.userStateMsg;
		} else {
			console.log("ㅡ,ㅡ");
		}
	},
	{ immediate: true }
);

const editorMode = ref(false);
const toggleEditorMode = () => {
	editorMode.value = !editorMode.value;
};
</script>

<style scoped></style>
