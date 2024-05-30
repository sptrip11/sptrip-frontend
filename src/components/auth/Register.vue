<template>
    <section class="contact py-5" id="contact">
        <div class="container py-md-5">
            <h3 class="heading text-center mb-3 mb-sm-5">회원가입</h3>
            <p class="heading text-center mb-3 mb-sm-5">간편한 회원가입으로 방문했던 여행지를 기록하고, 추억을 남겨봐요</p>
            <p class="heading text-center mb-3 mb-sm-5">*Test: userId=111</p>
            <div class="contact-grids mt-5">
                <div class="row">
                    <div class="col-lg-6 col-md-6 contact-left-form">
                        <form>
                            <div>아이디</div>
                            <div class="row form-group contact-forms" style="padding: 0 1rem">
                                <input type="text" class="col-lg-9 col-md-9 form-control" placeholder="id" required v-model="user.userId" />
                                <button type="button" class="col-lg-3 col-md-3 enjoy-confirm-butnn" @click="userStore.handleUserIdDuplicate">중복 검사</button>
                            </div>
                            <div>비밀번호 *영문자 및 숫자, 특수문자 8자리 이상</div>
                            <div class="form-group contact-forms">
                                <input type="password" class="form-control" placeholder="password" required v-model="user.userPw" />
                            </div>
                            <div>비밀번호 확인</div>
                            <div class="form-group contact-forms">
                                <input type="password" class="form-control" placeholder="password" required v-model="confirmPassword" />
                            </div>
                            <div>이메일</div>
                            <div class="form-group contact-forms">
                                <input type="email" class="form-control" placeholder="email" required v-model="user.userEmail" />
                            </div>
                            <button type="button" class="btn btn-block sent-butnn" @click="validate">회원가입</button>
                        </form>
                    </div>
                    <div class="col-lg-6 col-md-6 contact-right pl-lg-5">
                        <img :src="imgPath" class="img-fluid" alt="user-image" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import imgPath from '/src/assets/images/c1.jpg';
import axios from 'axios';
import { ref } from 'vue';

const userStore = useUserStore();
const { user } = userStore;

const router = useRouter();
const confirmPassword = ref('');

const validate = async () => {
    if (user.userPw !== confirmPassword.value) {
        alert('비밀번호가 일치하지 않습니다.');
        user.userPw = '';
        confirmPassword.value = '';
        return;
    }
    try {
        const res = await userStore.checkUserIdDuplicate();
        if (res.result === 'success') {
            router.push({ path: '/register/detail' });
        } else {
            alert('아이디가 중복됩니다!');
        }
    } catch (error) {
        alert('에러발생!!!');
    }
};
</script>
