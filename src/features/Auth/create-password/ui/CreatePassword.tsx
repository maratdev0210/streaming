import { PreviousIcon } from "../../../../shared/ui/PreviousIcon";
import { ShowPasswordIcon } from "../../../../shared/ui/ShowPasswordIcon";
import { HidePasswordIcon } from "../../../../shared/ui/HidePasswordIcon";
import { useState, type FormEvent } from "react";
import {
  setPasswordField,
  goBackToEmail,
} from "../../../../entities/auth/model/authSlice";
import { useDispatch } from "react-redux";
import {
  containsEnoughCharacters,
  containsOneDigitOrSpecialCharacter,
  containsOneLetter,
  isValidPassword,
} from "../model/model";
import { PasswordRequirements } from "./PasswordRequirements";

export function CreatePassword() {
  const [type, setType] = useState<"password" | "text">("password");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setType(type == "password" ? "text" : "password");
  };

  const onSubmit = (e:FormEvent) => {
    e.preventDefault();
    if (isValidPassword(password)) {
      dispatch(setPasswordField(password));
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-8 w-81">
      <div>
        <div className="-ml-14 -mr-14">
          <header className="w-full">
            <div className="bg-essential-subdued progress-auth-bar-wrapper">
              <div className="progress-auth-bar"></div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => dispatch(goBackToEmail())}
                type="button"
                className="p-4 box-border bg-transparent border-0 text-center cursor-pointer duration-150 text-subdued inline-flex items-center justify-center relative h-18 w-14"
              >
                <PreviousIcon />
              </button>
              <div className="pt-4 pb-4 ">
                <span className="block text-subdued mb-1 text-[1rem]">
                  Step 1 of 3
                </span>
                <span className="block font-bold text-white text-[1rem]">
                  Create password
                </span>
              </div>
            </div>
          </header>
        </div>
        <div className="w-81">
          <div className="mt-4 w-full">
            <section className="w-81">
              <div className="w-full flex flex-col">
                <div>
                  <div className="p-0">
                    <label
                      htmlFor="password"
                      className="font-bold text-white text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <div className="pt-2 w-full relative">
                    <div className="w-full relative">
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type={type}
                        id="password"
                        name="password"
                        className="pl-3 w-full pr-12 pt-3 pb-3 bg-background-base border text-white block border-essential-subdued rounded-sm h-12"
                      />
                      <div className="flex size-6 absolute right-3 top-1/2 text-subdued -translate-y-1/2">
                        <button
                          onClick={() => togglePasswordVisibility()}
                          type="button"
                          className="opacity-70 size-6 border-0 cursor-pointer text-center text-subdued"
                        >
                          {type === "text" ? (
                            <ShowPasswordIcon />
                          ) : (
                            <HidePasswordIcon />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="block font-bold text-white text-sm">
                        Password must contain at least:
                      </span>
                      <ul className="m-0 p-0">
                        <PasswordRequirements
                          label="1 letter"
                          testFunction={containsOneLetter}
                          password={password}
                        />
                        <PasswordRequirements
                          label="1 digit or special character (e.g., # ? ! &)"
                          testFunction={containsOneDigitOrSpecialCharacter}
                          password={password}
                        />
                        <PasswordRequirements
                          label="10 characters"
                          testFunction={containsEnoughCharacters}
                          password={password}
                        />
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <button
          className="mt-4 hover:scale-104 h-12 cursor-pointer flex justify-center items-center font-bold w-full rounded-full text-center bg-positive"
          type="submit"
        >
          <span className="text-[1rem] text-black">Next</span>
        </button>
      </div>
    </form>
  );
}
