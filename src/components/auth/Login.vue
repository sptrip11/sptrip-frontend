<template>
	<!-- //html header -->
	<!-- Contact -->
	<section class="contact py-5" id="contact">
		<div class="container py-md-5">
			<h3 class="heading text-center mb-3 mb-sm-5">로그인</h3>
			<p class="heading text-center mb-3 mb-sm-5">여행지를 찾고, 계획을 세우고, 떠나봅시다!</p>
			<p class="heading text-center mb-3 mb-sm-5">*test account : 111/1234</p>
			<div class="contact-grids mt-5 center">
				<div class="row justify-content-center">
					<div class="col-lg-6 col-md-6 contact-left-form">
						<form action="" method="post">
							<div>아이디</div>
							<div class="form-group contact-forms">
								<input type="text" class="form-control" placeholder="id" required="true" v-model="user.userId" />
							</div>
							<div>비밀번호 *영문자 및 숫자, 특수문자 8자리 이상</div>
							<div class="form-group contact-forms">
								<input type="password" class="form-control" placeholder="password" required="true" v-model="user.userPw" />
							</div>
							<button type="button" class="btn btn-block sent-butnn" @click="store.login">로그인</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
const store = useUserStore();
const { user } = storeToRefs(store);
</script>
