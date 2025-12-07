import { useNavigate, Link, useLocation } from 'react-router-dom';
import { getErrorMessage, useLogin, useLogout } from '../service/authService.js';
import { useForm} from 'react-hook-form';
export default function Login() {
    const navigate = useNavigate();
    const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const login = useLogin(navigate);
    const { register, handleSubmit, formState } = useForm();
    const { errors } = formState;

    const backendErrorMessage = login.isError ? getErrorMessage(login.error) : null;
    const successMessage = login.isSuccess ? 'Đăng nhập tài khoản thành công! Đang chuyển hướng sang Home' : null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 font-sans">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-6">
                <h2 className="text-white text-3xl font-bold mb-1">Đăng nhập</h2>
                <p className="text-white/70 mb-6">Chào mừng trở lại.</p>

                {/* Success Message from Register or Login Success */}
                {(successMessage) && (
                    <div className="mb-4 text-sm text-green-300 bg-green-900/30 p-3 rounded-lg border border-green-700/50">
                        {successMessage || successMessageFromRegister}
                    </div>
                )}
                
                {/* Lỗi form chung từ Backend/API */}
                {backendErrorMessage && (
                    <div className="mb-4 text-sm text-red-300 bg-red-900/20 p-3 rounded-lg border border-red-700/50">{backendErrorMessage}</div>
                )}

                <form onSubmit={handleSubmit(data => login.mutate(data))}>
                    <label className="block mb-3">
                        <span className="text-sm text-white/80 font-medium">Email</span>
                        <input
                            type="email"
                            name="email"
                            {...register("email", { 
                                    required: "Email là bắt buộc.", 
                                    pattern: {
                                        value: EMAIL_REGEX,
                                        message: "Định dạng email không hợp lệ.",
                                    }
                            })}             
                            className={`mt-2 w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition ${
                                errors.email ? 'ring-2 ring-red-400/60' : ''
                            }`}
                                                      
                        />
                        {errors.email?.message && <p className="mt-1 text-xs text-red-300">{errors.email.message}</p>}
                    </label>

                    <label className="block mb-4 relative">
                        <span className="text-sm text-white/80 font-medium">Mật khẩu</span>
                        <div className="mt-2 relative">
                            <input
                                name="password"
                                type='password'
                                {...register("password", { 
                                    required: "Password là bắt buộc.", 
                                    minLength: {
                                        value: 6,
                                        message: "Mật khẩu phải dài tối thiểu 6 ký tự.",
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: "Mật khẩu chỉ dài tối đa 10 ký tự.",
                                    }
                                })}                                 
                                className={`w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition ${
                                    errors.password ? 'ring-2 ring-red-400/60' : ''
                                }`}
                                placeholder="••••••••"
                            />
                            {errors.password?.message && <p className="mt-1 text-xs text-red-300">{errors.password.message}</p>}


                            <button
                                type="button"
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition p-1"
                                
                            >
                            </button>
                        </div>
                    </label>

                    <button
                        type="submit"
                        className="w-full py-3 mt-4 rounded-lg bg-sky-500 hover:bg-sky-600 active:scale-[0.99] transition text-white font-semibold shadow-lg shadow-sky-500/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        disabled={login.isPending} // Dùng isPending từ useMutation
                    >
                        {login.isPending && (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {login.isPending ? 'Đang xử lý...' : 'Đăng nhập'}
                    </button>
                </form>
                
                <div className="mt-6 text-sm text-white/70 text-center">
                    Bạn chưa có tài khoản? <Link to="/register" className="text-sky-300 hover:underline font-medium">Đăng ký</Link>
                </div>
            </div>
        </div>
    );
}