import { DOM } from './base';

export const renderRecipe = (recipe, isLiked) => {
  const markup = `<figure class="recipe__fig">
    <img src="${recipe.img}" alt="recipe pic" class="recipe__img">
    <h1 class="recipe__title">
        <span>${recipe.title}</span>
    </h1>
</figure>
<div class="recipe__details">
    <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-stopwatch"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${
          recipe.time
        }</span>
        <span class="recipe__info-text"> minutes</span>
    </div>
    <div class="recipe__info">
        <svg class="recipe__info-icon">
            <use href="img/icons.svg#icon-man"></use>
        </svg>
        <span id="testID" class="recipe__info-data recipe__info-data--people">${
          recipe.servings
        }</span>
        <span class="recipe__info-text"> servings</span>
    </div>
    <button class="recipe__love">
        <svg class="header__likes">
            <use href="img/icons.svg#icon-heart${
              isLiked ? '' : '-outlined'
            }"></use>
        </svg>
    </button>
</div>
<div class="recipe__ingredients">
    <ul class="recipe__ingredient-list">
        ${renderIngredients(recipe)}
    </ul>
    <button class="btn-small recipe__btn">
        <svg class="search__icon">
            <use href="img/icons.svg#icon-shopping-cart"></use>
        </svg>
        <span>Add to shopping list</span>
    </button>
</div>
<div class="recipe__directions">
    <h2 class="heading-2">How to cook it</h2>
    <p class="recipe__directions-text">
       Please check out directions on Youtube.
    </p>
    <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
        <span>Directions</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-right"></use>
        </svg>
    </a>
</div>
`;
  DOM.recipe().insertAdjacentHTML('afterbegin', markup);
};

const renderIngredients = recipe => {
  const ingredientList = [];
  recipe.ingredients.forEach(ing => {
    const markup = `
    <li class="recipe__item">
            <svg class="recipe__icon">
                <use href="img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__ingredient">
                ${ing}
            </div>
        </li>
    `;
    ingredientList.push(markup);
  });
  return ingredientList.join('\n');
};

export const clearRecipe = () => {
  DOM.recipe().innerHTML = '';
};
