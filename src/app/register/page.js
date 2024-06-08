import RegisterBox from "@/components/registerBox";

export default function Register() {
    return (
        <div className="container mx-auto p-4 flex justify-center items-center">
            <div className="text-center max-w-[700px] p-6 pr-20 pl-20">
                <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
                <RegisterBox />
            </div>
        </div>
    );
}
