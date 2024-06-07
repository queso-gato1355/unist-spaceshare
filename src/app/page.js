import ButtonLink from "@/components/buttons/ButtonLink";

export default function Home() {
    return (
        <div className="container mx-auto p-4">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Share your Space!</h1>
                <p className="mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam cursus semper quam. Sed faucibus ante nec sollicitudin vehicula. Morbi viverra nisl at libero maximus maximus. Nam vel leo sodales, faucibus metus at, posuere neque. Donec vitae mattis lorem. Nullam a vestibulum sapien. Vivamus vitae orci elit. Etiam tempor leo sem, a facilisis ipsum lobortis et. Aliquam vel tincidunt elit. Fusce a aliquet arcu, at posuere justo. Aliquam sed diam leo. Proin sit amet dui in tortor bibendum elementum. Nam dapibus augue sit amet neque posuere aliquam. Etiam blandit molestie faucibus. Nam ut dui nec nisi tempor feugiat. Vivamus eu sagittis enim.
                </p>
                <div className="flex justify-center space-x-4 mb-4">
                    <div className="w-32 h-32 bg-gray-300"></div>
                    <div className="w-32 h-32 bg-gray-300"></div>
                    <div className="w-32 h-32 bg-gray-300"></div>
                </div>
                <h2 className="text-2xl font-bold mb-4">Some Titles</h2>
                <p className="mb-4">Some texts with Lorem Ipsum</p>
                <ButtonLink href="/list" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 hover:font-bold transition-all">
                    Start Now!
                </ButtonLink>
            </div>
        </div>
    );
}
