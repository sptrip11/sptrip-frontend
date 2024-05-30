import { ref } from "vue"
import { defineStore } from "pinia"
import axios from "axios"

const REST_API_PATH = "http://localhost:8080/api"

export const usePlannerStore = defineStore("planner", () => {
    const plannerItems = ref([]);
    const isLoading = ref(false);

    const init = () => {
        plannerItems.value = [];
    }

    const fetchPlannerItems = async () => {
        plannerItems.value = [];
        isLoading.value = true;

        const userSeq = sessionStorage.getItem("userSeq");
        let response;
        if (userSeq == null) {
            alert("로그인이 필요합니다!");
            return;
        }
        response = await axios.get(`${REST_API_PATH}/planner?userSeq=${userSeq}`);
        plannerItems.value.push(...response.data);

        isLoading.value = false;
    };

    const postPlanner = async (plannerName, plannerCntDt) => {
        const userSeq = sessionStorage.getItem("userSeq");
        if (userSeq == null) {
            alert("로그인이 필요합니다!");
            return;
        } else {
            const body = {
                userSeq: userSeq,
                plannerName: plannerName,
                plannerCntDt: plannerCntDt,
            };
            const response = await axios.post(`${REST_API_PATH}/planner`, body);
            fetchPlannerItems();
        }
    };

    const deletePlanner = async (plannerId) => {
        console.log(plannerId);
        const userSeq = sessionStorage.getItem("userSeq");
        if (userSeq == null) {
            alert("로그인이 필요합니다!");
            return;
        }
        const response = await axios.delete(`${REST_API_PATH}/planner?plannerId=${plannerId}&userSeq=${userSeq}`);
        fetchPlannerItems();
    };

    return { init, fetchPlannerItems, postPlanner, deletePlanner, isLoading, plannerItems };
})