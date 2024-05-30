<template>
    <div>
        <div id="map"></div>
    </div>
    <div class="info-area" :style="{ transform: isCollapsed ? 'translateX(-100%)' : 'translateX(0%)' }">
        <div id="infoContainer" class="info-container">
            <div v-for="item in infoCards" :key="item.title" class="info-card">
                <img :src="item.src || '../assets/img/no-image.png'" :alt="item.title" />
                <div class="info-text">
                    <p>{{ item.title }}</p>
                    <p>{{ item.addr }}</p>
                </div>
            </div>
        </div>
        <button @click="handleCollapse" class="info-btn">
            <i :class="['bi', isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left']"></i>
        </button>
    </div>
    <div class="input-area">
        <a class="home__btn" href="../index.html">
            <i class="bi bi-chevron-left"></i>
        </a>
        <form @submit.prevent="searchHandler">
            <input v-model="keyword" class="search-input" placeholder="키워드로 여행지를 검색하세요." />
        </form>
    </div>
</template>

<script>
export default {
    name: 'KakaoMap',
    data() {
        return {
            API_URI: 'https://apis.data.go.kr/B551011/KorService1',
            KEY: 'j18%2Ff7M25mqLFJlRlQwm4xCoBcbE5p9WTKOOqoSdBLg%2BXHBEP7M77YpfYTq4wZO9aHE3XQ8P8BPpLNkDT85NtA%3D%3D',
            marker: {},
            markerList: [],
            keyword: '',
            markerTrackerList: [],
            isCollapsed: false,
            infoCards: [],
        };
    },
    mounted() {
        if (window.kakao && window.kakao.maps) {
            this.initMap();
        } else {
            const script = document.createElement('script');
            /* global kakao */
            script.onload = () => kakao.maps.load(this.initMap);
            script.src = '//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=915cffed372954b7b44804ed422b9cf0';
            document.head.appendChild(script);
        }
    },
    methods: {
        initMap() {
            const container = document.getElementById('map');
            const options = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 5,
            };

            //지도 객체를 등록합니다.
            this.map = new kakao.maps.Map(container, options);

            // 마커 객체를 생성하고 지도에 표시합니다.
            this.marker = new kakao.maps.Marker({
                map: this.map,
                position: this.map.getCenter(),
            });

            // 지도 클릭 이벤트를 등록합니다
            kakao.maps.event.addListener(this.map, 'click', this.mapClickHandler);
        },
        async mapClickHandler(e) {
            const pos = e.latLng;
            this.marker.setPosition(pos);

            this.markerList.forEach((e) => e.setMap(null));
            this.markerList = []; // 마커 리스트 클리어

            const base = this.API_URI + '/locationBasedList1?';
            const params = {
                MobileOS: 'AND',
                MobileApp: 'seoul_wave',
                _type: 'json',
                mapX: pos.getLng(),
                mapY: pos.getLat(),
                radius: 10000,
            };
            const parsed = new URLSearchParams(params).toString();
            const url = base + parsed + '&serviceKey=' + this.KEY;
            const res = await fetch(url);
            const data = await res.json();
            const items = data?.response?.body?.items?.item ?? [];

            items.forEach((e) => {
                const imageSize = new kakao.maps.Size(24, 35);
                const markerImage = new kakao.maps.MarkerImage('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', imageSize);
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
                src: item.firstimage || '',
                title: item.title || '',
                addr: item.addr1 || '',
            }));
        },
        async searchHandler() {
            // 기존 마커 추적 중지 및 삭제
            this.markerTrackerList.forEach((m) => m.stop());
            this.markerList.forEach((m) => m.setMap(null));
            this.markerList = [];

            // API 호출을 위한 URL 구성
            const base = this.API_URI + '/searchKeyword1?';
            const params = {
                MobileOS: 'AND',
                MobileApp: 'seoul_wave',
                _type: 'json',
                keyword: this.keyword,
            };
            const parsed = new URLSearchParams(params).toString();
            const url = base + parsed + '&serviceKey=' + this.KEY;

            // 데이터 요청
            const res = await (await fetch(url)).json();
            const data = res?.response?.body?.items?.item ?? [];

            // 마커 생성 및 지도에 추가
            data.forEach((e) => {
                const imageSize = new kakao.maps.Size(24, 35); // 마커 이미지 크기 설정
                const markerImage = new kakao.maps.MarkerImage('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png', imageSize); // 마커 이미지 설정
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

            // 정보 렌더링 핸들러 호출
            this.infoRenderHandler(data);
        },
        handleCollapse() {
            // isCollapsed 값 토글
            this.isCollapsed = !this.isCollapsed;
        },
    },
};
</script>

<style scoped>
.input-area {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    max-width: 400px;
    padding: 20px;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 7px;
}

.input-area form {
    flex: 1;
}

.input-area .search-input {
    width: 100%;
    height: 36px;
    outline: none;
    border: 1px solid #2563eb;
    padding: 0px 10px;
    border-radius: 3px;
}

.input-area .home__btn {
    width: 36px;
    height: 36px;
    border: 1px solid #2563eb;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    color: #2563eb;
    background-color: #fafafa;
}
.input-area .home__btn:hover {
    background-color: #2563eb;
    color: white;
}

.info-area {
    width: 100%;
    max-width: 360px;
    background-color: #fafafa;
    height: calc(100vh - 76px - 20px);
    position: absolute;
    left: 20px;
    bottom: 20px;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    box-shadow: 5px 0px 15px 5px rgba(0, 0, 0, 0.2);
    transition: all 0.4s;
    padding: 15px;
}

.info-area .info-btn {
    width: 36px;
    height: 36px;
    border-radius: 100%;
    border: 1px solid #2563eb;
    background-color: #fafafa;
    color: #2563eb;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    transform: translateX(50%);
    cursor: pointer;
    transition: background-color 0.3s;
    outline: none;
}
.info-area .info-btn:hover {
    color: white;
    background-color: #2563eb;
}

.info-area .info-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    overflow: auto;
}

.info-area .info-card {
    width: 100%;
    height: 230px;
    flex-shrink: 0;
    border-radius: 4px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    position: relative;
    overflow: hidden;
    background-color: #e4e4e7;
    cursor: pointer;
}

.info-area .info-card:hover img {
    transform: scale(1.2);
}

.info-area .info-card img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border-radius: 4px;
    transition: all 0.3s;
}

.info-area .info-card .info-text {
    max-width: 330px;
    position: absolute;
    right: 5px;
    bottom: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    border-radius: 5px;
    color: white;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: 10px;
    overflow: hidden;
}

.info-area .info-card .info-text p {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: right;
    direction: rtl;
}

#map {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
}
</style>
