import RegisterForm from "@/components/auth/RegisterForm";


export const metadata = {
  title: "StudyNook – Register",
  description: "Create an account to list and book study rooms.",
};


const RegisterPage = () => {
    return (
         <div className="min-h-screen flex items-center justify-center">

            <RegisterForm></RegisterForm>

        </div>
    );
};

export default RegisterPage;