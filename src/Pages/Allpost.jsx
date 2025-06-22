import React from 'react'
import appwriteService from '../config/Appwrite/config_appwrite'
import { Postcard, Container} from '../components'
function Allpost() {
    const [posts, setPosts] = React.useState([]);
    useEffect(() => { 
         appwriteService.getPosts([]).then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }
})}, []);
   
  return (
    <div className='w-full py-8'>
        <Container> 
        
            <div className="flex flex-wrap">
                 {posts.map((post) => (
                    <div key={post.$id} className="p-2 w-1">
                        <Postcard  post={post} />
                    </div>
                ))}
            </div>
           
        </Container>

    </div>
  )
}

export default Allpost