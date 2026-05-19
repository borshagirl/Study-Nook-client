import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "StudyNook-Login",
  description: "Login to your StudyNook account to book study rooms.",
};

const LoginPage = () => {

    return (
        <div className="min-h-screen flex items-center justify-center">

            <LoginForm/>

        </div>
    )

}

export default LoginPage;