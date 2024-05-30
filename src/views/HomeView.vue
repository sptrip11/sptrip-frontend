<template>
	<!-- banner -->
	<div class="banner" id="home">
		<img :src="bannerImagePath" alt="Banner Image" :style="imageStyle" />
		<div class="layer">
			<div class="container">
				<div class="row">
					<div class="col-md-6 banner-text-w3ls">
						<!-- banner slider-->
						<div class="csslider infinity" id="slider1">
							<input type="radio" name="slides" checked="checked" id="slides_1" />
							<input type="radio" name="slides" id="slides_2" />
							<input type="radio" name="slides" id="slides_3" />
							<ul class="banner_slide_bg">
								<li>
									<div class="container-fluid">
										<div class="w3ls_banner_txt">
											<h3 class="b-w3ltxt text-capitalize mt-md-4">Enjoy Trip</h3>
											<span class="text-light" style="line-height: 2.2" aria-hidden="true">
												지금!! 서파트와 함께 우리나라 관광지를 알아보고 <br />
												나만의 여행 계획을 세워보세요!!
											</span>
										</div>
									</div>
								</li>
								<li>
									<div class="container-fluid">
										<div class="w3ls_banner_txt">
											<h3 class="b-w3ltxt text-capitalize mt-md-4">Gallery</h3>
											<span class="text-light" style="line-height: 2.2" aria-hidden="true">
												어디로 갈지 여전히 고민된다면? <br />
												갤러리를 둘러보고 마음을 정해봐요!
											</span>
										</div>
									</div>
								</li>
								<li>
									<div class="container-fluid">
										<div class="w3ls_banner_txt">
											<h3 class="b-w3ltxt text-capitalize mt-md-4">Planner</h3>
											<span class="text-light" style="line-height: 2.2" aria-hidden="true">
												이미 마음 속에 정해둔 관광지가 있나요? <br />
												그럼 여행 계획을 세우고 떠날 준비를 해봐요!
											</span>
										</div>
									</div>
								</li>
							</ul>
							<div class="navigation">
								<div>
									<label for="slides_1"></label>
									<label for="slides_2"></label>
									<label for="slides_3"></label>
								</div>
							</div>
						</div>
						<!-- //banner slider-->
					</div>
					<div class="col-md-6 px-lg-3 px-0">
						<div class="banner-form-w3 ml-lg-5">
							<div class="padding">
								<form action="#" method="post">
									<h5 class="mb-3">관광지 검색하기</h5>
									<div class="form-style-w3layout">
										<input placeholder="시/도 검색" name="name" type="text" required="" />
										<input placeholder="구/면 검색" name="name" type="text" required="" />
										<button Class="btn">Go Travel!</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- //banner -->
	<!-- destinations -->
	<section class="destinations py-5" id="destinations">
		<div class="container py-md-5">
			<h3 class="heading text-center mb-3 mb-sm-5">어디로 갈까요?</h3>
			<p class="heading text-center mb-3 mb-sm-5">세련된 도시부터 아름다운 자연까지, 다채로운 우리나라의 주요 지역들을 둘러봐요</p>
			<div class="row inner-sec-w3layouts-w3pvt-lauinfo">
				<div class="col-md-3 col-sm-6 col-6 destinations-grids text-center mb-4">
					<h4 class="destination mb-3">서울</h4>
					<div class="image-position position-relative">
						<img src="/src/assets/images/p1.jpg" class="img-fluid" alt="" />
						<div class="rating">
							<ul>
								<li><span class="fa fa-bus"></span> 333개의 여행지</li>
							</ul>
						</div>
					</div>
					<div class="destinations-info">
						<div class="caption mb-lg-3">
							<h4>서울</h4>
							<a href="./assets/html/search.html?value=1">둘러보기</a>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-6 destinations-grids text-center mb-4">
					<h4 class="destination mb-3">부산</h4>
					<div class="image-position position-relative">
						<img src="/src/assets/images/p2.jpg" class="img-fluid" alt="" />
						<div class="rating">
							<ul>
								<li><span class="fa fa-bus"></span> 126개의 여행지</li>
							</ul>
						</div>
					</div>
					<div class="destinations-info">
						<div class="caption mb-lg-3">
							<h4>부산</h4>
							<a href="./assets/html/search.html?value=2">둘러보기</a>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-6 destinations-grids text-center mb-4">
					<h4 class="destination mb-3">경주</h4>
					<div class="image-position position-relative">
						<img src="/src/assets/images/p3.jpg" class="img-fluid" alt="" />
						<div class="rating">
							<ul>
								<li><span class="fa fa-bus"></span> 68개의 여행지</li>
							</ul>
						</div>
					</div>
					<div class="destinations-info">
						<div class="caption mb-lg-3">
							<h4>경주</h4>
							<a href="./assets/html/search.html?value=3">둘러보기</a>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-6 destinations-grids text-center mb-4">
					<h4 class="destination mb-3">제주도</h4>
					<div class="image-position position-relative">
						<img src="/src/assets/images/p4.jpg" class="img-fluid" alt="" />
						<div class="rating">
							<ul>
								<li><span class="fa fa-bus"></span> 217개의 여행지</li>
							</ul>
						</div>
					</div>
					<div class="destinations-info">
						<div class="caption mb-lg-3">
							<h4>제주도</h4>
							<a href="./assets/html/search.html?value=4">둘러보기</a>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-6 destinations-grids text-center mb-4">
					<h4 class="destination mb-3">대전</h4>
					<div class="image-position position-relative">
						<img src="/src/assets/images/p5.jpg" class="img-fluid" alt="" />
						<div class="rating">
							<ul>
								<li><span class="fa fa-bus"></span> 79개의 여행지</li>
							</ul>
						</div>
					</div>
					<div class="destinations-info">
						<div class="caption mb-lg-3">
							<h4>대전</h4>
							<a href="./assets/html/search.html?value=5">둘러보기</a>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-6 destinations-grids text-center mb-4">
					<h4 class="destination mb-3">광주</h4>
					<div class="image-position position-relative">
						<img src="/src/assets/images/p6.jpg" class="img-fluid" alt="" />
						<div class="rating">
							<ul>
								<li><span class="fa fa-bus"></span> 49개의 여행지</li>
							</ul>
						</div>
					</div>
					<div class="destinations-info">
						<div class="caption mb-lg-3">
							<h4>광주</h4>
							<a href="./assets/html/search.html?value=6">둘러보기</a>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-6 destinations-grids text-center mb-4">
					<h4 class="destination mb-3">강원</h4>
					<div class="image-position position-relative">
						<img src="/src/assets/images/p7.jpg" class="img-fluid" alt="" />
						<div class="rating">
							<ul>
								<li><span class="fa fa-bus"></span> 70개의 여행지</li>
							</ul>
						</div>
					</div>
					<div class="destinations-info">
						<div class="caption mb-lg-3">
							<h4>강원</h4>
							<a href="./assets/html/search.html?value=7">둘러보기</a>
						</div>
					</div>
				</div>
				<div class="col-md-3 col-sm-6 col-6 destinations-grids text-center mb-4">
					<h4 class="destination mb-3">창원</h4>
					<div class="image-position position-relative">
						<img src="/src/assets/images/p8.jpg" class="img-fluid" alt="" />
						<div class="rating">
							<ul>
								<li><span class="fa fa-bus"></span> 65개의 여행지</li>
							</ul>
						</div>
					</div>
					<div class="destinations-info">
						<div class="caption mb-lg-3">
							<h4>창원</h4>
							<a href="./assets/html/search.html?value=8">둘러보기</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- destinations -->
	<!--/testimonials -->
	<section class="testimonials py-5" id="testimonials">
		<div class="container py-md-5">
			<h3 class="heading heading1 text-center mb-3 mb-sm-5">계획 세우기</h3>
			<p class="heading text-center mb-3 mb-sm-5">여행지를 정하셨나요? 여행 날짜별로 어디를 방문할지도 계획할 수 있어요!</p>
			<div class="row">
				<div class="col-md-12 gal-img">
					<img src="../assets/images/plan.jpg" alt="news image" class="img-fluid" />
				</div>
			</div>
			<div class="row d-flex justify-content-center">
				<div class="col-lg-4 col-sm-6 test-info mb-4">
					<button>Comming Soon...!</button>
				</div>
			</div>
		</div>
	</section>
	<!--//testimonials -->
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";

let sz = 10;
let randInt = ref(Math.floor(Math.random() * sz));
let beforeInt = randInt.value;

const bannerImagePath = computed(() => `http://localhost:8080/api/image?path=/banner/${randInt.value}.jpg`);

let countUpInterval = null;
const imageScale = ref(1);
const SPEED = [0.001, 0.0005, 0.0002];
let speedIdx = 0;

const imageStyle = computed(() => {
	if (imageScale.value < 1.15) speedIdx = 0;
	else if (imageScale.value < 1.18) speedIdx = 1;
	else if (imageScale.value < 1.22) speedIdx = 2;
	else {
		updateImage();
		imageScale.value = 1;
		speedIdx = 0;
	}

	return {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: `translate(-50%, -50%) scale(${imageScale.value})`,
		minWidth: "100%",
		minHeight: "100%",
		width: "auto",
		height: "auto",
	};
});

const updateImage = () => {
	randInt.value = Math.floor(Math.random() * sz);
	if (randInt.value == beforeInt) randInt.value = (randInt.value + 1) % sz;
	beforeInt = randInt;
};

const startInterval = () => {
	countUpInterval = setInterval(() => {
		imageScale.value += SPEED[speedIdx];
	}, 20);
};

const stopInterval = () => {
	clearInterval(countUpInterval);
};

onMounted(() => {
	startInterval();
});

onUnmounted(() => {
	stopInterval();
});
</script>

<style>
.banner {
	position: relative;
	width: 100%;
	height: 100vh;
	overflow: hidden;
}
</style>
