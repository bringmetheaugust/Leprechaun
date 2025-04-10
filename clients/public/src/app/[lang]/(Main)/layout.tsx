import { FC, PropsWithChildren } from 'react';
import { User } from 'lucide-react';

import WishListBadge from '@widgets/wishlist/ui/WishlistBadge';
import CartBadge from '@widgets/order/ui/CartBadge';
import { getCategoryListCached } from '@entities/category/api';
import LanguageSwitch from '@widgets/header/ui/LanguageSwitch';
import AppLink from '@shared/ui/AppLink';
import { APP_NAME } from '@shared/constants/content';

const MainLayout: FC<PropsWithChildren> = async ({ children }) => {
    const categories = await getCategoryListCached();

    return (
        <div className='w-[1200px] flex flex-col gap-4 my-4'>
            <header className='flex flex-col gap-2'>
                <div className='flex justify-between'>
                    <AppLink href='/'>{APP_NAME}</AppLink>
                    <input className='flex-grow' />
                    <nav>
                        <ul className='flex items-center gap-4'>
                            <li><LanguageSwitch /></li>
                            <li>
                                <AppLink href='/profile'>
                                    <User width='30' height='30' />
                                </AppLink>
                            </li>
                            <li><WishListBadge /></li>
                            <li><CartBadge /></li>
                        </ul>
                    </nav>
                </div>
                <div>
                    <ul className='flex gap-4'>
                        {categories.map(category => (
                            <li key={category.id}>
                                <AppLink href={`/${category.url}`}>{category.title}</AppLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </header>
            <main>{children}</main>
        </div>
    );
}

export default MainLayout;
