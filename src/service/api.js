import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL)

let accessToken = null;
const api = axios.create({
    baseURL: 'https://ia-07-be.vercel.app/api',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
    timeout: 10000
});

// Gắn access token cho request (request)
api.interceptors.request.use(config => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// Tự động làm mới access token khi hết hạn (response)
// nếu thành công thì trả về response bình thường,
//Thất bại thì gọi api refresh để lấy token mới rồi retry lại request ban đầu
api.interceptors.response.use(response => {
    return response;
}, async error => {
    const originalRequest = error.config;
    //Chỉ thực hiện refresh token khi gặp lỗi 401 và chưa retry lần nào (gán ._retry)
    if (error.response && error.response.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/auth/refresh')) {
        //Tạo flag để tránh lặp vô hạn
        originalRequest._retry = true;
        try {
            // Gọi API làm mới token
            const res = await api.post("/auth/refresh");
            console.log("Refresh token response:", res);
            accessToken = res.data.accessToken;
            //Hàm api(originalRequest) được gọi. Request ban đầu được gửi lại, 
            // nhưng lần này nó sẽ đi qua api.interceptors.request.use lần nữa 
            // và sử dụng Access Token mới vừa được cập nhật.
            return api(originalRequest);
        } catch (e) {
            console.error("Refresh token failed:", e);
            accessToken = null;          
            return Promise.reject(error); //QUAN TRỌNG, Khi Interceptor ném lỗi, 
            // Axios sẽ coi yêu cầu API ban đầu (api.get('/user')) là thất bại.
        }
    }

})


export function setAccessToken(token) {
    accessToken = token;
}

export default api;
