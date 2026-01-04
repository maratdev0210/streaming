import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Email } from "../../../../entities/auth/model/model";
import type { IEmail } from "../../../../entities/auth/model/model";
import { checkEmailExists } from "../api/api";
import { useDispatch } from "react-redux";
import { setNextStep } from "../../../../entities/auth/model/authSlice";

export function CreateEmail() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Email),
    shouldUseNativeValidation: true,
  });

  const onSubmit = async (email: IEmail) => {
    const result = await checkEmailExists(email);
    if (result.status === "fullfilled") {
      dispatch(setNextStep(email));
    }
  };

  return (
    <form className="mt-8 w-81" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full">
        <div className="w-full">
          <div className="border-0 p-0">
            <div>
              <label htmlFor="email" className="font-bold text-sm text-white">
                Email
              </label>
            </div>
            <div>
              <input
                className="text-[1rem] mt-1 w-full text-white border font-normal rounded-sm p-3 border-essential-subdued invalid:border-essential-negative"
                type="email"
                id="email"
                placeholder="name@domain.com"
                autoComplete="email"
                {...register("email")}
              />
              <div className="mt-2 w-full">
                <span className="wrap-break-word w-81 text-text-negative text-sm">
                  {errors.email?.message}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="mt-4 h-12 cursor-pointer flex justify-center items-center font-bold w-full rounded-full text-center bg-positive"
        type="submit"
      >
        <span className="text-[1rem] text-black">Next</span>
      </button>
    </form>
  );
}
