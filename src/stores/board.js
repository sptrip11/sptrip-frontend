import { ref } from 'vue';
import { defineStore } from 'pinia';
import router from '@/router';
import axios from 'axios';

const REST_API_PATH = 'http://localhost:8080/api';

export const useBoardStore = defineStore('board', () => {
    const boardList = ref([]);
    const board = ref({});

    const getBoardList = () => {
        axios
            .get(REST_PATH)
            .then((res) => {
                boardList.value = res.data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getBoard = (id) => {
        axios
            .get(`${REST_PATH}/${id}`)
            .then((res) => {
                board.value = res.data;
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const writeBoard = (board) => {
        axios.post(REST_PATH, board, { headers: { 'Content-Type': `application/json` } }).then((res) => {
            console.log(res);
        });
    };

    const updateBoard = () => {
        axios.patch(REST_PATH, board.value).then(() => {
            router.push({ name: 'boardList' });
        });
    };

    const deleteBoard = (id) => {
        axios.delete(`${REST_PATH}/${id}`).then(() => {
            console.log(res);
        });
    };

    return { boardList, board, getBoardList, getBoard, writeBoard, updateBoard, deleteBoard };
});
