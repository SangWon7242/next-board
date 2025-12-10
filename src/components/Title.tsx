import Image from "next/image";

export default function Title({
  image,
  children,
}: {
  image: any;
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="h-[200px]">
        <Image
          src={image}
          alt="제목 이미지"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-1">
        <p className="flex h-full justify-center items-center text-[40px] font-bold text-white">
          {children}
        </p>
      </div>
    </div>
  );
}
