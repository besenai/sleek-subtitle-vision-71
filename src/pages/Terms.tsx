
import React from "react";

const Terms = () => (
  <main className="bg-gradient-to-tr from-blue-50 to-indigo-100 min-h-screen flex flex-col items-center justify-center px-4 py-12">
    <section className="max-w-2xl w-full bg-white/90 rounded-xl shadow-2xl px-6 py-8 animate-scale-in">
      <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-3 text-center">Điều khoản sử dụng</h1>
      <p className="text-base sm:text-lg text-muted-foreground mb-2">
        Khi sử dụng SRT Subtitle Viewer, bạn đồng ý tuân thủ các điều khoản sau:
      </p>
      <ul className="list-disc ml-6 text-muted-foreground mb-2">
        <li>Chỉ dùng công cụ cho mục đích hợp pháp, không vi phạm bản quyền.</li>
        <li>Không khai thác dữ liệu với mục đích thương mại khi chưa được cho phép.</li>
        <li>Chúng tôi không chịu trách nhiệm với nội dung bạn tải lên.</li>
        <li>Chúng tôi có quyền cập nhật điều khoản bất cứ lúc nào mà không cần báo trước.</li>
      </ul>
      <p className="text-sm text-muted-foreground">Cập nhật lần cuối: 06/2024</p>
    </section>
  </main>
);

export default Terms;
