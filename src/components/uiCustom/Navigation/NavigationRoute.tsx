
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Link from "next/link";

export default function NavigationRoute({navigationRouteItem}:{navigationRouteItem:any}) {
  return (
  


        
      <Link href={navigationRouteItem.route} className='flex gap-4 items-center p-3 hover:bg-gray-100 rounded-lg' >
    

        {/* <FontAwesomeIcon  icon={navigationRouteItem.icon} width={24} height={24} /> */}
        <div>

        {navigationRouteItem.icon && <navigationRouteItem.icon/>}
        </div>
        <div className='text-[16px] text-center hidden md:block'>
        {navigationRouteItem.routeName}
        </div>

      </Link>

  )
}
