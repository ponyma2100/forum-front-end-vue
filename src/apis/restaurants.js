import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getRestaurants({ page, categoryId }) {
    const searchParams = new URLSearchParams({ page, categoryId })
    return apiHelper.get(`/restaurants?${searchParams.toString()}`
    )
  },
  getRestaurant({ restaurantId }) {
    return apiHelper.get(`/restaurants/${restaurantId}`)
  },
  getRestaurantsTop() {
    return apiHelper.get('/restaurants/top')
  },
  getRestaurantsFeeds() {
    return apiHelper.get('/restaurants/feeds')
  }
}