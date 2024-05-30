import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import axios from 'axios';
//import { c } from "vite/dist/node/types.d-aGj9QkWt";

export const useUserStore = defineStore('user', () => {
    const route = useRoute();
    const router = useRouter();
    const REST_API_PATH = 'http://localhost:8080/api';

    const user = ref({});
    const profile = ref({});

    const init = () => {
        user.value = {
            userseq: '',
            userId: '',
            userPw: '',
            userEmail: '',
            userRegDate: '',
            userNickname: '',
            userStateMsg: '',
            userImageUrl: '',
            userImageFile: '',
            accessToken: '',
        };
        profile.value = {
            userId: '',
            userEmail: '',
            userNickname: '',
            userStateMsg: '',
            userImageUrl: '',
            userCntWr: 123,
            userCntCm: 123,
            userCntLk: 123,
            userCntLkd: 123,
            userCntCmtLk: 123,
            userCntCmtLkd: 123,
            userCntFlw: 1000,
            userCntFlwd: 10000,
            userCntWt: 123,
            userCntWtd: 123,
            userCntStk: 123,
            userCntMstk: 123,
        };
    };

    const checkUserIdDuplicate = async () => {
        const response = await axios.get(`${REST_API_PATH}/check/id?userId=${user.value.userId}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    };

    const handleUserIdDuplicate = async () => {
        checkUserIdDuplicate()
            .then((ret) => {
                alert(ret.message);
            })
            .catch((err) => {
                alert(err);
            });
    };

    const checkUserNicknameDuplicate = async () => {
        const response = await axios.get(`${REST_API_PATH}/check/nickname?userNickname=${user.value.userNickname}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    };

    const handleUserNicknameDuplicate = async () => {
        checkUserNicknameDuplicate()
            .then((ret) => {
                alert(ret.message);
            })
            .catch((err) => {
                alert(err);
            });
    };

    const register = async () => {
        const formData = new FormData();
        formData.append('userId', user.value.userId);
        formData.append('userPw', user.value.userPw);
        formData.append('userEmail', user.value.userEmail);
        formData.append('userNickname', user.value.userNickname);
        formData.append('userStateMsg', user.value.userStateMsg);

        if (user.value.userImageFile != '') {
            formData.append('userImageFile', user.value.userImageFile);
            console.log(user.value.userImageFile);
        }
        axios
            .post(`${REST_API_PATH}/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then((response) => {
                handleRegisterResponse(response);
            })
            .catch((error) => {
                alert(error);
            });
    };

    const handleRegisterResponse = (response) => {
        if (response.data.result == 'success') {
            alert(response.data.message);
            router.push({ path: '/' });
        } else {
            alert(response.data.message);
        }
    };

    const login = async () => {
        try {
            const response = await axios.post(
                `${REST_API_PATH}/login`,
                {
                    userId: user.value.userId,
                    userPw: user.value.userPw,
                },
                { headers: { 'Content-Type': 'application/json' } }
            );
            console.log(response);
            if (response.data.result === 'success') {
                console.log(response.data);
                sessionStorage.setItem('userId', user.value.userId);
                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('userNickname', response.data.userNickname);
                sessionStorage.setItem('userSeq', response.data.userSeq);
                delete user.value.userPw;
                handleLoginSuccess(route.query.redirect);
            } else {
                handleLoginFailure(response.data.message);
            }
        } catch (error) {
            handleLoginFailure('An unexpected error occurred');
        }
    };

    const logout = () => {
        try {
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('userNickname');
            sessionStorage.removeItem('userSeq');
        } catch (error) {
            alert(error);
        }
        location.reload();
    };

    const fetchProfileData = async (userId) => {
        const response = await axios.get(`${REST_API_PATH}/profile/${userId}`, { headers: { 'Content-Type': 'application/json' } });
        return response.data;
    };

    const handleLoginSuccess = (_path_) => {
        if (_path_ == null) router.push({ path: '/' });
        else router.push({ path: _path_ });
    };

    const handleLoginFailure = (msg) => {
        alert(msg);
    };

    return {
        user,
        profile,
        register,
        init,
        login,
        logout,
        handleUserIdDuplicate,
        handleUserNicknameDuplicate,
        checkUserIdDuplicate,
        checkUserNicknameDuplicate,
        fetchProfileData,
    };
});
