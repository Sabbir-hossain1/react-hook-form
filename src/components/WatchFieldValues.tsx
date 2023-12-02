import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

type FormValues = {
  age: number;
  dob: Date;
};

const onSubmit = (data: FormValues) => {
  console.log("data :", data);
};

const WatchFieldValues = () => {
  const { register, control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      age: 0,
      dob: new Date(),
    },
  });
  //   const watchForm = watch(['singleField'])
  //   const watchForm = watch(['singleField','multiplefield'])

  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

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
            })}
          />
        </div>

        <button className="rounded m-1 py-1 px-7 bg-blue-400 text-white font-semibold">Submit</button>
      </form>
    </div>
  );
};

export default WatchFieldValues;
