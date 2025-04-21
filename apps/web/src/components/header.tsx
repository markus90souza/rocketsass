
import Image from 'next/image'
import  rocketseatIcon  from "@/assets/rocketseat-logo.svg"
import { ProfileButton } from './profile-button'
const Header = () => {
  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between">
    <div className="flex items-center gap-3">
      <Image
        src={rocketseatIcon}
        className="size-6 dark:invert"
        alt="Rocketseat"
      />
    </div>

    <div className="flex items-center gap-4">
      <ProfileButton />
    </div>
  </div>
  )
}

export { Header }
