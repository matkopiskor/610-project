import { createContext, Dispatch, FC, SetStateAction, useCallback, useContext, useEffect, useState } from 'react';
import { createReview, deleteReview, editReview, getAllFilteredReviews, getAllReviews } from '../api/reviews';
import { IReview } from '../models/Review';

interface IReviewContext {
    data: IReview[];
    total: number;
    page: number;
    size: number;
    filter: string;
    setData: Dispatch<SetStateAction<IReview[]>>;
    setPage: Dispatch<SetStateAction<number>>;
    setSize: Dispatch<SetStateAction<number>>;
    setTotal: Dispatch<SetStateAction<number>>;
    setFilter: Dispatch<SetStateAction<string>>;
}

const ReviewContext = createContext<IReviewContext>({} as IReviewContext);

const ReviewContextProvider: FC = ({ children }) => {
    const [data, setData] = useState<IReview[]>([]);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(10);
    const [total, setTotal] = useState<number>(0);
    const [filter, setFilter] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            const { review, totalSize } = await getAllReviews(page - 1, size);
            setData(review);
            setTotal(totalSize);
        };
        const fetchFilteredData = async () => {
            const { review, totalSize } = await getAllFilteredReviews(page - 1, size, filter);
            setData(review);
            setTotal(totalSize);
        };
        if (!filter) {
            fetchData();
        } else {
            fetchFilteredData();
        }
    }, [page, size, filter]);

    return (
        <ReviewContext.Provider
            value={{
                data,
                total,
                page,
                size,
                filter,
                setData,
                setPage,
                setSize,
                setTotal,
                setFilter,
            }}
        >
            {children}
        </ReviewContext.Provider>
    );
};

const useReviewContext = () => {
    const { data, total, page, size, setData, setPage, setSize, setFilter } = useContext(ReviewContext);

    const changePage = useCallback((num: number) => setPage(num), [setPage]);

    const setDataSize = useCallback(
        (num: number) => {
            setPage(1);
            setSize(num);
        },
        [setSize, setPage]
    );

    const updateFilter = useCallback(
        (value: string) => {
            setFilter(value);
        },
        [setFilter]
    );

    const createReviewAction = useCallback(
        async (review: Partial<IReview>) => {
            const newReview = await createReview(review);
            if (!!newReview) {
                setData((prev) => [newReview, ...prev]);
            }
        },
        [setData]
    );

    const editReviewAction = useCallback(
        async (review: Partial<IReview>) => {
            const editedReview = await editReview(review);
            if (!!editedReview) {
                setData((prev) =>
                    prev.map((item) => {
                        if (item.id === editedReview.id) {
                            return editedReview;
                        } else {
                            return item;
                        }
                    })
                );
            }
        },
        [setData]
    );

    const deleteReviewAction = useCallback(
        async (id: string) => {
            const success = await deleteReview(id);
            if (success) {
                setData((prev) => prev.filter((item) => item.id !== id));
            }
        },
        [setData]
    );

    return {
        data,
        total,
        page,
        size,
        changePage,
        setDataSize,
        createReviewAction,
        editReviewAction,
        deleteReviewAction,
        updateFilter,
    };
};

export default ReviewContextProvider;

export { useReviewContext };
