import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    facebook: string;
    twitter: string;
  },
  phoneNumber:string[];
};

const YoutubeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    // default value can be read from api and then set
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        facebook: "",
        twitter: "",
      },
      phoneNumber:["",""],
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("form submitted", data);
  };

  return (
    <div className="flex justify-center items-center">
      <DevTool control={control} placement="top-right" />
      <form className="w-[400px] shadow-md p-3" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="m-2">
          <label htmlFor="username" className="block font-semibold uppercase text-slate-600 p-2 text-left">
            UserName
          </label>
          <input
            className="bg-slate-200 m-1 p-2 rounded focus:outline-none w-full"
            type="text"
            id="username"
            {...register("username", { required: { value: true, message: "User name is required" } })}
          />
          <p className="text-red-500 text-left">{errors.username?.message}</p>
        </div>

        <div className="m-2">
          <label htmlFor="email" className="block font-semibold uppercase text-slate-600 p-2 text-left">
            Email
          </label>
          <input
            className="bg-slate-200 m-1 p-2 rounded focus:outline-none w-full"
            type="text"
            id="email"
            {...register("email", {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
              required: {
                value: true,
                message: "Email is required",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return fieldValue !== "admin@gmail.com" || "Enter a different email address";
                },
                blackDomain: (fieldValue) => {
                  return !fieldValue.endsWith("baddomain.com") || "This domain is not supported";
                },
              },
            })}
          />
          <p className="text-red-500 text-left">{errors.email?.message}</p>
        </div>

        {/* Channel */}
        <div className="m-2">
          <label htmlFor="channel" className="block font-semibold uppercase text-slate-600 p-2 text-left">
            Channel
          </label>
          <input
            className="bg-slate-200 m-1 p-2 rounded focus:outline-none w-full"
            type="text"
            id="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "channel is required",
              },
            })}
          />
          <p className="text-red-500 text-left">{errors.channel?.message}</p>
        </div>
        {/* Facebook */}
        <div className="m-2">
          <label htmlFor="facebook" className="block font-semibold uppercase text-slate-600 p-2 text-left">
            Facebook
          </label>
          <input
            className="bg-slate-200 m-1 p-2 rounded focus:outline-none w-full"
            type="text"
            id="facebook"
            {...register("social.facebook")}
          />
          <p className="text-red-500 text-left">{errors.channel?.message}</p>
        </div>

        {/* Twitter */}
        <div className="m-2">
          <label htmlFor="twitter" className="block font-semibold uppercase text-slate-600 p-2 text-left">
            Twitter
          </label>
          <input
            className="bg-slate-200 m-1 p-2 rounded focus:outline-none w-full"
            type="text"
            id="twitter"
            {...register("social.twitter")}
          />
        </div>

        {/* Phone number 1 */}
        <div className="m-2">
          <label htmlFor="phone-number-1" className="block font-semibold uppercase text-slate-600 p-2 text-left">
            Phone number 1
          </label>
          <input
            className="bg-slate-200 m-1 p-2 rounded focus:outline-none w-full"
            type="text"
            id="phone-number-1"
            {...register("phoneNumber.0")}
          />
        </div>

        {/* Phone number 2 */}
        <div className="m-2">
          <label htmlFor="phone-number-2" className="block font-semibold uppercase text-slate-600 p-2 text-left">
            Phone number 2
          </label>
          <input
            className="bg-slate-200 m-1 p-2 rounded focus:outline-none w-full"
            type="text"
            id="phone-number-2"
            {...register("phoneNumber.1")}
          />
        </div>

        <button className="rounded m-1 py-1 px-7 bg-blue-400 text-white font-semibold">Submit</button>
      </form>
    </div>
  );
};

export default YoutubeForm;
