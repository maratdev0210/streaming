import { createUserAccount } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  goBackToName,
  selectAuth,
  completeRegistration,
} from "../../../../entities/auth/model/authSlice";
import { PreviousIcon } from "../../../../shared/ui/PreviousIcon";
import { useNavigate } from "react-router";
import type { FormEvent } from "react";

export function CompleteRegistration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { password, email, name } = useSelector(selectAuth);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await createUserAccount({ password, email, name });
      dispatch(completeRegistration());
      localStorage.setItem("userId", result.userId);
      navigate("/");
    } catch {
      console.log("error");
    }
  };

  return (
    <form className="mt-8 w-81" onSubmit={onSubmit}>
      <div>
        <div className="-ml-14 -mr-14">
          <header className="w-full">
            <div className="bg-essential-subdued progress-auth-bar-wrapper">
              <div className="progress-auth-bar-third"></div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => dispatch(goBackToName())}
                type="button"
                className="p-4 box-border bg-transparent border-0 text-center cursor-pointer duration-150 text-subdued inline-flex items-center justify-center relative h-18 w-14"
              >
                <PreviousIcon />
              </button>
              <div className="pt-4 pb-4 ">
                <span className="block text-subdued mb-1 text-[1rem]">
                  Step 3 of 3
                </span>
                <span className="block font-bold text-white text-[1rem]">
                  Complete registration
                </span>
              </div>
            </div>
          </header>
        </div>
        <div className="w-full">
          <div className="w-full">
            <div className="border-0 p-0">
              <div>
                <label
                  htmlFor="confirm"
                  className="font-bold text-sm text-white"
                >
                  Confirm that you want to create an account
                </label>
              </div>
              <div>
                <input
                  className="text-[1rem] mt-1 w-full text-white border font-normal rounded-sm p-3 border-essential-subdued invalid:border-essential-negative"
                  type="checkbox"
                  name="confirm"
                  id="confirm"
                />
              </div>
            </div>
          </div>
        </div>
        <button
          className="mt-4 hover:scale-104 h-12 cursor-pointer flex justify-center items-center font-bold w-full rounded-full text-center bg-positive"
          type="submit"
        >
          <span className="text-[1rem] text-black">Create an Account</span>
        </button>
      </div>
    </form>
  );
}
