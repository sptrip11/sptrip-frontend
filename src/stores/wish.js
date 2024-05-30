import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

const REST_API_PATH = 'http://localhost:8080/api';

export const useWishStore = defineStore('wish', () => {
    const wishItems = ref([]);
    const isLoading = ref(false);
    const isWish = ref(false);
    const wishCards = ref([]);

    const dumpWishCards = async (cards) => {
        wishCards.value = cards;
    };

    const init = () => {
        wishItems.value = [];
    };

    const fetchWishItems = async () => {
        wishItems.value = [];
        isLoading.value = true;

        const userSeq = sessionStorage.getItem('userSeq');
        let response;
        if (userSeq == null) {
            alert('로그인이 필요합니다!');
            return;
        }
        response = await axios.get(`${REST_API_PATH}/wish?userSeq=${userSeq}`);
        wishItems.value.push(...response.data);

        isLoading.value = false;
    };

    const postWish = async (contentId) => {
        const userSeq = sessionStorage.getItem('userSeq');
        if (userSeq == null) {
            alert('로그인이 필요합니다!');
            return;
        }
        const body = {
            userSeq: userSeq,
            contentId: contentId,
        };
        const response = await axios.post(`${REST_API_PATH}/wish`, body);
    };

    const deleteWish = async (contentId) => {
        const userSeq = sessionStorage.getItem('userSeq');
        if (userSeq == null) {
            alert('로그인이 필요합니다!');
            return;
        }
        const response = await axios.delete(`${REST_API_PATH}/wish?contentId=${contentId}&userSeq=${userSeq}`);
    };

    const wishCheck = async (contentId) => {
        isWish.value = false;
        const userSeq = sessionStorage.getItem('userSeq');
        if (userSeq == null) {
            return;
        }
        const response = await axios.get(`${REST_API_PATH}/wish/${contentId}?userSeq=${userSeq}`);
        console.log(response.data.result);
        if (response.data.result == 'success') isWish.value = true;
    };
    return { init, fetchWishItems, postWish, deleteWish, wishCheck, isLoading, isWish, wishItems };
});
