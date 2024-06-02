// app/list/[postId]/page.js
import { connectToDatabase } from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

async function getPostById(postId) {
  const { db } = await connectToDatabase();
  const post = await db.collection('Posts').findOne({ _id: new ObjectId(postId) });
  return post;
}

export default async function DetailedPage({ params }) {
  const { postId } = params;
  const post = await getPostById(postId);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
      {/* 여기에 추가적인 게시글 정보를 렌더링할 수 있습니다. */}
    </div>
  );
}