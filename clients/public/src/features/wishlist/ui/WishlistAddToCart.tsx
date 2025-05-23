'use client';

import { FC } from 'react';

import useAddWishlistItemsToCart from '../lib/useAddWishlistItemsToCart';
import { WishlistModel } from '@entities/wishlist/model/interfaces';
import { useI18n } from '@shared/lib/i18n_client';
import { Button } from '@primitives/ui/button';

interface Props {
    wishlist: WishlistModel
}

const WishlistAddToCart: FC<Props> = ({ wishlist }) => {
    const { dictionary } = useI18n();
    const { addWishlistItemsToCart, isDisableToAdd, isLoading } = useAddWishlistItemsToCart(wishlist);

    return (
        <Button
            onClick={addWishlistItemsToCart}
            disabled={isDisableToAdd}
            isLoading={isLoading}
        >
            {dictionary?.wishList.buyAllItems}
        </Button>
    );
};

export default WishlistAddToCart;
