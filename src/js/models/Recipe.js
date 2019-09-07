import axios from 'axios';
import { key } from '../config';

export default class Recipe {
  constructor(recipeID) {
    this.recipeID = recipeID;
  }

  async getRecipe() {
    try {
      const result = await axios(
        `https://www.food2fork.com/api/get?key=${key}&rId=${this.recipeID}`
      );

      this.title = result.data.recipe.title;
      this.author = result.data.recipe.publisher;
      this.img = result.data.recipe.image_url;
      this.url = result.data.recipe.source_url;
      this.ingredients = result.data.recipe.ingredients;
    } catch (error) {
      console.log(error);
      alert('Failed getting recipe!');
    }
  }

  calcRecipeTime() {
    //Assuming its 10mins per 3 ingredients
    this.time = Math.ceil(this.ingredients.length / 3) * 10;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const ingrLong = [
      /tablespoon[s]?[,]?/gi,
      /teaspoon[s]?[,]?/gi,
      /ounce[s]?[,]?/gi,
      /cups[,]?/gi,
      /pounds[,]?/gi
    ];
    const ingrShort = ['tbsp', 'tsp', 'oz', 'cup', 'pound'];

    const newIngredients = this.ingredients.map(ingredient => {
      ingrLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, ingrShort[i]);
      });

      //Remove parantases with text
      ingredient = ingredient.replace(/ *\(.*\) */g, ' ');

      const ingrArr = ingredient.split(' ');
      const unitIndex = ingrArr.findIndex(el1 => ingrShort.includes(el1));

      let ingrObj;
      if (unitIndex > -1) {
        //There is a unit
        const countArr = ingrArr.slice(0, unitIndex);

        let count;
        if (countArr === 1) {
          count = eval(ingrArr[0].replace('-', '+'));
        } else {
          count = eval(ingrArr.slice(0, unitIndex).join('+'));
        }

        ingrObj = {
          count,
          unit: ingrArr[unitIndex],
          ingredient: ingrArr.slice(unitIndex + 1).join(' ')
        };
      } else if (parseInt(ingrArr[0], 10)) {
        //There is no unit, first unit is a number
        ingrObj = {
          count: parseInt(ingrArr[0], 10),
          unit: '',
          ingredient: ingrArr.slice(1).join(' ')
        };
      } else if (unitIndex === -1) {
        //There is no unit and no number
        ingrObj = {
          count: 1,
          unit: '',
          ingredient
        };
      }

      return ingrObj;
    });

    this.ingredients = newIngredients;
  }

  updateServings(type) {
    const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

    //Update servings
    this.ingredients.forEach(ing => (ing.count *= newServings / this.servings));

    this.servings = newServings;
  }
}
