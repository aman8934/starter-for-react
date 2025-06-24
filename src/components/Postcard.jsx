import React from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../config/Appwrite/config_appwrite'
import { ID } from 'appwrite'
function Postcard({FeaturedImages,title,...post}) {
  console.log('post is #########',post);
  
  return (
    <Link to={`/post/${ID.unique()}`}>
    <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className="w-full justify-center mb-4">
            <img src={appwriteService.getFilePreview(FeaturedImages)} alt={post.title} />
        </div>
        <h2 className='text-xl font-bold'>{post.title}</h2>
    </div>
        
    </Link>
   
  )
}

export default Postcard