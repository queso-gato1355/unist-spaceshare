import ButtonLink from "@/components/buttons/ButtonLink";

export default function Home() {
    return (
        <div className="container mx-auto p-4">
            <div className="text-left items-center">
                <h1 className="text-4xl font-bold mb-4 text-center">Share your Space!</h1>
                <p className="mb-4">
                Many of the students who reside on the campus during semesters often deliver the items needed for staying in the dormitory from their home, and send it back at the beginning of the vacation if they choose to go home. It is highly cumbersome to move the items such a long distance, or to trash minor but necessary items and re-buy them. <br/>
                There is a service of the dormitory administration office’s solution about saving the luggages for some time, but the number of users and the available space is limited, there is no more service so that it has the problem of monopoly; the possibility of selling things more expensive than rational.
                <br/>
                <br/>
                To resolve this, we present web application, unist-spaceshare, as an alternative to the dormitory administration office’s solution.
                <br/>
                <br/>
                The Key Difference with the current solution are as follows:
                </p>

                <ol>
                    <li>1. Remove centralization of the supply of the service and prevent monopoly.</li>
                    <li>2. Increase price competition for the consumers. (Efficiency)</li>
                    <li>3. People who reside in the dormitory can make profits.</li>
                    <li>4. Give sufficient supply of the service. (Effectiveness)</li>
                </ol>
                <br/>
                <p> 
                    In the future, we could develop this into actual functional service in UNIST, or add more things like sharing currently un-using dormitory stuffs during vacations and getting money.
                </p>
                <br/>

                <div className="items-center">
                    <ButtonLink href="/list" className="justify-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 hover:font-bold transition-all">
                        Start Now!
                    </ButtonLink>
                </div>
            </div>
        </div>
    );
}
