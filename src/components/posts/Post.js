import formatTime from "@/utils/unixToTime";
import { useRouter } from "next/navigation";

function Post({ post }) {
    const router = useRouter();

    // if it clicked, move to the detail page
    const handleClick = () => {
        router.push(`/list/${post._id}`);
    };

    // price는 json으로 되어있는데, small, medium, large, xl 중에 유효한 가격 중 가장 작은 가격을 가지고 오기.
    // 예: {small: "", medium: "100", large: "200", xl: "300"} => ["100", "200", "300"] => ["100"]
    const newPrice = Object.values(post.price)
        .filter((price) => price !== "")
        .sort((a, b) => a - b);

    return (
        <div
            onClick={handleClick}
            className="bg-white shadow-md hover:shadow-xl transition-all rounded-lg p-4 mb-4 relative max-w-[700px] flex flex-col md:flex-row cursor-pointer"
        >
            <div className="w-full md:w-1/3 mb-4 md:mb-0">
                {!post.image ? (
                    <div className="bg-gray-300 h-48 flex items-center justify-center">
                        <span className="text-gray-500">test image</span>
                    </div>
                ) : (
                    <img
                        className="h-48 w-full object-cover rounded"
                        src={post.image}
                        alt="Post"
                    />
                )}
            </div>
            <div className="w-full md:w-2/3 pl-0 md:pl-4 flex flex-col justify-between">
                <div className="text-left">
                    <h2 className="text-2xl font-bold">{post.title}</h2>
                    <div className="flex flex-row">
                        <p className="text-gray-500 mr-1">{post.location}</p>·
                        <p className="text-gray-500 ml-1">
                            {formatTime(post.postedTime)}
                        </p>
                    </div>
                    <p className="text-2xl font-bold">{newPrice[0]}</p>
                </div>
                <div className="flex justify-between items-center mt-4 md:mt-0">
                    <span>Hit 500</span>
                    <div className="flex items-center">
                        <span className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                            {post.occupation}
                        </span>
                        {post.state == true && (
                            <span className="bg-green-200 text-green-800 px-4 py-2 rounded">
                                Available
                            </span>
                        )}
                        {post.state == false && (
                            <span className="bg-red-200 text-red-800 px-4 py-2 rounded">
                                Closed
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
