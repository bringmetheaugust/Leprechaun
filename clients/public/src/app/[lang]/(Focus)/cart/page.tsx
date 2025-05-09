import { Metadata } from 'next';

import { RouteProps } from '@shared/models/router';
import CartClient from './_page';
import { getDictionary } from '@shared/lib/i18n_server';

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
    const { cart } = await getDictionary((await params).lang);

    return {
        title: cart.cart,
    }
}

export default async function Cart({ params }: RouteProps) {
    const dictionary = await getDictionary((await params).lang);

    return (
        <section>
            <h1 className='mb-6'>{dictionary?.cart.cart}</h1>
            <CartClient />
        </section>
    );
}
