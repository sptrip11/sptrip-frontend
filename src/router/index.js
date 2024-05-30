import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";
import HomeView from "../views/HomeView.vue";
import GalleryView from "../views/GalleryView.vue";
import ProfileView from "../views/ProfileView.vue";
import MapView from "../views/MapView.vue";
import GalleryList from "@/components/gallery/GalleryList.vue";
import GalleryDetail from "@/components/gallery/GalleryDetail.vue";
import GalleryUpdate from "@/components/gallery/GalleryUpdate.vue";
import GalleryInsert from "@/components/gallery/GalleryInsert.vue";
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";
import NotFound from "@/components/common/NotFound.vue";
import registerDetail from "@/components/auth/RegisterDetail.vue";
import RegisterForm from "@/components/auth/RegisterForm.vue";

import TestView from "@/components/test.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: "/registerform", name: "registerform", component: RegisterForm },
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/register",
			name: "register",
			component: Register,
		},
		{
			path: "/register/detail",
			name: "registerDetail",
			component: registerDetail,
			beforeEnter: (to, from, next) => {
				if (from.fullPath == "/register") {
					next(); // 이동을 허락함
				} else {
					alert("잘못된 접근입니다!");
					next("/register");
				}
			},
		},
		{
			path: "/attractions",
			name: "attractions",
			component: MapView,
		},
		{
			path: "/login",
			name: "login",
			component: Login,
		},
		{
			path: "/test",
			name: "test",
			component: TestView,
		},
		{
			path: "/profile/:userNickname",
			name: "profile",
			component: ProfileView,
			// beforeEnter: async (to, from, next) => {
			// 	const userStore = useUserStore();
			// 	const { profile } = userStore;

			// 	const data = await userStore.fetchProfileData(to.params.userNickname);
			// 	if (data.result == "success") {
			// 		profile.userId = data.userId;
			// 		profile.userNickname = data.userNickname;
			// 		profile.userImageUrl = data.userImageUrl;
			// 		profile.userRegDate = data.userRegDate;
			// 		profile.userSeq = data.userSeq;
			// 		profile.userStateMsg = data.userStateMsg;
			// 		next();
			// 	} else {
			// 		next("/error");
			// 	}
			// },
		},
		{
			path: "/gallery",
			name: "gallery",
			component: GalleryView,
			children: [
				{
					path: "",
					name: "galleryList",
					component: GalleryList,
				},
				{
					path: ":id",
					name: "galleryDetail",
					component: GalleryDetail,
				},
				{
					path: "update/:id",
					name: "galleryUpdate",
					component: GalleryUpdate,
				},
				{
					path: "insert",
					name: "galleryInsert",
					component: GalleryInsert,
				},
			],
		},
		{
			path: "/error",
			name: "notFound",
			component: NotFound,
		},
		{
			path: "/:pathMatch(.*)*",
			redirect: "/error",
		},
	],
});

export default router;
