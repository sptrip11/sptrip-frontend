<template>
	<div class="top-head container">
		<div class="ml-auto text-right right-p">
			<ul>
				<li class="mr-3"><span class="fa fa-phone"></span>+82(02) 3429 5100</li>
			</ul>
		</div>
	</div>
	<div class="container">
		<!-- nav -->
		<nav class="py-3 d-lg-flex">
			<div id="logo">
				<h1>
					<a href="/"><span class="fa fa-free-code-camp"></span> SeoulPastaTravel </a>
				</h1>
			</div>
			<label for="drop" class="toggle"><span class="fa fa-bars"></span></label>
			<input type="checkbox" id="drop" />

			<ul class="menu ml-auto mt-1" v-if="userId == null">
				<li><RouterLink to="/attractions">지역별관광지</RouterLink></li>
				<li><RouterLink to="/gallery">갤러리</RouterLink></li>
				<li><RouterLink to="/register">회원가입</RouterLink></li>
				<li><RouterLink to="/login">로그인</RouterLink></li>
			</ul>

			<ul class="menu ml-auto mt-1" v-else>
				<li><RouterLink to="/attractions">지역별관광지</RouterLink></li>
				<li><RouterLink to="/gallery">갤러리</RouterLink></li>
				<li>
					<RouterLink :to="`/profile/${userId}`">{{ userNickname }}님, 환영합니다!</RouterLink>
				</li>
				<li><RouterLink to="/logout" style="font-size: 0.85rem" @click="store.logout">로그아웃</RouterLink></li>
			</ul>
		</nav>
		<!-- //nav -->
	</div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { useRouter, useRoute } from "vue-router";

const store = useUserStore();
const userId = sessionStorage.getItem("userId");
const userNickname = sessionStorage.getItem("userNickname");
</script>
