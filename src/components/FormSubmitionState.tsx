import { useForm, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  name: string;
  age: number;
  dob: Date;
  password: string;
  confirm_password: string;
};

const onSubmit = (data: FormValues) => {
  console.log("data :", data);
};

const FormSubmissionState = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful, isSubmitted, submitCount },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      age: 0,
      dob: new Date(),
      password: "",
      confirm_password: "",
    },
  });

  console.log("isSubmitSuccessful: ", isSubmitSuccessful);
  console.log("isSubmitted: ", isSubmitted);
  console.log("submitCount: ", submitCount);
  console.log("isSubmitting: ", isSubmitting);

  const handleSetValues = () => {
    setValue("age", 30, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("form errors: ", errors);
  };
  return (
    <div className="flex justify-center items-center">
      <DevTool control={control} placement="top-right" />
      <form className="w-[400px] shadow-md p-3" onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <h1 className="bg-rose-400 text-2xl p-1 m-1 rounded text-slate-700 mb-5">Form Submission State</h1>
        <input
          className="bg-slate-200 m-1 p-2 rounded focus:outline-none w-full"
          type="text"
          {...register("name", {
            required: {
              value: true,
              message: "Name is required",
            },
          })}
        />
        {/* age */}
        <div>
          <label htmlFor="username" className="block font-semibold uppercase text-slate-600 px-2 text-left">
            Age
          </label>
          <input
            className="bg-slate-200 m-1 p-2 rounded focus:outline-none w-full"
            type="number"
            {...register("age", {
              required: {
                value: true,
                message: "Age is required",
              },
              valueAsNumber: true,
              validate: (fieldValue) => {
                return fieldValue !== 0 || "Age can not be 0";
              },
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
                return watch("password") === fieldValue || "Password and confirm password does not match";
              },
            })}
          />
          <p className="text-red-400">{errors.confirm_password?.message}</p>
        </div>

        <button
          className="rounded m-1 py-1 px-7 bg-orange-400 text-white font-semibold"
          type="button"
          onClick={handleSetValues}
        >
          SetValues
        </button>
        <button disabled={!isDirty || isSubmitting} className="rounded m-1 py-1 px-7 bg-blue-400 text-white font-semibold">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormSubmissionState;
