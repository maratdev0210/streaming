import {
  CreateEmail,
  AlternativeAuth,
  CreatePassword,
  CreateName,
  CompleteRegistration,
} from "../../../features/Auth";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../entities/auth/model/authSlice";
import { Link } from "react-router";

export function AuthForm() {
  const { isEmailStepDone, isPasswordStepDone, isNameStepDone } =
    useSelector(selectAuth);

  return (
    <>
      {!isEmailStepDone && (
        <>
          <header className="text-center w-81 text-[3rem] text-balance font-extrabold text-white">
            <h1>Create an Account and explore full listening experience</h1>
          </header>
          <CreateEmail />
          <div className="mt-4">
            <AlternativeAuth />
            <div className="mt-16 flex flex-col justify-center items-center">
              <p className="text-subdued text-[1rem]">
                Already have an account?
              </p>
              <Link to="../login">
                <a className="cursor-pointer text-white inline-flex h-12 items-center justify-center relative pl-8 pr-8 pt-2 pb-2 font-bold">
                  Sign in
                </a>
              </Link>
            </div>
          </div>
        </>
      )}
      {isEmailStepDone && !isPasswordStepDone && <CreatePassword />}
      {isPasswordStepDone && !isNameStepDone && <CreateName />}
      {isNameStepDone && <CompleteRegistration />}
    </>
  );
}
