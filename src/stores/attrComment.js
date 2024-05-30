import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

const REST_API_PATH = 'http://localhost:8080/api';

export const useAttrCommentStore = defineStore('attrComment', () => {
    const commentItems = ref([]);
    const isLoading = ref(false);

    const init = () => {
        commentItems.value = [];
    };

    const fetchCommentItems = async (contentId) => {
        commentItems.value = [];
        isLoading.value = true;

        const userSeq = sessionStorage.getItem('userSeq');
        let response;
        if (userSeq != null) {
            console.log('회원으로 진입');
            response = await axios.get(`${REST_API_PATH}/attraction/${contentId}?userSeq=${userSeq}`);
        } else {
            console.log('비회원으로 진입');
            response = await axios.get(`${REST_API_PATH}/attraction/${contentId}`);
        }
        commentItems.value.push(...response.data);

        isLoading.value = false;
    };

    const postComment = async (contentId, attrCmtContent, attrCmtStar) => {
        const userSeq = sessionStorage.getItem('userSeq');
        if (userSeq == null) {
            alert('로그인이 필요합니다!');
            return;
        } else {
            const body = {
                userSeq: userSeq,
                contentId: contentId,
                attrCmtContent: attrCmtContent,
                attrCmtStar: attrCmtStar,
            };
            const response = await axios.post(`${REST_API_PATH}/attraction`, body);
            fetchCommentItems(contentId);
        }
    };

    const deleteComment = async (targetSeq, attrCmtId, contentId) => {
        const userSeq = sessionStorage.getItem('userSeq');
        if (userSeq == null) {
            alert('로그인이 필요합니다!');
            return;
        } else if (targetSeq != userSeq) {
            alert('다른 사용자입니다!');
            return;
        } else {
            const response = await axios.delete(`${REST_API_PATH}/attraction/${attrCmtId}?userSeq=${userSeq}`);
        }
        fetchCommentItems(contentId);
    };

    const likeComment = async (uniqueId) => {
        const userSeq = sessionStorage.getItem('userSeq');
        if (userSeq == null) {
            alert('로그인이 필요합니다!');
            return;
        }
        const body = {
            userSeq: userSeq,
            uniqueId: uniqueId,
        };
        const response = await axios.post(`${REST_API_PATH}/attraction/like`, body);
    };

    const deleteLikeComment = async (uniqueId) => {
        const userSeq = sessionStorage.getItem('userSeq');
        if (userSeq == null) {
            alert('로그인이 필요합니다!');
            return;
        }
        const response = await axios.delete(`${REST_API_PATH}/attraction/like?uniqueId=${uniqueId}&userSeq=${userSeq}`);
    };

    return { init, fetchCommentItems, postComment, deleteComment, likeComment, deleteLikeComment, isLoading, commentItems };
});
