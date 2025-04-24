
import Image from 'next/image'
import  rocketseatIcon  from "@/assets/rocketseat-logo.svg"
import { ProfileButton } from './profile-button'
import { OrganizationSwitcher } from './organization-switcher'
import { Slash } from 'lucide-react'
import { Separator } from './ui/separator'
import { ThemeSwitcher } from './theme/theme-switcher'
import { ability } from '@/auth/auth'
const Header = async () => {

  const permissions = await ability()
  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between border-b pb-2">
    <div className="flex items-center gap-3">
      <Image
        src={rocketseatIcon}
        className="size-6 dark:invert"
        alt="Rocketseat"
      />
      
      <Slash className="size-3 -rotate-[24deg] text-border" />

      <OrganizationSwitcher />

      {permissions?.can('get', 'Project') && (<p>Projeto</p>)}
    </div>


    <div className="flex items-center gap-4">
      <ThemeSwitcher />
      <Separator orientation='vertical' className='h-5' />
      <ProfileButton />
    </div>
  </div>
  )
}

export { Header }
