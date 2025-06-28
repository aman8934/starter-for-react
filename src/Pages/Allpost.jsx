import React,{useEffect} from 'react'
import appwriteService from '../config/Appwrite/config_appwrite'
import { Postcard, Container} from '../components'
import { ID } from 'appwrite'
import { login } from '../Store/authslice';
function Allpost() {
    const [posts, setPosts] = React.useState([]);
    useEffect(() => { 
         appwriteService.getPosts([]).then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }
        console.log("posts is **********************$$$$$$$$", posts);

})}, []);
   
  return (
    <div className='w-full py-8'>
        <Container> 
        
            <div className="flex flex-wrap">
                 {posts.map((post) => (
                    
                    
                    <div key={ID.unique()} className="p-2 w-1">
                        <Postcard  key={{...post}}{...post} />
                    </div>
                ))}
            </div>
           
        </Container>

    </div>
  )
}

export default Allpost