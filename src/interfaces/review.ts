import filter from "../components/Filter";
import {updateReviewEntity} from "./reviewItem";

export interface Filter {
    name: string,
    date: string,
    rating: string
}

export interface Pagination {
    total: number | null,
    page: number,
    limit: number | null
}

export interface Review {
    id : string,
    name: string,
    rating : number,
    type: string,
    user_id : number,
    created_at: number,
    review: string  | undefined,
    author: string  | undefined
}

export interface CreateReview {
    name: string,
    rating : string,
    type: string,
    review: string | null,
    author: string | null
}

export interface ReviewStore {
    filter: Filter,
    type: string,
    reviews : Review[],
    pagination: Pagination,
    changeFilters: (filter : Filter) => void
    setUpType: (type: string) => void,
    getReviewsList: (isFilterUsed?: boolean, updateFullData?: boolean) => void,
    createReview: (data: CreateReview) => void,
    reviewCreatedSuccessful: boolean | null,
    updatePage: () => void,
    setFirstPage: () => void,
    isLoading: boolean,
    clearStatusCreate: () => void,
    deleteReview: (reviewId: string) => void,
    updateReview: (reviewItem : updateReviewEntity) => void
}