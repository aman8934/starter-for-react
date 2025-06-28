import React ,{useState,useEffect}from 'react'
import { Link } from 'react-router-dom'
import appwriteService from '../config/Appwrite/config_appwrite'
import { ID } from 'appwrite'
function Postcard({$id,FeaturedImages,title,...post}) {
  console.log("FeaturedImages is ",  FeaturedImages);
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
   const loadImage = async () => {
      if (FeaturedImages) {
        const previewUrl = await appwriteService.getFilePreview(FeaturedImages)
        setImageUrl(previewUrl)
      }
    }
    loadImage()
  }, [FeaturedImages]);

  return (
    <Link to={`/post/${$id}`}>
    <div className='w-full bg-gray-100 rounded-xl p-4'>
        {imageUrl ? (
            <img src={imageUrl} alt={title} className="w-full h-auto rounded-lg" />
          ) : (
            <div className="w-full h-40 bg-gray-300 animate-pulse rounded-lg" />
          )}
        <h2 className='text-xl font-bold'>{post.title} </h2>
    </div>
        
    </Link>
   
  )
}

export default Postcard