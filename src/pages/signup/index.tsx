import { AuthForm } from "./ui/AuthForm";

export default function Signup() {
  return (
    <>
      <main className="wrap-break-word">
        <header>Logo</header>
        <section className="w-full flex justify-center">
          <div className="w-81 pt-0 pb-0 pl-8 pr-8 box-content">
            <AuthForm />
          </div>
        </section>
      </main>
    </>
  );
}
