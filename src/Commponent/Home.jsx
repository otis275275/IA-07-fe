// file: Home.jsx

import React from 'react';
import { useUser } from '../service/reactQuey';
import { Link, Outlet } from 'react-router-dom';
import { useLogout } from '../service/authService.js';


export default function Home() {
    // 1. Sử dụng hook để lấy trạng thái user
    const { data: user, isLoading } = useUser(); 

    
    // TẠM THỜI: Giả lập hàm logout
    const logoutMutation = useLogout(); 
    const handleLogout = () => logoutMutation.mutate(); 
    
    const isAuthenticated = !!user; // Kiểm tra user có tồn tại không
    const displayEmail = user.email || 'Guest';

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
            {/* Thanh điều hướng (Navbar) */}
            <header className="h-[72px] w-full bg-slate-800 shadow-xl flex items-center justify-between px-6 md:px-12 text-white">
                <h1 className="text-2xl font-extrabold text-sky-400 tracking-wider">
                    <span role="img" aria-label="shield">🛡️</span> Auth Demo
                </h1>
                
                {/* 2. LOGIC HIỂN THỊ DỰA TRÊN TRẠNG THÁI XÁC THỰC */}
                <div className="flex gap-4 items-center h-full py-3">
                    {isAuthenticated ? (
                        // ĐÃ ĐĂNG NHẬP: Hiển thị Email và Nút Logout
                        <>
                            <span className="text-white/80 text-lg font-medium">
                                Xin chào, {displayEmail}
                            </span>
                            <button 
                                onClick={handleLogout} // Gọi hàm logout
                                className="transition duration-200 ease-in-out px-5 py-2.5 
                                           bg-red-600 text-white font-medium rounded-xl 
                                           shadow-lg shadow-red-600/30 
                                           hover:bg-red-700 hover:shadow-red-600/50 
                                           transform hover:scale-[1.03] active:scale-[0.98]"
                            >
                                Đăng xuất
                            </button>
                        </>
                    ) : (
                        // CHƯA ĐĂNG NHẬP: Hiển thị Nút Đăng ký và Đăng nhập
                        <>
                            {/* Nút Register */}
                            <Link to="/register">
                                {/* ... code nút Đăng ký ... */}
                                <button className="...">Đăng ký</button>
                            </Link>
                            {/* Nút Login */}
                            <Link to="/login">
                                {/* ... code nút Đăng nhập ... */}
                                <button className="...">Đăng nhập</button>
                            </Link>
                        </>
                    )}
                </div>
            </header>
            
            {/* Outlet sẽ hiển thị nội dung của Content */}
            <main className="flex-grow">
                <Outlet />
            </main>
        </div>
    );
}