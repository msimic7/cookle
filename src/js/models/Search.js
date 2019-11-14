import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getRecipes() {
    try {
      const result = await axios(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.query}`
      );
      this.recipes = result.data.meals;
    } catch (error) {
      console.log(error);
    }
  }
}
