import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  phNumbers: {
    number: string;
  }[];
};

const DynamicFields = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    // default value can be read from api and then set
    defaultValues: {
      phNumbers: [{ number: "" }],
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("form submitted", data);
  };

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  return (
    <div className="flex justify-center items-center">
      <DevTool control={control} placement="top-right" />
      <form className="w-[400px] shadow-md p-3" onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Dynamic fileds */}
        <div>
          <label htmlFor="phNumbers" className="block font-semibold uppercase text-slate-600 p-2 text-left">
            Phone number List{" "}
          </label>

          <div>
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="flex">
                  <input
                    className="bg-slate-200 m-1 p-2 rounded focus:outline-none w-full"
                    type="text"
                    {...register(`phNumbers.${index}.number` as const)}
                  />
                  {index > 0 && (
                    <button
                      className="rounded m-1  px-2 bg-red-500 text-white font-semibold text-xl"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      X
                    </button>
                  )}
                </div>
              );
            })}

            <button
              className="flex rounded m-1 px-3 bg-green-400 text-white font-semibold text-xl"
              type="button"
              onClick={() => append({ number: "" })}
            >
              +
            </button>
          </div>
        </div>

        <button className="rounded m-1 py-1 px-7 bg-blue-400 text-white font-semibold">Submit</button>
      </form>
    </div>
  );
};

export default DynamicFields;
