import React, {useEffect, useState} from 'react'
import appwriteService from "../config/Appwrite/config_appwrite";
import {Postcard} from '../components'
import {Container} from '../components'
import { ID } from 'appwrite';

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
            else{
                console.log("post nhi h l**de");
                
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="w-full max-h-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex justify-center items-center ">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={ID.unique()} className='p-2 w-1/4'>
                            <Postcard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home