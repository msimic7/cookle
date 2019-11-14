import axios from 'axios';

export default class Recipe {
  constructor(recipeID) {
    this.recipeID = recipeID;
  }

  async getRecipe() {
    try {
      const result = await axios(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.recipeID}`
      );

      this.title = result.data.meals[0].strMeal;
      this.author = result.data.meals[0].strArea;
      this.img = result.data.meals[0].strMealThumb;
      this.url = result.data.meals[0].strYoutube;
      this.ingredients = [];
      let meal;
      let i = 1;
      while ((meal = result.data.meals[0][`strIngredient${i}`])) {
        const ingr = result.data.meals[0][`strMeasure${i}`];
        this.ingredients.push(`${ingr} ${meal}`);
        i++;
      }
    } catch (error) {
      console.log(error);
    }
  }

  calcRecipeTime() {
    //Assuming its 5mins per 3 ingredients
    this.time = Math.ceil(this.ingredients.length / 3) * 5;
  }

  calcServings() {
    this.servings = 4;
  }
}
