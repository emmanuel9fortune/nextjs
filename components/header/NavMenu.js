import { ClockIcon, CurrencyDollarIcon, QueueListIcon , UserIcon } from '@heroicons/react/24/outline'
import { classNames } from '../../utils/classNames'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { truncate } from '../../utils/string'
require('@solana/wallet-adapter-react-ui/styles.css')
 
const NavMenu = ({ connected, publicKey }) => {
    const menus = [
        {
            icon: ClockIcon,
            item: 'Dashboard',
            current: true,
        },
        {
            icon: UserIcon,
            item: 'About',
            current: false,
        },
        {
            icon: QueueListIcon,
            item: 'FAQs',
            current: false,
        },
    ]

    return (
        <nav className="flex flex-1 items-center justify-center">
            <ul className="flex flex-col space-y-10">
                {menus.map(({ icon, item, current, action }, i) => (
                    <NavMenuItem key={i} Icon={icon} item={item} current={current} action={action} />
                ))}
                <div className='walletbxbtn'>
                    <WalletMultiButton className='connectwalletbtn' />
                </div>
            </ul>
        </nav >
    )
}

const NavMenuItem = ({ Icon, item, current, action }) => {
    return (
        <li onClick={action} className={classNames('flex cursor-pointer space-x-3 transition-all', current ? 'text-[grey]' : 'text-[white]', 'font-semibold')}>
            <Icon className="h-6 w-6 " />
            <span>{item}</span>
        </li>
    )
}

export default NavMenu
