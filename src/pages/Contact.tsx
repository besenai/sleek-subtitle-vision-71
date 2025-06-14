
import React from "react";
import HomeLink from "@/components/HomeLink";

const Contact = () => (
  <main className="bg-gradient-to-tr from-blue-50 to-indigo-100 min-h-screen flex flex-col items-center justify-center px-4 py-12">
    <section className="max-w-2xl w-full bg-white/90 rounded-xl shadow-2xl px-6 py-8 animate-scale-in">
      <div className="flex items-center mb-3">
        <HomeLink />
        <h1 className="text-3xl sm:text-4xl font-bold text-primary text-center flex-1">
          Liên hệ
        </h1>
      </div>
      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-2">
        Nếu bạn có câu hỏi, góp ý hoặc muốn hợp tác, hãy liên hệ với chúng tôi:
      </p>
      <ul className="mb-2">
        <li>
          Email: <a href="mailto:support@lovable.app" className="underline text-primary">support@lovable.app</a>
        </li>
        <li>
          Facebook: <a href="https://facebook.com/lovableapp" target="_blank" className="underline text-primary">fb.com/lovableapp</a>
        </li>
      </ul>
      <p className="text-sm text-muted-foreground">Chúng tôi sẽ phản hồi trong vòng 24h!</p>
    </section>
  </main>
);

export default Contact;
