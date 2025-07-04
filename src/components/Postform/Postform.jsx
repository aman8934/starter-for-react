import React,{useCallback} from 'react'
import { useForm } from 'react-hook-form'
import {Button , Input, Select,RTE} from '../index' 
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ID } from 'appwrite'
// too send the data to appwrite
import appwriteService from '../../config/Appwrite/config_appwrite'
function Postform({post}) {

    const {register,handleSubmit,control,watch,setValue,getValues} = useForm(
        {
            defaultValues: {
                title: post?.title || '',
                slug: post?.slug || '',
                content: post?.content || '',
                status: post?.status || 'active',
                
            }

        }


    )
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData)
    
   const submit = async (data) => {
        if (post) {
            // console.log("featured image is **********************$$$$$$$$", post);
            console.log("data is **********************$$$$$$$$", data.image);
            
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : console.log("No new image uploaded");

            if (file) {
                appwriteService.deleteFile();
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                FeaturedImages: file ? file.$id: undefined,
            });

            if (dbPost) {
                navigate(`/post/${post.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                console.log("data.image is **********************$$$$$$$$", data.image);

                data.FeaturedImages = fileId;
                console.log("userData is **********************$$$$$$$$",  userData.userData.$id);

                const dbPost = await appwriteService.creatPost({ userId: userData.userData.$id, ...data });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">aman
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.FeaturedImages)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default Postform