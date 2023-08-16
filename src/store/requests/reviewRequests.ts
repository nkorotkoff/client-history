import {CreateReview, Filter} from "../../interfaces/review";
import {instance} from "./axiosBase";
import {CREATE_REVIEW, GET_REVIEWS} from "./actions";


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