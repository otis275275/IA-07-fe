import { useState } from 'react'
import { RouterProvider, Routes, BrowserRouter, Route, Navigate, Router } from 'react-router-dom'
import Home from './Commponent/Home.jsx'
import Register from './Commponent/Register.jsx'
import Login from './Commponent/Login.jsx'
import Content from './Commponent/Content.jsx'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import { useInitializeAuth } from './service/useInitAuth.js';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false, 
        },
        mutations: {
            retry: false,
        }
    }
});

const AppRouter = () => {
    const isInitializing = useInitializeAuth(); 
    
    // Lưu ý: Nếu bạn vẫn muốn giữ độ trễ giả lập 500ms, bạn có thể kết hợp state
    // const [isAppReady, setIsAppReady] = useState(false);
    // const isLoading = isInitializing || !isAppReady; 
    
    // Ở đây, ta chỉ dùng logic khởi tạo token:
    if (isInitializing) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
                <svg className="animate-spin h-8 w-8 text-sky-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="ml-3">Loading...</span>
            </div>
        );
    }
    
    return (
        <BrowserRouter> 
            <Routes>
                {/* Cấu trúc routing lồng nhau */}
                <Route path='/' element={<Navigate to="/home/content" replace />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/home" element={<Home />}>
                        <Route path="content" element={<Content />} />
                        <Route index element={<Navigate to="content" replace />} />
                    </Route>
                </Route>

                {/* Các route độc lập */}
                <Route path='/register' element={<Register/>} />
                <Route path='/login' element={<Login/>} />
            </Routes>
        </BrowserRouter>
    );
};

// Component chính được export, đảm bảo QueryClientProvider là wrapper ngoài cùng
const App = () => (
    <QueryClientProvider client={queryClient}>
        <AppRouter />
    </QueryClientProvider>
);

export default App
