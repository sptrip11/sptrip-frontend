<template>
    <section class="contact py-5" id="contact">
        <div class="container py-md-5">
            <h3 class="heading text-center mb-3 mb-sm-5">회원 정보 입력</h3>
            <p class="heading text-center mb-3 mb-sm-5">거의 다 왔어요! 남은 프로필을 설정해주세요</p>
            <p class="heading text-center mb-3 mb-sm-5">*test userNickName: aaa</p>
            <div class="contact-grids mt-5">
                <div class="row container" style="display: flex; justify-content: center">
                    <div class="col-lg-6 col-md-6 contact-left-form">
                        <form>
                            <div>닉네임 *({{ user.userNickname.length }}/12글자). 공백X, 변경 및 중복 불가능</div>
                            <div class="row form-group contact-forms" style="padding: 0 1rem">
                                <input type="text" class="col-lg-9 col-md-9 form-control" placeholder="nickname" required v-model="user.userNickname" />
                                <button type="button" class="col-lg-3 col-md-3 enjoy-confirm-butnn" @click="userStore.handleUserNicknameDuplicate">
                                    중복 검사
                                </button>
                            </div>
                            <div>프로필 이미지 등록</div>
                            <div class="row container" style="display: flex; justify-content: center">
                                <div class="box">
                                    <label for="file-input" class="image-upload">
                                        <img :src="uploadedImage || imgPath" class="profile" alt="user-image" />
                                    </label>
                                    <input id="file-input" type="file" style="display: none" @change="handleFileUpload" />
                                </div>
                            </div>
                            <div style="height: 2rem"></div>
                            <div>상태 메시지 *생략 가능({{ user.userStateMsg.length }}/200)</div>
                            <div class="form-group contact-forms">
                                <input type="email" class="form-control" required v-model="user.userStateMsg" />
                            </div>
                            <button type="button" class="btn btn-block sent-butnn" @click="register">회원가입</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import imgPath from '/src/assets/images/profile/noImage.png';
import { ref } from 'vue';

const userStore = useUserStore();
const router = useRouter();

const { register } = userStore;
const { user } = userStore;
const uploadedImage = ref(null);

user.userNickname = '';
user.userStateMsg = '';

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            uploadedImage.value = reader.result; // 이미지 미리보기 데이터 업데이트
        };
        reader.readAsDataURL(file);
        console.log(reader);
        userStore.user.userImageFile = file;
    }
};
</script>

<style>
.box {
    width: 150px;
    height: 150px;
    border-radius: 70%;
    overflow: hidden;
    position: relative;
}
.profile {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.image-upload {
    display: block;
    cursor: pointer;
}
.image-upload:hover {
    opacity: 0.7;
}
.image-upload:hover::before {
    content: '이미지 업로드';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: bold;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}
</style>
