import Translates from '../interface';

const data: Translates = {
    product: {
        amout: 'Количество товаров',
        foundProductAmount: 'Найдено $1 продукт',
        foundProductsAmount: 'Найдено $1 продуктов',
        status: {
            available: 'Есть в наличии',
            outOfStock: 'Нет на складе',
        },
        allAbout: 'Всё про товар',
        characteristics: 'Характеристики',
        description: 'Описание',
    },
    subscriptions: {
        notifyWhenProductIsAvailable: 'Уведомить когда продукт будет в наличии',
        emailAlreadySubscribedOnProduct: 'Этот e-mail уже подписан на этот продукт',
        productStatusSubscriptionsSuccess: 'Мы уведомим Вас когда продукт будет в наличии',
        productStatusSubscribed: 'Вы уже подписаны',
    },
    dashboard: {
        history: 'История',
    },
    cart: {
        cart: 'Корзина',
        emptyCart: 'Пустая корзина',
        summaryProductAmount: 'Количество товаров',
        summaryPrice: 'Сумма',
        unvailableItems: 'Недоступные товары',
        addToCart: 'Добавить в корзину',
        goToCart: 'Перейти в корзину',
    },
    order: {
        myOrders: 'Мои заказы',
    },
    wishList: {
        wishlist: 'Список желаний',
        wishlists: 'Списки желаний',
        emptyList: 'Пустой список',
        myList: 'Мой список',
        addedToList: 'Добавлено в',
        createNewList: 'Создать новый список желаний',
        makeListAsDefault: 'Сделать списком по умолчанию',
        newListName: 'Имя нового списка',
        editWishlist: 'Редактировать список',
        buyAllItems: 'Купить все товары',
        moveItemsToAnotherList: 'Переместить в другой список желаний',
        sharedList: 'Общий список',
    },
    share: {
        share: 'Поделиться',
        shareDescription: 'Каждый, кто получит эту ссылку, может видеть содержимое',
        linkCopied: 'Ссылка скорпирована в Ваш буфер обмена',
    },
    common: {
        default: 'По умолчанию',
        showMore: 'Показать больше',
        create: 'Создать',
        cancel: 'Отмена',
        link: 'Ссылка',
        remove: 'Удалить',
        rename: 'Переименовать',
        edit: 'Редактировать',
        save: 'Сохранить',
        change: 'Сменить',
        previous: 'Предыдущая',
        next: 'Следующая',
        move: 'Переместить',
    },
    form: {
        weGotYourRequest: 'Мы получили Вашу заявку',
    },
    errors: {
        notEmpty: 'Поле не может быть пустым',
        textMinLength: 'Текст слишком мал (минимум $1 символ)',
        textMaxLength: 'Текст слишком большой (максимум $1 символов)',
        invalidEmail: 'Неверный формат почты',
    },
    sort: {
        byDate: 'За датою добавления',
        byPriceUp: 'От дешевых к дорогим',
        byPriceDown: 'От дорогих к дешевым',
        byRating: 'За рейтингом',
        byPopular: 'Популярные',
        byNewest: 'Новинки',
    },
    profile: {
        personalData: 'Персональные данные',
        yourEmail: 'Ваша електронная почта',
    },
    history: {
        visitedProducts: 'Посещенные товары',
        clearHistory: 'Очистить историю',
        emptyProductList: 'Вы еще не просматривали и одного продукта',
    },
};

export default data;
