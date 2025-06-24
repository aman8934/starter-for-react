import config from "./Config";
 import {Client,Account,Databases,Storage,Query,ID} from 'appwrite'
 export class Service{
    client =new Client()
    database;
    bucket;
    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
            this.account = new Account(this.client);
            this.database =new Databases(this.client);
            this.bucket=new Storage(this.client)
    }
    async creatPost({title, slug , content , FeaturedImages, status , userId}){
        try {
            return await this.database.createDocument(
                config.appwritedatabaseId,
                config.appwritecollectionId,
                slug,
                {
                    title,
                    content,
                  FeaturedImages,
                    status,
                    userId
                    
                }
            )
        } catch (error) {
            console.log('Bete tere se na ho payega',error)
        }
    }
    async updatePost(slug,{title , content , FeaturedImages, status}){
        try {
            return await this.database.updateDocument(
                config.appwritedatabaseId,
                config.appwritecollectionId,
                slug,
                {
                    title,
                    content,
                  FeaturedImages,
                    status
                }
            )
        } catch (error) {
            console.log("kuchh nhi ho skta tera",error)
        }
    }
    async deletePost(slug){
        try {
            await this.database.deleteDocument(
                config.appwritedatabaseId,
                config.appwritecollectionId,
                slug,
              
            )
            return true;
        } catch (error) {
            console.log("tu kuwara hi rhega sale",error)
            return false;
        }
    }
    async getPost(slug){
        try {
            return await this.database.getDocument(
                config.appwritedatabaseId,
                config.appwritecollectionId,
                slug
            )
        } catch (error) {
            console.log("chalta h",error)
        }
    }
    async getPosts(queries = [Query.equal('status','active')]){
       
        // until you did indexes in database for status
       try{
        return await this.database.listDocuments(
            config.appwritedatabaseId,
            config.appwritecollectionId,
            queries
        )
    } catch (error) {
        console.log("kuchh nahi mil raha",error)
        return false
    }

     }

    //  File creation
    // async createFile(file){
    //     try {
    //         return await this.bucket.createFile(
    //             config.appwritebucketId,
    //             ID.unique(),
    //             file
    //         )
    //     } catch (error) {
    //         console.log("File creation error:", error)
    //     }
    // }
     async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwritebucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwritebucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("File deletion error:", error)
            return false;
        }
    }
    async getFilePreview(fileId){
        try {
            return  this.bucket.getFilePreview(
                config.appwritebucketId,
                fileId
            )
        } catch (error) {
            console.log("File preview error:", error)
        }
    }
}

const appwriteService = new Service();
export default appwriteService;