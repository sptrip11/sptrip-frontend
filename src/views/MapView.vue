<template>
	<div>
		<div id="map"></div>
	</div>

	<div class="info-area" :style="{ transform: isCollapsed ? 'translateX(-100%)' : 'translateX(0%)' }">
		<div id="infoContainer" class="info-container">
			<div v-for="item in infoCards" :key="item.title" class="info-card" @click="detail(item.contentid)">
				<img :src="item.src || '/src/assets/img/404img.gif'" class="img-thumbnail" :alt="item.title" />
				<div class="info-text-container">
					<div style="text-align: right">
						<p>{{ item.title }}</p>
						<p>{{ item.addr }}</p>
					</div>
				</div>
			</div>
		</div>
		<button @click="handleCollapse" class="info-btn">
			<i :class="['bi', isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left']"></i>
		</button>
	</div>
	<div class="input-area">
		<a class="home__btn" href="../">
			<i class="bi bi-chevron-left"></i>
		</a>
		<form @submit.prevent="searchHandler">
			<input v-model="keyword" class="search-input" placeholder="키워드로 여행지를 검색하세요." />
		</form>
	</div>
	<div v-if="showModal" class="modal">
		<div class="modal-content">
			<div>
				<span
					@click="
						showModal = false;
						showModal3 = false;
						showModal4 = false;
					"
					class="close"
					>&times;</span
				>
				<img :src="details.firstimage || '/src/assets/img/404img.gif'" :alt="details.title" class="content-img" />
				<div class="centered-content">
					<div class="content-title">{{ details.title }}</div>
					<p style="color: black"><i class="bi bi-house-fill"></i> {{ details.addr1 }}</p>
					<p v-if="details.homepage" style="color: black">
						<i class="bi bi-box-arrow-up-right" style="font-size: 17px"></i> <span v-html="details.homepage" style="font-size: 17px"> </span>
					</p>
					<p v-else style="color: black"><i class="bi bi-box-arrow-up-right" style="font-size: 17px"></i> 정보없음</p>
					<p style="color: black">
						<i class="bi bi-telephone-fill"></i> {{ details.telname || details.title }} : {{ details.tel || "정보 없음" }}
						<span class="btn-set-container">
							<button @click="modalPlanAdd(); this.tmpcontentId = details.contentid;" class="plan-plus-btn" style="border: none">
								<i class="bi bi-plus-lg"></i>
							</button>
							<button @click="toggleWish(details.contentid)" class="wish-btn" style="color: #e0da1f">
								<i :class="['bi', isWish ? 'bi-star-fill' : 'bi-star']"></i> <!--위시-->
							</button>
						</span>
					</p>
				</div>
				<p class="content-overview">{{ details.overview }}</p>
				<div class="comment-container">
					<div class = "input-comment-container" v-show="userNickname != null">
						<label style="position: relative; left: 20px;">{{ userNickname }}</label>
						<textarea class = "input-comment-container-textarea" v-model="mycomment" placeholder="댓글을 입력하세요..."> </textarea><br />
						<span class = "star-rating">
							<input type = "radio" class="star" value = "1" v-model="rating" >
							<input type = "radio" class="star" value = "2" v-model="rating" >
							<input type = "radio" class="star" value = "3" v-model="rating" >
							<input type = "radio" class="star" value = "4" v-model="rating" >
							<input type = "radio" class="star" value = "5" v-model="rating" >
						</span>
						<button class="comment-btn" @click="submitComment(details.contentid)">등록</button> 
					</div>
					<div v-for="(comment, index) in commentItems" :key="index" class="comment">
						<div> 
							<a style="font-size: 20px; color: black; padding-right: 10%">{{ comment.userNickname }}</a>
							{{ comment.attrCmtContent }}
							<text style="width: 7%; position: absolute; right:180px ">
								{{ comment.cmtCntLkd }}
								<i :class="['bi', comment.liked ? 'bi-suit-heart-fill' : 'bi-suit-heart']"  style="cursor: pointer; color: red;" @click="comment.liked ? unlikeComment(index,comment.userSeq,comment.attrCmtId) : likeComment(index,comment.userSeq,comment.attrCmtId)"></i>
							</text>
							<span class = "star-rating2" style="position: relative; top:-35px; left: 720px;">
								<span v-for="n in 5" :key="n" class="star2" :class="{ filled: n <= comment.attrCmtStar}">&#9733;</span>
							</span>	
							<span style="color: crimson; position:relative; top:-65px;left:850px; cursor: pointer;" @click="commentStore.deleteComment(comment.userSeq, comment.attrCmtId, comment.contentId)"> 삭제 </span>

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="info-btn-area" style="right: 20px">
		<button class="wishlist-btn" :data-isWishTab="isWishTab.toString()" @click="wishTab">위시리스트</button>
		<button class="plannerlist-btn" :data-isPlannerTab="isPlannerTab.toString()" @click="plannerTab">플래너</button>
	</div>
	<div class="info-container2" v-if="isWishTab" :data-isWishTab="isWishTab.toString()">
		<div v-for="item in wishCards" :key="item.title" class="wish-card" @click="detail(item.contentid)">
			<img :src="item.src || '/src/assets/img/404img.gif'" class="img-thumbnail" :alt="item.title" />
			<div class="info-text-container">
				<div style="text-align: right">
					<p>{{ item.title }}</p>
					<p>{{ item.addr }}</p>
				</div>
			</div>
		</div>
	</div>

	<div class="info-area2" :data-isPlannerTab="isPlannerTab.toString()" style="transform: translateX(50%)">
		<span class="info-container3" v-if="isPlannerTab">
			<div v-for="(day, index) in days" :key="index" style="width: 100%">
				<h3 class="day-count" style="text-align: center">Day {{ day }}</h3>
				<div v-if="!planzero">
					<div v-for="item in planCardInfo[day]" :key="item.title" class="plan-card" @click="detail(item.contentid)">
						<span @click.stop="plannerContentStore.deletePlannerContent(item.plannerContentId,item.plannerId); plannerTab(); plannerTab();" class="close">&times;</span>
						<img :src="item.firstimage || '/src/assets/img/404img.gif'" class="img-thumbnail" :alt="item.title" />
						<div class="info-text-container" style="z-index: 5">
							<div style="text-align: right">
								<p>{{ item.title }}</p>
								<p>{{ item.addr }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</span>
		<div
			class="info-area3"
			v-if="isPlannerTab"
			:style="{ transform: isCollapsed2 ? 'translateX(-200%)' : 'translateX(-100%)' }"
			style="transition: all 0.4s; z-index: 10"
		>
			<span class="info-container4">
				<div class="info-planner" v-for="(planner, index) in plannerItems" :key="index" @click="selectPlanner(planner.plannerId, planner.plannerCntDt);">
					<button @click.stop="plannerStore.deletePlanner(planner.plannerId); this.plannerStore.fetchPlannerItems();" class="close2">&times;</button>
					<h5>
						<strong>{{ planner.plannerName }}</strong>
					</h5>
					<h6>{{ planner.plannerCntDt }}일</h6>
				</div>
				<button class="planner-plus-btn" @click="showModal2 = true">
					<i class="bi bi-plus-lg"></i>
				</button>
			</span>
			<button class="info-btn2" @click="handleCollapse2">
				<i :class="['bi', isCollapsed2 ? 'bi-chevron-right' : 'bi-chevron-left']"></i>
			</button>0
		</div>
	</div>
	<div v-if="showModal2" class="planner-modal">
		<div class="planner-modal-content">
			<div style="justify-content: center">
				<span @click="showModal2 = false" class="close">&times;</span>
				<div class="planner-modal-center">
					<h1 style="font-size: xx-large;">𝓝𝓮𝔀 𝓟𝓵𝓪𝓷</h1>
				</div>
				<div class="input-group" style="align-items: center">
					<input type="text" id="plan-name" v-model="planName" placeholder="Plan name" />
					<label for="plan-days" style="padding-top: 20px; font-size: 20px">𝓣𝓸𝓽𝓪𝓵 𝓟𝓵𝓪𝓷 𝓓𝓪𝔂𝓼: {{ planDays }}</label>
					<input type="range" id="plan-days" v-model="planDays" min="1" max="14" />
					<button class="planner-add-btn" @click="makeNewPlanner(); this.plannerStore.fetchPlannerItems();">확인</button>
				</div>
			</div>
		</div>
	</div>
	<div v-if="showModal3" class="add-planner-modal">
		<div class="add-planner-modal-content">
			<span @click="showModal3 = false" class="close">&times;</span>
			<div class="planner-modal-center2">
				<h1 style="font-size: xx-large;">𝓐𝓭𝓭 𝓹𝓵𝓪𝓷</h1>
			</div>
			<div class="input-group2" style="align-items: center">
				<div v-for="(plangroup, index) in plannerItems" :key="index" class="plangroup" @click="goPlanDetail(plangroup.plannerCntDt); this.tmpplannerId=plangroup.plannerId">
					{{ plangroup.plannerName }}
				</div>
			</div>
		</div>
	</div>
	<div v-if="showModal4" class="add-planner-modal">
		<div class="add-planner-modal-content">
			<span @click="showModal4 = false" class="close">&times;</span>
			<div class="planner-modal-center2">
				<h1 style="font-size: xx-large;">𝓐𝓭𝓭 𝓹𝓵𝓪𝓷</h1>
			</div>
			<div class="input-group2" style="align-items: center">
				<div v-for="number in numbers" :key="number" class="plangroup" @click="addPlannerPost(number)">Day {{ number }}</div>
			</div>
		</div>
	</div>
</template>
<script>
import { watchEffect, ref } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useAttrCommentStore } from "@/stores/attrComment";
import { useWishStore } from "@/stores/wish";
import { usePlannerStore } from "@/stores/planner";
import { usePlannerContentStore } from "@/stores/plannerContent";

export default {
	name: "KakaoMap",
	setup() {
		const userNickname = sessionStorage.getItem("userNickname");
		const commentStore = useAttrCommentStore();
		const { commentItems } = storeToRefs(commentStore);
		const wishStore = useWishStore();
		const { wishItems, isWish, wishCards } = storeToRefs(wishStore);
		const plannerStore = usePlannerStore();
		const { plannerItems, planCardInfo }= storeToRefs(plannerStore);
		const plannerContentStore = usePlannerContentStore();
		const { planenrContentItems } = storeToRefs(plannerContentStore)
		const route = useRoute();

		watchEffect(async () => {
			const id = route.params.id; // route의 파라미터에서 id를 가져옴
			if (id) {
				await commentStore.fetchCommentItems(id);
			}
		});

		return {
			commentStore,
			wishStore,
			plannerStore,
			plannerContentStore,	
			route,
			userNickname,
			commentItems,
			wishItems,
			isWish,
			plannerItems,
			planenrContentItems,
		};
	},
	data() {
		//nehayDcG4u7Utwdh2WvcxymE3QRbH7hF7d8vGHJ0BIg0cVXXvBDnfaHXkFgQkcE5mPlDydGSRSc%2FZI3LAqzE8Q%3D%3D
		//j18%2Ff7M25mqLFJlRlQwm4xCoBcbE5p9WTKOOqoSdBLg%2BXHBEP7M77YpfYTq4wZO9aHE3XQ8P8BPpLNkDT85NtA%3D%3D
		return {
			API_URI: "http://apis.data.go.kr/B551011/KorService1",
			KEY: "j18%2Ff7M25mqLFJlRlQwm4xCoBcbE5p9WTKOOqoSdBLg%2BXHBEP7M77YpfYTq4wZO9aHE3XQ8P8BPpLNkDT85NtA%3D%3D",
			marker: {},
			markerList: [],
			wishmarkerList: [],
			planmarkerList: [],
			keyword: "",
			markerTrackerList: [],
			isCollapsed: true,
			infoCards: [],
			planCardInfo: ref([]),
			showModal: false,
			showModal2: false,
			showModal3: false,
			showModal4: false,
			details: "",
			newComment: "",
			comments: [],
			mycomment: "",
			isWishTab: false,
			isPlannerTab: false,
			isCollapsed2: false,
			planDays: 1,
			days: [],
			numbers: [],
			rating: 0,
			planzero: false,
			tmpcontentId: "",
			tmpplannerId: "",
			tmpplannerCmtDt: "",
		};
	},
	mounted() {
		if (window.kakao && window.kakao.maps) {
			this.initMap();
		} else {
			const script = document.createElement("script");
			/* global kakao */
			script.onload = () => kakao.maps.load(this.initMap);
			script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=915cffed372954b7b44804ed422b9cf0";
			document.head.appendChild(script);
		}
	},
	methods: {
		initMap() {
			const container = document.getElementById("map");
			const options = {
				center: new kakao.maps.LatLng(33.450701, 126.570667),
				level: 5,
			};

			this.map = new kakao.maps.Map(container, options);
			this.marker = new kakao.maps.Marker({
				map: this.map,
				position: this.map.getCenter(),
			});
			kakao.maps.event.addListener(this.map, "click", this.mapClickHandler);
		},
		async mapClickHandler(e) {
			const pos = e.latLng;
			this.marker.setPosition(pos);

			this.markerList.forEach((e) => e.setMap(null));
			this.markerList = []; // 마커 리스트 클리어

			const base = this.API_URI + "/locationBasedList1?";
			const params = {
				MobileOS: "AND",
				MobileApp: "seoul_wave",
				_type: "json",
				mapX: pos.getLng(),
				mapY: pos.getLat(),
				radius: 10000,
			};
			const parsed = new URLSearchParams(params).toString();
			const url = base + parsed + "&serviceKey=" + this.KEY;
			const res = await fetch(url);
			const data = await res.json();
			const items = data?.response?.body?.items?.item ?? [];

			items.forEach((e) => {
				const imageSize = new kakao.maps.Size(35, 35);
				const markerImage = new kakao.maps.MarkerImage("/src/assets/img/basic_marker_icon.png", imageSize);
				const tmpMarker = new kakao.maps.Marker({
					map: this.map,
					position: new kakao.maps.LatLng(e.mapy, e.mapx),
					title: e.title,
					image: markerImage,
				});
				this.markerList.push(tmpMarker);
			});

			if (items.length > 0) {
				const movePos = new kakao.maps.LatLng(items[0].mapy, items[0].mapx);
				this.map.panTo(movePos);
			}
			this.infoRenderHandler(items); // 'infoRenderHandler' 메소드를 정의해야 합니다.
			console.log(items);
		},
		infoRenderHandler(data) {
			if (!Array.isArray(data)) return;
			this.infoCards = data.map((item) => ({
				src: item.firstimage || "",
				title: item.title || "",
				contentid: item.contentid || "",
				addr: item.addr1 || "",
			}));
		},
		infoRenderHandler2(data) {
			if (!Array.isArray(data)) return;
			this.wishCards = data.map((item) => ({
				src: item.firstimage || "",
				title: item.title || "",
				contentid: item.contentid || "",
				addr: item.addr1 || "",
			}));
		},
		infoRenderHandler3(data) {
			if (!Array.isArray(data)) return;

			this.planCardInfo = {};
			for(let i = 1; i <= 14; i++){
				this.planCardInfo[i]= [];
			}
			for(let item of data){
				this.planCardInfo[item.plannerDt].push(item);
			}
		},
		async searchHandler() {
			this.markerTrackerList.forEach((m) => m.stop());
			this.markerList.forEach((m) => m.setMap(null));
			this.markerList = [];

			// API 호출을 위한 URL 구성
			const base = this.API_URI + "/searchKeyword1?";
			const params = {
				MobileOS: "AND",
				MobileApp: "seoul_wave",
				_type: "json",
				keyword: this.keyword,
			};
			const parsed = new URLSearchParams(params).toString();
			const url = base + parsed + "&serviceKey=" + this.KEY;

			// 데이터 요청
			const simple_res = await fetch(url);
			const res = await (await fetch(url)).json();
			const data = res?.response?.body?.items?.item ?? [];

			// 마커 생성 및 지도에 추가
			data.forEach((e) => {
				const imageSize = new kakao.maps.Size(35, 35); // 마커 이미지 크기 설정
				const markerImage = new kakao.maps.MarkerImage("/src/assets/img/basic_marker_icon.png", imageSize); // 마커 이미지 설정
				const tmpMarker = new kakao.maps.Marker({
					map: this.map,
					position: new kakao.maps.LatLng(e.mapy, e.mapx),
					title: e.title,
					image: markerImage,
				});
				this.markerList.push(tmpMarker);
			});

			// 지도 중심 이동
			if (data.length > 0) {
				const movePos = new kakao.maps.LatLng(data[0].mapy, data[0].mapx);
				this.map.panTo(movePos);
			}

			this.infoRenderHandler(data);
		},
		handleCollapse() {
			this.isCollapsed = !this.isCollapsed;
		},
		handleCollapse2() {
			this.isCollapsed2 = !this.isCollapsed2;
		},

		async toggleWish(id) {
			if(this.isWish){
				console.log("Try delete");
				await this.wishStore.deleteWish(id);
				await this.wishStore.fetchWishItems();
				await this.makeWish(this.wishItems);
			}else{
				console.log("Try post");
				await this.wishStore.postWish(id);
				await this.wishStore.fetchWishItems();
				await this.makeWish(this.wishItems);
			}
			this.isWish = !this.isWish;
		},
		async detail(id) {
			const base = this.API_URI + "/detailCommon1?";
			const params = {
				MobileOS: "AND",
				MobileApp: "seoul_wave",
				_type: "json",
				contentId: id,
				defaultYN: "Y",
				firstImageYN: "Y",
				addrinfoYN: "Y",
				overviewYN: "Y",
			};
			const parsed = new URLSearchParams(params).toString();
			const url = base + parsed + "&serviceKey=" + this.KEY;
			try {
				const res = await fetch(url);
				if (!res.ok) {
					throw new Error("API 호출에 실패했습니다.");
				}
				const data = await res.json();
				const item = data?.response?.body?.items?.item ?? [];
				this.details = item[0];
				await this.commentStore.fetchCommentItems(id); // 추가
				this.commentItems = this.commentStore.commentItems; // 추가
				this.wishStore.wishCheck(id);
				this.showModal = true;
			} catch (err) {
				console.error(err);
				alert("정보를 불러오는 데 실패했습니다.");
			}
		},
		async makeWish(wishdummy) {
			const base = this.API_URI + "/detailCommon1?";
			const wishList = [];
			this.wishmarkerList.forEach((e) => e.setMap(null));
			const imageSize = new kakao.maps.Size(35, 35);
			const markerImage = new kakao.maps.MarkerImage("/src/assets/img/wish_marker_icon.png", imageSize);
			for (const item of wishdummy) {
				const params = {
					MobileOS: "AND",
					MobileApp: "seoul_wave",
					_type: "json",
					contentId: item.contentId,
					defaultYN: "Y",
					firstImageYN: "Y",
					addrinfoYN: "Y",
					overviewYN: "Y",
					mapinfoYN: "Y",
				};
				const parsed = new URLSearchParams(params).toString();
				const url = base + parsed + "&serviceKey=" + this.KEY;
				try {
					const res = await fetch(url);
					if (!res.ok) {
						throw new Error("API 호출에 실패했습니다.");
					}
					const data = await res.json();
					const items = data?.response?.body?.items?.item ?? [];
					wishList.push(items[0]);
					const tmpMarker = new kakao.maps.Marker({
						map: this.map,
						position: new kakao.maps.LatLng(items[0].mapy, items[0].mapx),
						title: items[0].title,
						image: markerImage,
					});
					this.wishmarkerList.push(tmpMarker);
				} catch (err) {
					console.log(err);
					alert("정보를 불러오는 데 실패했습니다.");
				}
			}
			this.infoRenderHandler2(wishList);
		},
		async makePlannerCards(plandummy) {
			if (!plandummy || plandummy.length === 0) {
					this.planzero = true;
        			return;
    		}
			const base = this.API_URI + "/detailCommon1?";
			const planList = [];
			const imageSize = new kakao.maps.Size(35, 35);
			const markerImage = new kakao.maps.MarkerImage("/src/assets/img/planner_marker_icon.png", imageSize);
			for (const item of plandummy) {
				const params = {
					MobileOS: "AND",
					MobileApp: "seoul_wave",
					_type: "json",
					contentId: item.contentId,
					defaultYN: "Y",
					firstImageYN: "Y",
					addrinfoYN: "Y",
					overviewYN: "Y",
					mapinfoYN: "Y",
				};
				const parsed = new URLSearchParams(params).toString();
				const url = base + parsed + "&serviceKey=" + this.KEY;
				try {
					const res = await fetch(url);
					if (!res.ok) {
						throw new Error("API 호출에 실패했습니다.");
					}
					const data = await res.json();
					const items = data?.response?.body?.items?.item ?? [];
					items[0].plannerDt = item.plannerDt;
					items[0].plannerContentId = item.plannerContentId;
					items[0].plannerId = item.plannerId;
					planList.push(items[0]);
					const tmpMarker = new kakao.maps.Marker({
						map: this.map,
						position: new kakao.maps.LatLng(items[0].mapy, items[0].mapx),
						title: items[0].title,
						image: markerImage,
					});
					this.planmarkerList.push(tmpMarker);
				} catch (err) {
					console.log(err);
					alert("정보를 불러오는 데 실패했습니다.");
				}
				this.infoRenderHandler3(planList);
			}
		},
		submitComment(contentId) {
			if(this.mycomment.trim() != ""){
				this.commentStore.postComment(contentId,this.mycomment,this.rating);
				this.mycomment = "";
				this.rating = 0;
			} else {
				alert("댓글을 입력해주세요.");
			}
		},
		async wishTab() {
			if (this.isWishTab == false) {
				if (this.isPlannerTab == true) {
					this.isPlannerTab = false;
					this.planmarkerList.forEach((e) => e.setMap(null));
					this.isCollapsed2 = false;
				}
				await this.wishStore.fetchWishItems();
				await this.makeWish(this.wishItems);
			} else {
				this.wishmarkerList.forEach((e) => e.setMap(null));
			}
			this.isWishTab = !this.isWishTab;
		},
		async plannerTab() {
			if (this.isPlannerTab == false) {
				if (this.isWishTab == true) {
					this.isWishTab = false;
					this.wishmarkerList.forEach((e) => e.setMap(null));
				}
				await this.plannerStore.fetchPlannerItems();
			} else {
				this.planmarkerList.forEach((e) => e.setMap(null));
				this.isCollapsed2 = false;
			}
			this.isPlannerTab = !this.isPlannerTab;
		},
		async makeNewPlanner() {
			if (!this.planName) {
				alert("플랜 이름을 적어주세요.");
			} else {
				this.showModal2 = false;
				this.plannerStore.postPlanner(this.planName,this.planDays);
				this.planName = "";
				this.planDays = 1;
			}
		},
		async selectPlanner(plannerId, plannerCntDt) {
			this.planzero = false;
			this.isCollapsed2 = true;
			this.days = [];
			for (let i = 1; i <= plannerCntDt; i++) {
				this.days.push(i);
			}
			await this.plannerContentStore.fetchPlannerContentItems(plannerId);
			await this.makePlannerCards(this.plannerContentStore.plannerContentItems);
		},
		async modalPlanAdd() {
			this.showModal3 = true;
			await this.plannerStore.fetchPlannerItems();
		},
		numberRange(start, end) {
			return Array.from({ length: end - start + 1 }, (v, k) => k + start);
		},
		goPlanDetail(plannerCntDt) {
			this.showModal3 = false;
			this.showModal4 = true;
			this.numbers = Array.from({ length: plannerCntDt }, (_, i) => i + 1);
		},
		toggleLike (index) {
			if (!commentItems[index].liked) {
				commentItems[index].cmtCntLkd++;
			} else {
				commentItems[index].cmtCntLkd--;
			}
			commentItems[index].liked = commentItems[index].liked = !commentItems[index].liked;
		},
		likeComment (index,userSeq,attrCmtId){
			this.commentItems[index].cmtCntLkd++;
			this.commentItems[index].liked = true;
			this.commentStore.likeComment(attrCmtId);
		},
		unlikeComment(index,userSeq,attrCmtId){
			this.commentItems[index].cmtCntLkd--;
			this.commentItems[index].liked = false;
			this.commentStore.deleteLikeComment(attrCmtId);
		},
		async addPlannerPost(plannerDt){
			console.log(this.tmpplannerId);
			console.log(this.tmpcontentId);
			console.log(plannerDt);
			await this.plannerContentStore.postPlannerContent(this.tmpplannerId,this.tmpcontentId,plannerDt);
			this.showModal4 = false;
		}
	},
};
</script>

<style scoped>
@import "@/assets/style.css";
@import "@/assets/travle.css";

.img-thumbnail {
	padding: 0;
	width: 100%;
	height: 100%;
}

.modal {
	position: fixed;
	top: 53%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 1050;
	display: inline-flex;
	overflow: hidden;
	outline: 0;
	width: 100%;
	max-width: 1000px;
	height: 90%;
	max-height: 100%;
	background-color: white;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	padding: 5px;
}

.content-title {
	font-size: 50px;
	line-height: 100px;
}

.modal-content {
	padding: 45px;
	position: relative;
	overflow-y: auto;
	max-height: 1000px;
	/* Adjust this value based on your needs */
}

.centered-content {
	font-size: 20px;
	font-weight: bold;
	padding-bottom: 20px;
}

.content-img {
	width: 100%;
	text-align: center;
	display: block;
	margin: 0 auto;
	/* Center align image */
}

.close {
	position: absolute;
	top: -2.5px;
	right: 10px;
	font-size: 40px;
	/* 크기 조정 */
	font-weight: bold;
	cursor: pointer;
	/* 마우스 커서를 손가락 모양으로 변경 */
	z-index: 10;
}

.close:hover {
	color: rgb(179, 6, 6);
	/* Change text color on hover */
	transform: scale(1.2);
	/* Slightly increase the size on hover */
}

.close2 {
	position: absolute;
	top: -17px; /* 상단에서부터의 거리 */
  	right: 0; /* 우측에서부터의 거리 */
	font-size: 30px;
	font-weight: bold;
	cursor: pointer;
	z-index: 10;
	margin-bottom: 0px;
	padding: 5px;
	background-color: transparent;
	border: none;
	outline: none;
}

.close2:hover {
	color: rgb(179, 6, 6);
	/* Change text color on hover */
	transform: scale(1.2);
	/* Slightly increase the size on hover */
}

.content-overview {
	font-size: 15px;
}

.my-hr {
	border: 0;
	height: 2px;
	background: #ccc;
}

.wish-btn {
	border: none;
	padding: 5px 10px;
	background-color: transparent;
	outline: none;
	cursor: pointer;
}

.plan-plus-btn {
	border: none;
	outline: none;
}

.wish-btn:hover {
	transform: scale(1.2);
}

.btn-set-container {
	position: absolute;
	left: 860px;
}

textarea {
	width: 100%;
	margin-bottom: 10px;
	padding: 10px;
	box-sizing: border-box;
}

.comment-btn {
	position: absolute;
	left: 880px;
}

.wishlist-btn[data-isWishTab="false"],
.plannerlist-btn[data-isPlannerTab="false"] {
	width: 200px;
	height: 36px;
	border: 1px solid #2563eb;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 3px;
	color: #2563eb;
	background-color: #fafafa;
}

.wishlist-btn:hover[data-isWishTab="false"],
.plannerlist-btn:hover[data-isPlannerTab="false"] {
	background-color: #2563eb;
	color: white;
}

.wishlist-btn[data-isWishTab="true"],
.plannerlist-btn[data-isPlannerTab="true"] {
	width: 200px;
	height: 36px;
	border: 1px solid #2563eb;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 3px;
	color: #fafafa;
	background-color: #2563eb;
}

.wishlist-btn:hover[data-isWishTab="true"],
.plannerlist-btn:hover[data-isPlannerTab="true"] {
	background-color: white;
	color: #2563eb;
}

.info-container2[data-isWishTab="false"] {
	z-index: -1;
}

.info-area2[data-isPlannerTab="false"] {
	z-index: -1;
}

.input-comment-container{
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	border: 1px solid #000000;
	margin: 0.5rem auto;
	width: 100%; 
}

.input-comment-container-textarea{
	width: 95%;
	margin: auto;
	height: 75px;
	resize: none;
	border: none;
	background-color: rgb(242, 242, 242);
}

.star-rating {
  display: flex;
  position: relative;
  left: 730px;
}

.star {
	appearance: none;
	padding: 1px;
}

.star::after {
  content: '☆';
  color: hsl(60, 80%, 45%);
  font-size: 20px;
}

.star:hover::after,
.star:has(~ .star:hover)::after,
.star:checked::after,
.star:has(~ .star:checked)::after {
  content: '★';
}

.star:hover ~ .star::after {
  content: '☆';
}

.star-rating2 {
	display: flex;
	direction: row;
	font-size: 24px;
}

.star-rating2 .star2{
	color: #d3d3d3;
}

.star-rating2 .star2.filled{
	color: hsl(60, 80%, 45%);
}
</style>
