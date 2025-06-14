
import React from "react";
import HomeLink from "@/components/HomeLink";

const About = () => (
  <main className="bg-gradient-to-tr from-blue-50 to-indigo-100 min-h-screen flex flex-col items-center justify-center px-4 py-12">
    <section className="max-w-2xl w-full bg-white/90 rounded-xl shadow-2xl px-6 py-8 animate-scale-in">
      <div className="flex items-center mb-3">
        <HomeLink />
        <h1 className="text-3xl sm:text-4xl font-bold text-primary text-center flex-1">
          Về chúng tôi
        </h1>
      </div>
      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-2">
        SRT Subtitle Viewer là công cụ giúp bạn xem, tìm kiếm, phân tích phụ đề SRT một cách nhanh chóng và thân thiện. Chúng tôi là đội ngũ yêu công nghệ và ngôn ngữ, mong muốn mang lại trải nghiệm học tập, giải trí và nghiên cứu hiệu quả cho cộng đồng yêu thích phụ đề và ngoại ngữ.
      </p>
      <p className="text-base sm:text-lg text-muted-foreground"> 
        Bản quyền © 2024 bởi Lovable.
      </p>
    </section>
  </main>
);

export default About;
