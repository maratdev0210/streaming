import { AuthForm } from "./ui/AuthForm";
import { Welcome } from "./ui/Welcome";

export default function Signup() {
  return (
    <>
      <main className="wrap-break-word">
        <header>Logo</header>
        <section className="w-full flex justify-center">
          <div className="w-81 pt-0 pb-0 pl-8 pr-8 box-content">
            <Welcome />
            <AuthForm />
          </div>
        </section>
      </main>
    </>
  );
}
