// Ví dụ: Trong file authService.js
import { useState, useEffect } from 'react';
import api, { setAccessToken } from './api';


//Khi refresh trình duyệt, sẽ kiểm tra xem có refresh lưu trong cookie không,
//Có thì gọi API /auth/refresh để lấy access token mới để duy trì đăng nhập
export function useInitializeAuth() {
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            try {
                // 1. Cố gắng gọi API refresh. 
                // Axios sẽ tự động gửi Cookie Refresh Token (RT)
                const res = await api.post("/auth/refresh"); 
                
                // 2. Nếu thành công, lưu AT mới
                setAccessToken(res.data.accessToken); 
                
            } catch (error) {
                // Nếu refresh thất bại (ví dụ: RT hết hạn), xóa AT cũ
                setAccessToken(null); 
            } finally {
                // 3. Đánh dấu quá trình kiểm tra đã hoàn tất
                setIsChecking(false);
            }
        };
        
        // Chỉ chạy checkToken khi ứng dụng khởi động lần đầu (mount)
        checkToken();
    }, []);

    return isChecking; // Trả về true nếu đang kiểm tra, false nếu đã xong
}