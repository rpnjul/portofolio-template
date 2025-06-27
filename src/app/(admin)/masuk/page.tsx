import LoginForm from "@/components/common/LoginForm";

const LoginHome = () => {
    return (
        <div className="card login">
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}

export default LoginHome;