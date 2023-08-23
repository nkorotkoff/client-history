import {Review} from "./review";

export interface ReviewItemStore {
    review: Review | {},
    showMessage: boolean,
    message: string,
    getReview: (reviewId: string) => Review,
    deleteReview: (reviewId: string) => void,
    hideModalWindow: () => void,
    updateReview: (updateReview: updateReviewEntity) => void
}

export interface updateReviewEntity {
    id: string,
    name: string,
    rating : string,
    type: string,
    review: string | null,
    author: string | null,
}