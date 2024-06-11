import Image from "next/image";
import plusIcon from "/public/plusIcon.png";

export default function ProfileImageSelection({ onChange, value, placeholderImage }) {
    return (
        <div className="flex felx-row justify-center items-center relative">
            <img
                src={
                    value
                        ? URL.createObjectURL(value)
                        : placeholderImage
                }
                alt="Profile"
                className="w-20 h-20 rounded-full"
            />
            <input
                type="file"
                id="profilePictureInput"
                className="hidden"
                onChange={onChange}
            />
            <div
                onClick={() => {
                    document.getElementById("profilePictureInput").click();
                }}
                className="bg-blue-500 hover:bg-blue-400 fill-white top-14 ml-10 absolute transition-all border p-2 w-7 h-7 rounded-full z-10 cursor-pointer"
            >
                <Image width="40" height="40" src={plusIcon} alt="Add" className="z-20" />
            </div>
        </div>
    );
}
