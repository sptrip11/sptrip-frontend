<template>
    <div class="empty-container">
        <div class="detail-container">
            <div class="user-info">
                <span>작성자: {{ user.userNickname }}</span>
            </div>
            <div class="input-title">
                <div class="input-container">
                    <input v-model="gallery.boardTitle" required />
                    <label>제목</label>
                    <span></span>
                </div>
                <text>({{ gallery.boardTitle.length }}/100)</text>
            </div>
            <div class="input-label">
                <label>본문</label>
                <text class="input-tag-limit">({{ state.content.length }}/6000)</text>
            </div>

            <div class="input-content">
                <quill-editor
                    class="input-editor"
                    v-model:value="state.content"
                    :options="state.editorOption"
                    :disabled="state.disabled"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)"
                    @change="onEditorChange($event)"
                />
            </div>
            <div class="input-button-end">
                <text>*업로드한 이미지 중 첫번째 이미지가 썸네일로 등록됩니다. </text>
                <button class="btn btn-primary" @click="galleryStore.upload(imageDir, state.content)">작성하기</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { reactive } from 'vue';
import { useGalleryStore } from '@/stores/gallery';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { quillEditor } from 'vue3-quill';

const REST_API_PATH = 'http://localhost:8080/api';

const galleryStore = useGalleryStore();
const userStore = useUserStore();

const { gallery } = storeToRefs(galleryStore);
const { user } = userStore;

galleryStore.init();

const imageDir = reactive([]);

const uploadImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
        const file = input.files[0];

        const formData = new FormData();
        formData.append('path', '/gallery');
        formData.append('userImageFile', file);
        axios
            .post(`${REST_API_PATH}/image`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((response) => {
                if (response.data.result == 'success') {
                    imageDir.push(response.data.path);
                    const uploadedImagePath = `${REST_API_PATH}/image?path=${response.data.path}`;
                    state.content += `<img src="${uploadedImagePath}"/>`;
                }
            })
            .catch((error) => {
                alert(error);
            });
    });
};

const state = reactive({
    content: '',
    editorOption: {
        placeholder: '\n내용을 입력하세요',
        modules: {
            toolbar: {
                container: [
                    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
                    ['blockquote', 'code-block'],

                    [{ header: 1 }, { header: 2 }], // custom button values
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
                    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
                    [{ direction: 'rtl' }], // text direction

                    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],

                    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
                    [{ font: [] }],
                    [{ align: [] }],

                    ['clean'], // remove formatting button

                    ['link', 'image', 'video'], // link and image, video
                ],
                handlers: {
                    image: uploadImage,
                },
            },
        },
        // more options
    },
    disabled: false,
});

const onEditorBlur = (quill) => {};
const onEditorFocus = (quill) => {
    console.log(state.content);
};
const onEditorReady = (quill) => {};
const onEditorChange = ({ quill, html, text }) => {};
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

.input-title {
    display: flex;
    flex-direction: row;
    font-size: 1.5rem;
    background-color: rgb(242, 242, 242);
    color: rgb(50, 54, 72);
    text-align: left;
    width: 85%;
    padding: 1rem 0;
}

.input-title text {
    font-size: 1rem;
    padding: 10px;
    margin-top: 1em;
}

.input-label {
    font-size: 20px;
    color: #aaaaaa;
    width: 85%;
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    margin-top: 1rem;
    position: relative;
    text-align: left;
}

.input-label text {
    font-size: 1rem;
    margin-right: 3.5rem;
}

.input-content {
    font-size: 1.5rem;
    background-color: rgb(242, 242, 242);
    color: rgb(50, 54, 72);
    text-align: left;
    width: 85%;
}

.content-container {
    display: flex;
    flex-direction: column;
    align-items: left;
    width: 90%;
    margin-bottom: 0px;
}

.input-button-end {
    padding-top: 1rem;
    width: 85%;
    display: flex;
    justify-content: space-between;
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

.input-container {
    position: relative;
    width: 85%;
    margin-left: 0rem;
    margin-top: 1rem;
}

.input-container input {
    font-size: 18px;
    color: #222222;
    width: 100%;
    border: none;
    border-bottom: solid #aaaaaa 1px;
    padding-bottom: 10px;
    padding-left: 10px;
    position: relative;
    background: none;
    z-index: 5;
}

.input-container input::placeholder {
    color: #aaaaaa;
}
.input-container input:focus {
    outline: none;
}

.input-container span {
    display: block;
    position: absolute;
    bottom: 0;
    left: 0%;
    background-color: #666;
    width: 0;
    height: 2px;
    border-radius: 2px;
    transition: 0.5s;
}

.input-editor {
    background-color: white;
    height: 650px;
}

.input-container label {
    position: absolute;
    color: #aaa;
    left: 10px;
    font-size: 20px;
    top: 10px;
    transition: all 0.2s;
}

.input-container input:focus ~ label,
.input-container input:valid ~ label {
    font-size: 16px;
    transform: translateX(-40px);
    color: #666;
    font-weight: bold;
}

.input-container input:focus ~ span,
.input-container input:valid ~ span {
    width: 100%;
}
</style>
