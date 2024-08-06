import Marquee from "react-fast-marquee";
import Image from "next/image";

const Banner = () => {
  return (
    <Marquee className="w-full">
      <div className="flex gap-8 md:gap-32 items-center">
        <Image src="/html.png" width={110} height={110} alt="html" className="w-6 h-6 md:w-auto md:h-auto" />
        <Image src="/CSS.png" width={110} height={110} alt="css" className="w-6 h-6 md:w-auto md:h-auto" />
        <Image src="/js.png" width={110} height={110} alt="js" className="w-6 h-6 md:w-auto md:h-auto" />
        <Image src="/vite.png" width={110} height={110} alt="vite" className="w-6 h-6 md:w-auto md:h-auto" />
        <Image src="/node.png" width={110} height={110} alt="node" className="w-6 h-6 md:w-auto md:h-auto" />
        <Image src="/redis.png" width={110} height={110} alt="redis" className="w-6 h-6 md:w-auto md:h-auto" />
        <Image src="/zod.png" width={110} height={110} alt="zod" className="w-6 h-6 md:w-auto md:h-auto" />
        <Image src="/prisma.png" width={110} height={110} alt="prisma" className="w-6 h-6 md:w-auto md:h-auto" />
        <Image src="/ts.png" width={110} height={110} alt="typescript" className="w-6 h-6 md:w-auto md:h-auto" />
        <Image src="/docker.png" width={110} height={110} alt="docker" className="w-6 h-6 md:w-auto md:h-auto" />
        <span className="text-base md:text-lg">LETS LEARN!</span>
      </div>
    </Marquee>
  );
};

export default Banner;
