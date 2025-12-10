import MainSwiper from "./components/swiper/MainSwiper";

export default function Home() {
  return (
    <div>
      <div className="relative">
        <MainSwiper />
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-1">
          <div className="max-w-[800px] h-full mx-auto flex flex-col justify-center gap-3 font-bold text-white ">
            <p className="text-[21px]">로고는</p>
            <div className="text-[40px] leading-tight">
              <p>오직 당신의</p>
              <p>브랜드 의미와 가치를 디자인합니다.</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="text-[#2e2e2e] font-bold text-center py-10">
          <p className="text-[30px]">PORTPOLIO</p>
          <p className="text-[15px]">
            검증된 실력! 감각적인 디자인 결과물로 증명합니다. 직접 보시고
            판단하셔도 좋습니다.
          </p>
          <div className="w-[100px] border-t border-black mx-auto mt-5"></div>
        </div>
      </div>
    </div>
  );
}
