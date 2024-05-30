<template>
	<h1>테스트 페이지입니다.</h1>
	<button type="button" @click="getList">버튼이에요</button>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import axios from "axios";

const userStore = useUserStore();
const { profile } = userStore;

const REST_API_PATH = "http://localhost:8080/api";

const getList = async () => {
	const ret = await axios.get(`${REST_API_PATH}/boards?pageNo=1&pageSize=6`, { headers: { "Content-Type": `application/json` } }).then((res) => {
		console.log(res.data);
	});
};
</script>
