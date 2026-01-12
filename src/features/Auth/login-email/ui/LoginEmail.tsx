import { checkEmailExists } from "../api/api";
import { useDispatch } from "react-redux";
import { setEmail } from "../../../../entities/login/model/loginSlice";
import { useState, type FormEvent } from "react";

export function LoginEmail() {
  const dispatch = useDispatch();
  const [emailValue, setEmailValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await checkEmailExists(emailValue);
    console.log(result);
    if (result.status === "fullfilled") {
      dispatch(setEmail(emailValue));
    } else {
      setError(result.message);
    }
  };

  return (
    <form className="mt-8 w-81" onSubmit={onSubmit}>
      <div className="w-full">
        <div className="w-full">
          <div className="border-0 p-0">
            <div>
              <label htmlFor="email" className="font-bold text-sm text-white">
                Email
              </label>
            </div>
          </div>
          <div>
            <input
              onChange={(e) => setEmailValue(e.target.value)}
              value={emailValue}
              type="email"
              id="email"
              placeholder="name@domain.com"
              autoComplete="email"
              className="text-[1rem] mt-1 w-full text-white border font-normal rounded-sm p-3 border-essential-subdued"
            />
          </div>
          <div className="mt-2 w-full">
            <span className="wrap-break-word w-81 text-text-negative text-sm">
              {error}
            </span>
          </div>
        </div>
      </div>
      <button
        className="mt-6 h-12 cursor-pointer flex justify-center items-center font-bold w-full rounded-full text-center bg-positive"
        type="submit"
      >
        <span className="text-[1rem] text-black">Next</span>
      </button>
    </form>
  );
}
