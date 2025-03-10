import { DashboardContent } from '@entities/dashboard/model/enums';
import { useProductHistory } from '@entities/history/model/hooks';
import { DashboardModel } from '@entities/dashboard/model/interfaces';
import { useI18n } from '@shared/lib/i18n_client';

type DashboardLoadData = {
    isLoading: boolean
    data: DashboardModel | undefined
}

export default function useContentTypeData(type: DashboardContent): DashboardLoadData {
    const { dictionary } = useI18n();
    const { data, isLoading } = useProductHistory();

    switch (type) {
        case DashboardContent.HISTORY:
            return ({
                isLoading,
                data: { list: data, title: dictionary?.dashboard.history },
            });
        default:
            throw new Error('pizda..');
    }
}
