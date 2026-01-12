import { useSelector } from "react-redux";
import { selectLogin } from "../../../entities/login/model/loginSlice";
import { AlternativeAuth } from "../../../features/Auth";
import { Link } from "react-router";
import { LoginEmail } from "../../../features/Auth";
import { LoginPassword } from "../../../features/Auth";

export function LoginForm() {
  const { isEmailStepDone } = useSelector(selectLogin);

  return (
    <>
      {!isEmailStepDone && (
        <>
          <header className="text-center w-81 text-[3rem] text-balance font-extrabold text-white">
            <h1>Welcome Back!</h1>
          </header>
          <div className="mt-4">
            <LoginEmail />
            <AlternativeAuth />
            <div className="mt-16 flex flex-col justify-center items-center">
              <p className="text-subdued text-[1rem]">Don't have an account?</p>
              <Link to="../signup">
                <a className="cursor-pointer text-white inline-flex h-12 items-center justify-center relative pl-8 pr-8 pt-2 pb-2 font-bold">
                  Sign up
                </a>
              </Link>
            </div>
          </div>
        </>
      )}
      {isEmailStepDone && <LoginPassword />}
    </>
  );
}
