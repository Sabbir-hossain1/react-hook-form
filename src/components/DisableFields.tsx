import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  age: number;
  dob: Date;
  password: string;
  confirm_password: string;
};

const onSubmit = (data: FormValues) => {
  console.log("data :", data);
};

const DisableFields = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      age: 0,
      dob: new Date(),
      password: "",
      confirm_password: "",
    },
  });

  const handleSetValues = () => {
    setValue("age", 30, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  return (
    <div className="flex justify-center items-center">
      <DevTool control={control} placement="top-right" />
      <div>{/* <h1>Watch Value: {JSON.stringify(watchForm)}</h1> */}</div>
      <form className="w-[400px] shadow-md p-3" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* age */}
        <div>
          <label htmlFor="username" className="block font-semibold uppercase text-slate-600 px-2 text-left">
            Age
          </label>
          <input
            className="bg-slate-200 m-1 p-2 rounded focus:outline-none w-full"
            type="number"
            {...register("age", {
              valueAsNumber: true,
            })}
          />
        </div>
        {/* password */}
        <div>
          <label htmlFor="password" className="block font-semibold uppercase text-slate-600 px-2 text-left">
            Password
          </label>
          <input
            className="bg-slate-200 m-1 p-2 rounded focus:outline-none w-full"
            type="password"
            {...register("password")}
          />
        </div>
        {/* Confirm Password */}
        <div>
          <label htmlFor="confirm password" className="block font-semibold uppercase text-slate-600 px-2 text-left">
            Confirm Password
          </label>
          <input
            className="bg-slate-200 m-1 p-2 rounded focus:outline-none w-full"
            type="password"
            {...register("confirm_password", {
              validate: (fieldValue) => {
                return (
                  watch("password") === watch("confirm_password") || "Password and confirm password does not match"
                );
              },
            })}
          />
          <p className="text-red-400">{errors.confirm_password?.message}</p>
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="dob" className="block font-semibold uppercase text-slate-600 px-2 text-left">
            Date of Birth
          </label>
          <input
            className="bg-slate-200 m-1 p-2 rounded focus:outline-none w-full"
            type="date"
            {...register("dob", {
              valueAsDate: true,
              disabled: watch("age") < 30,
            })}
          />
        </div>
        <button
          className="rounded m-1 py-1 px-7 bg-orange-400 text-white font-semibold"
          type="button"
          onClick={handleSetValues}
        >
          SetValues
        </button>
        <button className="rounded m-1 py-1 px-7 bg-blue-400 text-white font-semibold">Submit</button>
      </form>
    </div>
  );
};

export default DisableFields;
