
import React from "react";
import HomeLink from "@/components/HomeLink";

const Privacy = () => (
  <main className="bg-gradient-to-tr from-blue-50 to-indigo-100 min-h-screen flex flex-col items-center justify-center px-4 py-12">
    <section className="max-w-2xl w-full bg-white/90 rounded-xl shadow-2xl px-6 py-8 animate-scale-in">
      <div className="flex items-center mb-3">
        <HomeLink />
        <h1 className="text-3xl sm:text-4xl font-bold text-primary text-center flex-1">
          Chính sách bảo mật
        </h1>
      </div>
      <p className="text-base sm:text-lg text-muted-foreground mb-2">
        Chúng tôi cam kết bảo mật thông tin cá nhân của bạn:
      </p>
      <ul className="list-disc ml-6 text-muted-foreground mb-2">
        <li>Không lưu trữ lâu dài bất cứ file/phụ đề nào bạn tải lên.</li>
        <li>Không chia sẻ dữ liệu cá nhân của bạn cho bên thứ ba.</li>
        <li>Dữ liệu chỉ dùng cho mục đích cải thiện trải nghiệm và bảo vệ quyền lợi người dùng.</li>
      </ul>
      <p className="text-sm text-muted-foreground mb-1">Nếu có ý kiến liên quan đến bảo mật, vui lòng liên hệ: <a href="mailto:support@lovable.app" className="underline">support@lovable.app</a></p>
      <p className="text-sm text-muted-foreground">Cập nhật lần cuối: 06/2024</p>
    </section>
  </main>
);

export default Privacy;
