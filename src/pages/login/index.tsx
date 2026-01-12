import { LoginForm } from "./ui/LoginForm";

export default function Login() {
  return (
    <>
      <main className="wrap-break-word">
        <header>Logo</header>
        <section className="w-full items-center h-full flex justify-center">
          <div className="w-81 pt-0 pb-0 pl-8 pr-8 box-content">
            <LoginForm />
          </div>
        </section>
      </main>
    </>
  );
}
