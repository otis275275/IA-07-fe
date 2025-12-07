// file: Content.jsx

import React from 'react';
// import { useUser } from '../service/authService'; // <-- Cần import
import { useLocation } from "react-router-dom"; // Giữ lại nếu cần lấy state khác
import { useUser } from '../service/reactQuey.js';
export default function Content() {
    // 1. Sử dụng hook để lấy trạng thái user
    const { data:user } = useUser(); 
    
    // TẠM THỜI: Giả lập user để test giao diện
    
    const email = user?.email || 'Guest';
    const description = user?.email ? 'Bạn đã đăng nhập thành công vào hệ thống.' : 'Bạn vui lòng đăng nhập để tiếp tục sử dụng trang web.';
    
    // ... code render ...
    return (
        <div className="h-[calc(100vh-72px)] flex flex-col justify-center items-center bg-gradient-to-br from-green-50 to-teal-100 p-8">
            <div className="max-w-3xl text-center p-10 bg-white rounded-3xl shadow-2xl transform transition-all duration-300 hover:shadow-3xl">
                {/* ... SVG icon ... */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">
                    Chào mừng, <span className="text-teal-600 block sm:inline">{email}!</span>
                </h1>
                <p className="text-xl text-gray-600 font-light mt-4">
                    {description}
                </p>
            </div>
        </div>
    );
}