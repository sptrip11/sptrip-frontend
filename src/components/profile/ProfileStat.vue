<template>
	<div class="stat-container">
		<div>
			<h2 class="stat-title">통계</h2>
			<div class="card-container">
				<div class="card">
					<div class="stat-card">
						<span>게시글 작성 수</span><br />
						<span>{{ Math.round((profile.userCntWr / 1000) * count) }}</span>
					</div>
				</div>
				<div class="card">
					<div class="stat-card">
						<span>코멘트 작성 수</span><br />
						<span>{{ Math.round((profile.userCntCm / 1000) * count) }}</span>
					</div>
				</div>
				<div class="card">
					<div class="stat-card">
						<span>활동 경험치</span><br />
						<div class="tooltip">
							<b>활동 경험치란?</b> <br />
							<br />게시글, 댓글 작성 및 좋아요 등 EnjoyTrip 사이트 내 활동을 통해 얻는 점수입니다. <br />
							<br />
							<small>
								(활동 경험치) = (게시글 작성 수) * 50 + (댓글 작성 수) * 20 + (좋아요 누른 수) * 5 + (좋아요 받은 수) * 10 + (코멘트 추천함) * 2
								+ (코멘트 추천받음) * 5
							</small>
						</div>
						<span>{{ Math.round((activityExp / 1000) * count) }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { ref, computed } from "vue";

const userStore = useUserStore();
const { profile } = userStore;

const activityExp = computed(() => {
	return (
		profile.userCntWr * 50 + profile.userCntCm * 20 + profile.userCntLk * 5 + profile.userCntLkd * 10 + profile.userCntCmtLk * 2 + profile.userCntCmtLkd * 5
	);
});
const count = ref(0);

let a = 0;
let b = 0.526;

const interval = setInterval(() => {
	a += b;
	if (a < 0) a = 0.05;
	b -= 0.01;
	count.value += a;
	if (count.value > 1000) clearInterval(interval);
}, 40);
</script>

<style>
.stat-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: rgb(232, 235, 238);
	padding: 2rem;
	margin-top: auto;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stat-title {
	font-size: 3rem;
	font-weight: bold;
	margin-bottom: 1.5rem;
}

.card-container {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: row;
}

.stat-card {
	text-align: center;
	background-color: #ffffff;
	padding: 1.5rem;
	border-radius: 10px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	margin: 1rem;
	width: 200px;
	transition: transform 0.3s ease-in-out;
}

.stat-card:hover {
	transform: scale(1.05);
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.stat-card span:first-child {
	font-weight: bold;
	font-size: 1.2rem;
	color: #333333;
}

.stat-card span:last-child {
	font-size: 2rem;
	color: #96e920;
}

.tooltip {
	visibility: hidden;
	width: 25rem;
	background-color: #555;
	color: #fff;
	text-align: center;
	border-radius: 5px;
	padding: 5px;
	position: absolute;
	z-index: 1;
	bottom: 100%;
	left: 50%;
	margin-left: -100px;
	opacity: 0;
	transition: opacity 0.3s;
}

.stat-card:hover .tooltip {
	visibility: visible;
	opacity: 1;
}
</style>
