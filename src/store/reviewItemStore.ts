import {create} from "zustand";
import {ReviewItemStore, updateReviewEntity} from "../interfaces/reviewItem";
import reviewStore from "./reviewStore";
import {actionDeleteReview, actionUpdateReview} from "./requests/reviewRequests";
import {OK} from "./requests/requestCodes";


const reviewItemStore = create<ReviewItemStore>((set, get) => ({
    review: {},
    showMessage: false,
    message: '',

    getReview: (reviewId: string) => {
        const useReviewStore = reviewStore.getState()
        return useReviewStore.reviews.filter((item) => {
            return item.id === reviewId
        })[0]
    },
    async deleteReview(reviewId) {
        try {
            const {data} = await actionDeleteReview(reviewId)
            if (data.code === OK) {
                const useReviewStore = reviewStore.getState()
                useReviewStore.deleteReview(reviewId)
                set({message: 'Отзыв успешно удален'})
            } else {
                set({message: 'Не удалось удалить отзыв'})
            }
        } catch (e) {
            set({message: 'Не удалось удалить отзыв'})
            console.log(e)
        } finally {
            set({showMessage: true})
        }
    },

    async updateReview(updateReview: updateReviewEntity) {
      try {
        const {data} = await actionUpdateReview(updateReview)
          if (data.code === OK) {
              const useReviewStore = reviewStore.getState()
              const typeReview = useReviewStore.type
              if (updateReview.type === typeReview) {
                    useReviewStore.updateReview(updateReview)
              }
              set({message: 'Отзыв успешно обновлен'})
          } else {
              set({message: 'Не удалось обновить отзыв'})
          }

      } catch (e) {
          set({message: 'Не удалось обновить отзыв'})
          console.log(e)
      } finally {
          set({showMessage: true})
      }
    },

    hideModalWindow() {
        set({showMessage: false})
    }
}))

export default reviewItemStore