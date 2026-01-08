import { useDispatch } from "react-redux";
import { Name, type IName } from "../../../../entities/auth/model/model";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  goBackToPassword,
  setNameField,
} from "../../../../entities/auth/model/authSlice";
import { PreviousIcon } from "../../../../shared/ui/PreviousIcon";

export function CreateName() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(Name) });

  const onSubmit = (name: IName) => {
    dispatch(setNameField(name));
  };

  return (
    <form className="mt-8 w-81" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="-ml-14 -mr-14">
          <header className="w-full">
            <div className="bg-essential-subdued progress-auth-bar-wrapper">
              <div className="progress-auth-bar-second"></div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => dispatch(goBackToPassword())}
                type="button"
                className="p-4 box-border bg-transparent border-0 text-center cursor-pointer duration-150 text-subdued inline-flex items-center justify-center relative h-18 w-14"
              >
                <PreviousIcon />
              </button>
              <div className="pt-4 pb-4 ">
                <span className="block text-subdued mb-1 text-[1rem]">
                  Step 2 of 3
                </span>
                <span className="block font-bold text-white text-[1rem]">
                  Create Name
                </span>
              </div>
            </div>
          </header>
        </div>
        <div className="w-full">
          <div className="w-full">
            <div className="border-0 p-0">
              <div>
                <label htmlFor="name" className="font-bold text-sm text-white">
                  Name
                </label>
              </div>
              <div>
                <input
                  className="text-[1rem] mt-1 w-full text-white border font-normal rounded-sm p-3 border-essential-subdued invalid:border-essential-negative"
                  type="text"
                  id="name"
                  placeholder="John"
                  autoComplete="name"
                  {...register("name")}
                />
                <div className="mt-2 w-full">
                  <span className="wrap-break-word w-81 text-text-negative text-sm">
                    {errors.name?.message}
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
      </div>
    </form>
  );
}
