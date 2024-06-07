import ButtonLink from "@/components/buttons/ButtonLink";
import LoginBox from "@/components/loginBox";

export default function Login() {
    return (
        <div className="container mx-auto p-4 flex justify-center items-center">
            <div className="text-center max-w-[500px] pt-20">
                <h1 className="text-4xl font-bold mb-4">Log In</h1>
                <LoginBox />
                <ButtonLink href="/register" className="text-blue-600 mt-5">
                    Register
                </ButtonLink>
            </div>
        </div>
    );
}
