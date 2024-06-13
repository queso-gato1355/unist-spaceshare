'use client';

import React from "react";
import { useState, useEffect } from "react";
import Post from "@/components/posts/Post";
import FilterPage from "../filter";

export default function PostList() {
    const [posts, setPosts] = useState([]);
    // const [intervalId, setIntervalId] = useState(null);
    const [dFilter, setFilter] = useState(()=>()=>true);

    const createFilterFunction = (filterParam) => (post) => {
        return post
            && (post.occupation === 'Seller') === filterParam.forBuyer
            && (filterParam.location === "" || post.location.includes(filterParam.location))
            && (filterParam.boxPrices[0] <= 0 || (filterParam.forBuyer && post.price[0] <= filterParam.boxPrices[0]) || (!filterParam.forBuyer && post.price[0] >= filterParam.boxPrices[0]))
            && (filterParam.boxPrices[1] <= 0 || (filterParam.forBuyer && post.price[1] <= filterParam.boxPrices[1]) || (!filterParam.forBuyer && post.price[1] >= filterParam.boxPrices[1]))
            && (filterParam.boxPrices[2] <= 0 || (filterParam.forBuyer && post.price[2] <= filterParam.boxPrices[2]) || (!filterParam.forBuyer && post.price[2] >= filterParam.boxPrices[2]))
            && (filterParam.boxPrices[3] <= 0 || (filterParam.forBuyer && post.price[3] <= filterParam.boxPrices[3]) || (!filterParam.forBuyer && post.price[3] >= filterParam.boxPrices[3]));
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch("/api/shares");
            const data = await res.json();
            setPosts(data.posts ? data.posts.filter(dFilter) : []);
        };
        // console.log('dFilter has been updated:', dFilter);
        // your existing code...
    
        fetchPosts();
        const id = setInterval(fetchPosts, 10000);
        return () => clearInterval(id);
    }, [dFilter]);  // Include dFilter in the dependency array
    

    // useEffect(() => {
    //     console.log('dFilter has been updated:', dFilter);
    //     // your existing code...
    // }, [dFilter]);
    

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col w-full">
                <FilterPage
                    initFilter={()=>setFilter(()=>(()=>true))}
                    handleFilter={(filterParam)=>()=>{
                    setFilter(() => createFilterFunction(filterParam));
                    // console.log('dFilter set!');
                }}></FilterPage>
            </div>
            <div className="space-y-4">
                <span>{`total ${posts ? posts.length : 0} posts`}</span>
                {posts && posts.map((post) => <Post key={post._id} post={post} />)}
            </div>
        </div>
    );
}
/*
    {
        _id: new ObjectId('6662f9b928863a6a9a5218f9'),
        userId: new ObjectId('665e740a973af77e2014ee5b'),
        title: 'Title 1',
        location: 'Other',
        description: 'Description 1',
        postedTime: 1717080140,
        price: [ 'Price 1-1', 'Price 1-2', 'Price 1-3', 'Price 1-4' ],
        image: 'https://images.livspace-cdn.com/plain/https://d3gq2merok8n5r.cloudfront.net/abhinav/ond-1634120396-Obfdc/jfm-2024-1704560007-SGQ6F/living-room-1704796237-OxcYs/la-9-1710762201-Lwnli.jpg',
        occupation: 'Buyer',
        state: false
      }
*/
/*
    name: "filterParam",
    initialState: {
        forBuyer: true,
        location: "",
        boxNum: [0,0,0,0],
        boxPrices: [0,0,0,0],
    },
*/