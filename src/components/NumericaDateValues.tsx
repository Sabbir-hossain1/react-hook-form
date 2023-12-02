import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  age: number;
  dob: Date;
};

const onSubmit = (data: FormValues) => {
  console.log("data :", data);
};

const NumericaDateValues = () => {
  const { register, control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      age: 0,
      dob: new Date(),
    },
  });
  return (
    <div className="flex justify-center items-center">
      <DevTool control={control} placement="top-right" />
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
              valueAsDate:true
            })}
          />
        </div>

        <button className="rounded m-1 py-1 px-7 bg-blue-400 text-white font-semibold">Submit</button>
      </form>
    </div>
  );
};

export default NumericaDateValues;
