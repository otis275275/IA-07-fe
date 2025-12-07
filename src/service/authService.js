import api, {setAccessToken} from "./api";
import {useQueryClient, useQuery, useMutation} from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';


// file: getErrorMessage.js (Khắc phục lỗi TypeError)

export const getErrorMessage = (error) => {
    // Cấp độ 1: Kiểm tra lỗi mạng/lỗi không xác định
    if (!error || !error.response) { 
        // Lỗi này xảy ra nếu trình duyệt không nhận được phản hồi (vd: lỗi CORS, lỗi mạng)
        return "Lỗi không xác định hoặc sai thông tin";
    }

    // Cấp độ 2: Lấy dữ liệu phản hồi (resData) một cách an toàn
    const resData = error.response.data;
    
    // Cấp độ 3: Ưu tiên lấy message từ Backend (message: "Email hoặc mật khẩu không chính xác")
    if (resData && resData.message) {
        return resData.message;
    }

    // Cấp độ 4: Dựa vào status code nếu không có message
    switch (error.response.status) {
        case 401:
            // Nếu lỗi 401, nhưng không có body message (resData.message)
            return "Email hoặc mật khẩu không chính xác."; 
        case 400:
            return "Yêu cầu không hợp lệ. Vui lòng kiểm tra dữ liệu đầu vào.";
        default:
            return `Lỗi Server (${error.response.status}).`;
    }
};
export function useLogin(navigate) {
    const queryClient = useQueryClient();
    return useMutation({
        //Gọi API đăng nhập, thiết lập access token
        mutationFn: async (data) => {
            const res = await api.post("/auth/login", data);
            //Lưu access token vào api.js

            //Đoạn này sẽ không được thực thi nếu có lỗi -> sangg onError
            console.log('Res:', res); 
            setAccessToken(res.data.accessToken);
        },
        onSuccess: () => {
            //Sau khi đăng nhập thành công, làm mới dữ liệu user
            queryClient.invalidateQueries({ queryKey: ['user'] });
            navigate('/home/content');
        },
        onError: (error) => {
            // Đây là nơi bạn có thể log lỗi nếu cần
            throw error;
        }
    })

}

export function useLogout() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            await api.post("/auth/logout");
            setAccessToken(null);
        },
        onSuccess: () => {
            //Sau khi đăng xuất thành công, làm mới dữ liệu user
            queryClient.setQueryData(["user"], null);
        }
    });
}

export function useRegister(navigate) {
    return useMutation({
        mutationFn: async (data) => {
            await api.post("/auth/register", data);
        },
        onSuccess: () => {
            alert("Đăng ký thành công! Hãy đăng nhập."); 
            navigate('/login'); 
        },
        
        onError: (error) => {
            // Hiển thị lỗi cụ thể từ server 
            // error.response.data.message là thông báo lỗi từ backend của bạn
            
        }
    });
}