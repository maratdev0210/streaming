import { useDispatch, useSelector } from "react-redux";
import { useState, type FormEvent } from "react";
import { ShowPasswordIcon } from "../../../../shared/ui/ShowPasswordIcon";
import { HidePasswordIcon } from "../../../../shared/ui/HidePasswordIcon";
import {
  setLoginState,
  selectLogin,
} from "../../../../entities/login/model/loginSlice";
import { login } from "../api/api";

export function LoginPassword() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState<string>("");
  const [type, setType] = useState<"password" | "text">("password");
  const [error, setError] = useState<string>("");
  const { email } = useSelector(selectLogin);

  const togglePasswordVisibility = () => {
    setType(type == "password" ? "text" : "password");
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const result = await login(email, password);
      setError("");
      dispatch(setLoginState());
    } catch {
      setError("Email or password does not match!");
    }
  };

  return (
    <form className="mt-8 w-81" onSubmit={onSubmit}>
      <div className="w-full">
        <div className="w-full">
          <div className="border-0 p-0">
            <div>
              <label
                htmlFor="password"
                className="font-bold text-sm text-white"
              >
                Password
              </label>
            </div>
          </div>
          <div className="relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={type}
              name="password"
              id="password"
              className="text-[1rem] mt-1 w-full text-white border font-normal rounded-sm p-3 border-essential-subdued"
            />
            <div className="flex size-6 absolute right-3 top-1/2 text-subdued -translate-y-1/2">
              <button
                onClick={() => togglePasswordVisibility()}
                type="button"
                className="opacity-70 size-6 border-0 cursor-pointer text-center text-subdued"
              >
                {type === "text" ? <ShowPasswordIcon /> : <HidePasswordIcon />}
              </button>
            </div>
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
        <span className="text-[1rem] text-black">Sign In</span>
      </button>
    </form>
  );
}
