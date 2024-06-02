

function DetailedPage(props) {
    return (
        <div>
            <h1>{props.post.title}</h1>
            <p>{props.post.description}</p>
        </div>
    );
} 

export default DetailedPage;