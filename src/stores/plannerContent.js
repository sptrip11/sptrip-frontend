import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

const REST_API_PATH = 'http://localhost:8080/api';

export const usePlannerContentStore = defineStore('plannerContent', () => {
    const plannerContentItems = ref([]);
    const planCardInfo = ref([]);
    const isLoading = ref(false);

    const init = () => {
        plannerContentItems.value = [];
    };

    const fetchPlannerContentItems = async (plannerId) => {
        plannerContentItems.value = [];
        isLoading.value = true;

        const userSeq = sessionStorage.getItem('userSeq');
        let response;
        if (userSeq == null) {
            alert('로그인이 필요합니다!');
            return;
        }
        response = await axios.get(`${REST_API_PATH}/planner/${plannerId}`);
        plannerContentItems.value.push(...response.data);
        isLoading.value = false;
    };

    const postPlannerContent = async (plannerId, contentId, plannerDt) => {
        const userSeq = sessionStorage.getItem('userSeq');
        if (userSeq == null) {
            alert('로그인이 필요합니다!');
            return;
        } else {
            const body = {
                userSeq: userSeq,
                plannerId: plannerId,
                contentId: contentId,
                plannerDt: plannerDt,
            };
            const response = await axios.post(`${REST_API_PATH}/planner/content`, body);
            fetchPlannerContentItems(plannerId);
        }
    };

    const deletePlannerContent = async (plannerContentId, plannerId) => {
        console.log('ddd');
        console.log(plannerContentId);
        const userSeq = sessionStorage.getItem('userSeq');
        if (userSeq == null) {
            alert('로그인이 필요합니다!');
            return;
        }
        const response = await axios.delete(`${REST_API_PATH}/planner/content?plannerContentId=${plannerContentId}&userSeq=${userSeq}`);
        fetchPlannerContentItems(plannerId);
    };
    return { fetchPlannerContentItems, postPlannerContent, deletePlannerContent, isLoading, plannerContentItems, planCardInfo };
});
