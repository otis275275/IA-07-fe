import {useQueryClient, useQuery} from "@tanstack/react-query";
import api, {setAccessToken} from "./api";
export function useUser(options = {}) {
    //Tạo query để lấy thông tin user hiện tại
    return useQuery({
        //Tạo key để lưu trữ và truy xuất dữ liệu trong cache
        queryKey: ['user'],
        queryFn: async () => {
            const response = await api.get('/user');
            return response.data;
        },
        retry: false, //Không tự động retry khi lỗi
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        ...options
    });
}