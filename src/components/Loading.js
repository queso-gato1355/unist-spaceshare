export default function Loading() {
    return (
        <div className="bg-[#03AED2] flex flex-row items-center justify-center h-screen">
            <span className="text-white text-2xl font-bold cursor-pointer transition-all">
                SpaceShare
            </span>
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    );
}
