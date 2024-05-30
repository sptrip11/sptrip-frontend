import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

const REST_API_PATH = 'http://localhost:8080/api';

export const useCommentStore = defineStore('comment', () => {
    const commentItems = ref([]);
    const isLoading = ref(false);

    const init = () => {
        commentItems.value = [];
    };

    const fetchCommentItems = async (boardId) => {
        commentItems.value = [];
        isLoading.value = true;

        const userSeq = sessionStorage.getItem('userSeq');
        let response;
        if (userSeq != null) {
            console.log('회원으로 진입');
            response = await axios.get(`${REST_API_PATH}/comments?userSeq=${userSeq}&boardId=${boardId}`);
        } else {
            console.log('비회원으로 진입');
            response = await axios.get(`${REST_API_PATH}/comments?boardId=${boardId}`);
        }
        commentItems.value.push(...response.data);

        isLoading.value = false;
    };

    const postComment = async (boardId, cmtContent) => {
        const userSeq = sessionStorage.getItem('userSeq');
        if (userSeq == null) {
            alert('로그인이 필요합니다!');
            return;
        } else {
            const body = {
                userSeq: userSeq,
                boardId: boardId,
                cmtContent: cmtContent,
            };
            const response = await axios.post(`${REST_API_PATH}/comments`, body);
            if (response.data.result == 'success') {
                location.reload();
            }
        }
    };

    const deleteComment = async (targetSeq, commentId) => {
        const userSeq = sessionStorage.getItem('userSeq');
        if (userSeq == null) {
            alert('로그인이 필요합니다!');
            return;
        } else if (targetSeq != userSeq) {
            alert('다른 사용자입니다!');
            return;
        } else {
            const response = await axios.delete(`${REST_API_PATH}/comments/${commentId}?userSeq=${userSeq}`);
            if (response.data.result == 'success') {
                location.reload();
            }
        }
    };

    const createCommentLike = async (commentId) => {
        const userSeq = sessionStorage.getItem('userSeq');
        if (userSeq == null) {
            alert('로그인이 필요합니다!');
            return false;
        } else {
            const body = {
                userSeq: userSeq,
                uniqueId: commentId,
            };
            const response = await axios.post(`${REST_API_PATH}/comments/like`, body);
            return response.data.result == 'success' ? true : false;
        }
    };

    const deleteCommentLike = async (commentId) => {
        const userSeq = sessionStorage.getItem('userSeq');
        if (userSeq == null) {
            alert('로그인이 필요합니다!');
            return false;
        } else {
            const params = {
                userSeq: userSeq,
                uniqueId: commentId,
            };
            const response = await axios.delete(`${REST_API_PATH}/comments/like`, { params: params });
            return (response.data.result = 'success' ? true : false);
        }
    };

    return { init, fetchCommentItems, postComment, deleteComment, createCommentLike, deleteCommentLike, isLoading, commentItems };
});
