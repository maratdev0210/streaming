import { GoogleIcon } from "../../../../shared/ui/GoogleIcon.ui";
import { AppleIcon } from "../../../../shared/ui/AppleIcon.ui";

export function AlternativeAuth() {
  return (
    <div className="mt-4">
      <div>
        <span className="pt-0 pb-0 pl-3 pr-3 block text-center box-border text-[1rem] text-white">
          or
        </span>
        <div className="mt-4  w-81 box-border *:cursor-pointer *:h-12 *:pl-8 *:pr-8 *:pt-2 *:pb-2 *:text-center">
          <button className="relative w-full rounded-full border border-essential-subdued flex justify-center items-center">
            <GoogleIcon />
            <span className="text-white text-[1rem] font-bold">
              Sign up with Google
            </span>
          </button>
          <button className="relative w-full mt-2 rounded-full border border-essential-subdued flex justify-center items-center">
            <AppleIcon />
            <span className="text-white text-[1rem] font-bold">
              Sign in with Apple
            </span>
          </button>
        </div>
      </div>
      <div className="mt-16 flex flex-col justify-center items-center">
        <p className="text-subdued text-[1rem]">Already have an account?</p>
        <a className="cursor-pointer text-white inline-flex h-12 items-center justify-center relative pl-8 pr-8 pt-2 pb-2 font-bold">
          Sign in
        </a>
      </div>
    </div>
  );
}
