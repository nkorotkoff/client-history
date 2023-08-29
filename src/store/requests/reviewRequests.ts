import {CreateReview, Filter} from "../../interfaces/review";
import {instance} from "./axiosBase";
import {CREATE_REVIEW, DELETE_REVIEW, EXPORT_XLS, GET_REVIEWS, UPDATE_REVIEW} from "./actions";
import {updateReviewEntity} from "../../interfaces/reviewItem";


export function actionGetReviews(filter: { type: string, name: string, date: string, rating: string, page: number | null }) {
    return instance.get(
        GET_REVIEWS,
        {params: filter}
    )
}

export function actionAddReview(data: CreateReview) {
    return instance.post(
        CREATE_REVIEW,
        data
    )
}

export function actionDeleteReview(reviewId: string) {
    return instance.delete(
        DELETE_REVIEW,
        {
            data: {
                review_id: reviewId
            }
        }
    )
}

export function actionUpdateReview(data: updateReviewEntity) {
    return instance.post(
        UPDATE_REVIEW,
        data
    )
}

export function actionExportXls(type: string) {
    return instance.get(
        EXPORT_XLS,
        {
            params: {type: type}
        }
    )
}