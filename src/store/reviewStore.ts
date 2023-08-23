import {create} from "zustand";
import {CreateReview, Filter, Review, ReviewStore} from "../interfaces/review";
import {actionAddReview, actionGetReviews} from "./requests/reviewRequests";
import {OK} from "./requests/requestCodes";
import {updateReviewEntity} from "../interfaces/reviewItem";


const reviewStore = create<ReviewStore>((set, get) => ({
        filter: {
            name: '',
            rating: '',
            date: '',
        },
        reviews: [],
        pagination: {
            total: null,
            page: 1,
            limit: null
        },
        type: '',
        reviewCreatedSuccessful: null,
        isLoading: false,

        changeFilters: (filter: Filter) => {
            set({
                filter: {
                    name: filter.name,
                    date: filter.date,
                    rating: filter.rating
                }
            })
        },

        setUpType: (type: string) => {
            set({type: type})
            get().setFirstPage()
            get().getReviewsList(true, true)
        },

        getReviewsList: async (isFilterUsed = false, updateFullData = false) => {
            const filter = get().filter
            if (isFilterUsed) {
                get().setFirstPage()
            }

            const params = {
                ...filter,
                type: get().type,
                page: get().pagination.page
            }
            try {
                set({isLoading: true})
                const {data} = await actionGetReviews(params)
                set((state) => ({
                    pagination: {
                        ...state.pagination,
                        total: data.result.total,
                    },
                }))

                if (updateFullData) {
                    set({reviews: data.result.data})
                } else {
                    const reviewsIds = new Set(get().reviews.map(item => item.id));
                    const newReviews = data.result.data.filter((item: Review) => !reviewsIds.has(item.id));
                    set((state) => ({
                        reviews: [...state.reviews, ...newReviews],
                    }));

                }


            } catch (e) {
                console.error(e)
            } finally {
                set({isLoading: false})
            }
        },
        createReview: async (params: CreateReview) => {
            try {
                const {data} = await actionAddReview(params)
                if (data.code === OK) {
                    set({reviewCreatedSuccessful: true})
                    get().getReviewsList()
                } else {
                    set({reviewCreatedSuccessful: false})
                }
            } catch (e) {
                console.log(e)
            }
        },
        updatePage: () => {
            const pagination = get().pagination;
            if (pagination.page !== null && pagination.total !== null) {
                if (pagination.page === pagination.total) {
                    return
                }
            }
            set((state) => ({
                pagination: {
                    ...state.pagination,
                    page: state.pagination.page + 1,
                },
            }))
            get().getReviewsList()
        },
        setFirstPage: () => {
            set((state) => ({
                pagination: {
                    ...state.pagination,
                    page: 1,
                },
            }))
        },
        clearStatusCreate: () => {
            set({reviewCreatedSuccessful: null})
        },

        deleteReview: (reviewId) => {
            const reviews = get().reviews.filter((item) => {
                return item.id !== reviewId
            })

            set({reviews: reviews})
        },

        updateReview: (reviewItem: updateReviewEntity) => {
            // @ts-ignore
            set((state) => ({
                reviews: state.reviews.map((review) =>
                    review.id === reviewItem.id ? { ...review, ...{
                            review: reviewItem.review,
                            rating: reviewItem.rating,
                            name: reviewItem.name
                        }} : review
                ),
            }));
        }
    }


))

export default reviewStore