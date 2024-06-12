// src/app/post/page.js
import PostSubmitBox from "@/components/posts/PostSubmitBox";

export default function PostPage() {

    const buildingOptions = [
        "Building 301",
        "Building 302",
        "Building 303",
        "Building 304",
        "Building 305",
        "Building 306",
        "Building 307",
        "Building 308",
        "Building 309",
    ];

    return (
        <div className="container mx-auto p-4 flex justify-center min-h-screen">
            <div className="flex flex-col items-center text-center max-w-[500px] mt-10">
                <PostSubmitBox buildingOptions={buildingOptions} />
            </div>
        </div>
    );
}
