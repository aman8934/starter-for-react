import React from 'react'
import {Editor } from '@tinymce/tinymce-react'
// Controller is used to control/access the form state in react-hook-form
// It allows you to register inputs and manage their state
import {Controller} from 'react-hook-form'


export default function RTE({name, control, label , defaultValue = ""}) {
  return (
    <div className="w-full">
        {label && <label className="inline-block mb-2 pl-1">{label}</label>}
         <Controller
              name={name || "content"} // name is the key for the form state
              control={control}
              defaultValue={defaultValue}
              render={({ field: { onChange} }) => (
                <Editor
            apiKey='inu1mgmbgzxs9yf3j8vmcxugm52fipi3n4329pdze5tgsgd5'
            initialValue={defaultValue}
            init={{
                initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
          )}
          />
    </div>
    // all control pass to other component
   

  )
}

