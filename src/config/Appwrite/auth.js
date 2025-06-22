import config from "./Config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
            this.account = new Account(this.client);
    }

    async creatAccount({email,password,name}){
        try {
            const userAccount=await this.account.create(ID.unique(), email,password,name )
            console.log("created");
            

           return userAccount;

        } catch (error) {
            throw error;
            
        }
    }
    // async Login({email,password}){
    //     try {
    //         return await this.account.createEmailPasswordSession(
    //             email,password
    //         );
    //     } catch (error) {

    //         throw error
    //     }
    // }
    async Login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("Error creating session:", error);
            
        }
    }
    
    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Get 404 Error in getting user");
            
        }
        return null;
    }
    async Logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log('Appwrite service : Logout Error');
            
        }
    }
}
const authService = new AuthService();
export default authService