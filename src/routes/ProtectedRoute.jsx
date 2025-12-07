import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../service/reactQuey";

const ProtectedRoute = () => {
    const { data: user, isLoading, isError } = useUser();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
                <span className="ml-3">Đang kiểm tra đăng nhập...</span>
            </div>
        );
    }

    // Không có token hoặc /me trả lỗi
    if (isError || !user) {
        return <Navigate to="/login" replace />;
    }

    // Nếu hợp lệ → cho vào
    return <Outlet />;
};

export default ProtectedRoute;
