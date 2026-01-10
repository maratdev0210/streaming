import {
  CreateEmail,
  AlternativeAuth,
  CreatePassword,
  CreateName,
} from "../../../features/Auth";
import { useSelector } from "react-redux";
import { selectAuth } from "../../../entities/auth/model/authSlice";

export function AuthForm() {
  const { isEmailStepDone, isPasswordStepDone } = useSelector(selectAuth);

  return (
    <>
      {!isEmailStepDone && (
        <>
          <header className="text-center w-81 text-[3rem] text-balance font-extrabold text-white">
            <h1>Create an Account and explore full listening experience</h1>
          </header>
          <CreateEmail />
          <AlternativeAuth />
        </>
      )}
      {isEmailStepDone && !isPasswordStepDone && <CreatePassword />}
      {isPasswordStepDone && <CreateName />}
    </>
  );
}
