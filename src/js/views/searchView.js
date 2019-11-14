import { DOM } from './base';

export const getIpnut = () => {
  return DOM.searchInput().value;
};

export const clearInput = () => {
  DOM.searchInput().value = '';
};

export const clearResults = () => {
  DOM.searchResultsList().innerHTML = '';
};

export const renderResults = recipes => {
  if (recipes) recipes.slice(0, 10).forEach(renderRecipe);
  else alert('No recipes found for that query.Please try something else!');
};

export const shortenRecipeTitle = (title, limit = 17) => {
  const newRecipeTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((acc, curr) => {
      if (acc + curr.length <= limit) newRecipeTitle.push(curr);
      return acc + curr.length;
    }, 0);
    return `${newRecipeTitle.join(' ')} ...`;
  }
  return title;
};

const renderRecipe = recipe => {
  const markup = `<li>
      <a class="results__link" href="#${recipe.idMeal}">
          <figure class="results__fig">
              <img src="${recipe.strMealThumb}" alt="Test">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${shortenRecipeTitle(
                recipe.strMeal
              )}</h4>
              <p class="results__author">${recipe.strArea}</p>
          </div>
      </a>
  </li>`;
  DOM.searchResultsList().insertAdjacentHTML('beforeend', markup);
};
