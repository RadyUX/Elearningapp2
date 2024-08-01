import Marquee from "react-fast-marquee"
import Image from "next/image"
const Banner = () =>{
  return(
    <Marquee>
      <div className="flex gap-32 items-center">
  <Image src="/html.png" width={110} height={110} alt="html" />
  <Image src="/css.png" width={110} height={110} alt="css" />
  <Image src="/js.png" width={110} height={110} alt="js" />
  <Image src="/vite.png" width={110} height={110} alt="vite" />
  <Image src="/node.png" width={110} height={110} alt="node" />
  <Image src="/redis.png" width={110} height={110} alt="redis" />
  <Image src="/zod.png" width={110} height={110} alt="zod" />
  <Image src="/prisma.png" width={110} height={110} alt="prisma" />
  <Image src="/ts.png" width={110} height={110} alt="typescript" />
  <Image src="/docker.png" width={110} height={110} alt="docker" />
  LETS LEARN !
  </div>
</Marquee>
  )
}

export default Banner