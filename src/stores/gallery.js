import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';
const REST_API_PATH = 'http://localhost:8080/api';

export const useGalleryStore = defineStore('gallery', () => {
    const currentPage = ref(1);
    const galleryItems = ref([]);
    const gallery = ref({});
    const router = useRouter();
    const isHide = ref(false);
    const isLoading = ref(false);
    const sortFlag = ref(0);

    const init = () => {
        gallery.value = {
            boardId: 0,
            userSeq: 0,
            userNickname: '',
            boardTitle: '',
            boardContent: '',
            boardDate: '',
            boardCntWtd: 0,
            boardCntLkd: 0,
            boardCntCmt: 0,
        };
    };

    const initItems = () => {
        galleryItems.value = [];
        currentPage.value = 1;
        sortFlag.value = 0;
    };

    const toggleOnlyMe = () => {
        const userNickname = sessionStorage.getItem('userNickname');
        galleryItems.value = galleryItems.value.filter((item) => item.userNickname == userNickname);
    };

    const sortLatest = () => {
        if (sortFlag.value == 0) {
            galleryItems.value.sort((a, b) => a.boardId - b.boardId);
            sortFlag.value = 1;
        } else {
            galleryItems.value.sort((a, b) => b.boardId - a.boardId);
            sortFlag.value = 0;
        }
    };

    const sortRecommend = () => {
        if (sortFlag.value == 2) {
            galleryItems.value.sort((a, b) => a.boardCntLkd - b.boardCntLkd);
            sortFlag.value = 3;
        } else {
            galleryItems.value.sort((a, b) => b.boardCntLkd - a.boardCntLkd);
            sortFlag.value = 2;
        }
    };

    const sortComment = () => {
        if (sortFlag.value == 4) {
            galleryItems.value.sort((a, b) => a.boardCntCmt - b.boardCntCmt);
            sortFlag.value = 5;
        } else {
            galleryItems.value.sort((a, b) => b.boardCntCmt - a.boardCntCmt);
            sortFlag.value = 4;
        }
    };

    const sortView = () => {
        if (sortFlag.value == 6) {
            galleryItems.value.sort((a, b) => a.boardCntWtd - b.boardCntWtd);
            sortFlag.value = 7;
        } else {
            galleryItems.value.sort((a, b) => b.boardCntWtd - a.boardCntWtd);
            sortFlag.value = 6;
        }
    };

    const toggleHide = () => {
        isHide.value = !isHide.value;
    };

    const upload = async (dir, content) => {
        const userSeq = sessionStorage.getItem('userSeq');
        if (userSeq == null) {
            alert('로그인이 필요합니다!');
            return;
        } else {
            const body = {
                userSeq: userSeq,
                boardTitle: gallery.value.boardTitle,
                boardContent: content,
                boardImagePaths: dir,
            };
            const response = await axios.post(`${REST_API_PATH}/boards`, body);
            alert(response.data.message);
            router.push('/gallery');
        }
    };

    const galleryDetails = async (id) => {
        const userId = sessionStorage.getItem('userId');
        let response;
        if (userId != null) {
            console.log('회원으로 진입');
            response = await axios.get(`${REST_API_PATH}/boards/${id}?userId=${userId}`);
        } else {
            console.log('비회원으로 진입');
            response = await axios.get(`${REST_API_PATH}/boards/${id}`);
        }
        gallery.value = response.data;
    };

    const fetchGalleryItems = async (isOnlyMe) => {
        isLoading.value = true;
        const userId = sessionStorage.getItem('userId');
        let response;
        if (userId != null) {
            console.log('회원으로 진입');
            response = await axios.get(`${REST_API_PATH}/boards?userId=${userId}&pageNo=${currentPage.value}&pageSize=100`);
        } else {
            console.log('비회원으로 진입');
            response = await axios.get(`${REST_API_PATH}/boards?pageNo=${currentPage.value}&pageSize=100`);
        }
        galleryItems.value.push(...response.data);
        currentPage.value++;
        if (isOnlyMe != null) toggleOnlyMe();
        isLoading.value = false;
    };

    const createBoardLike = async (boardId) => {
        const userSeq = sessionStorage.getItem('userSeq');
        if (userSeq == null) {
            alert('로그인이 필요합니다!');
            return false;
        } else {
            const body = {
                userSeq: userSeq,
                uniqueId: boardId,
            };
            const response = await axios.post(`${REST_API_PATH}/board/like`, body);
            return response.data.result == 'success' ? true : false;
        }
    };

    const deleteBoardLike = async (boardId) => {
        const userSeq = sessionStorage.getItem('userSeq');
        if (userSeq == null) {
            alert('로그인이 필요합니다!');
            return false;
        } else {
            const params = {
                userSeq: userSeq,
                uniqueId: boardId,
            };
            const response = await axios.delete(`${REST_API_PATH}/board/like`, { params: params });
            return response.data.result == 'success' ? true : false;
        }
    };

    return {
        currentPage,
        gallery,
        galleryItems,
        isLoading,
        isHide,
        sortFlag,
        init,
        initItems,
        fetchGalleryItems,
        galleryDetails,
        createBoardLike,
        deleteBoardLike,
        upload,
        sortLatest,
        sortRecommend,
        sortComment,
        sortView,
        toggleOnlyMe,
        toggleHide,
    };
});
