import { AnimatedTooltip } from "@/components/ui/animated-tooltip"
const socials = [
  {
    name: "Instagram",
    image: "https://link-hover-lndev.vercel.app/instagram.png",
    href: "https://www.tiktok.com/@consoli.barber",
  },
    
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@consoli.barber",
    image: "https://link-hover-lndev.vercel.app/tiktok.png",
  },
]
function Socials() {
  return (
          <AnimatedTooltip items={socials.map((s, i) => ({...s, id: i}))} />
   )
}

export default Socials