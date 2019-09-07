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

export const clearButtons = () => {
  DOM.searchResultsPages().innerHTML = '';
};

export const renderResults = (recipes, page = 1, recipesPerPage = 10) => {
  const start = (page - 1) * recipesPerPage;
  const end = page * recipesPerPage;
  recipes.slice(start, end).forEach(renderRecipe);
  renderButtons(page, recipes.length, recipesPerPage);
};

const createButton = (page, type) => `
  <button class="btn-inline results__btn--${type}" data-goto=${
  type === 'prev' ? page - 1 : page + 1
}>
    <svg class="search__icon">
      <use href="img/icons.svg#icon-triangle-${
        type === 'prev' ? 'left' : 'right'
      }"></use>
    </svg>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
  </button>
`;

const renderButtons = (page, numRecipes, recipesPerPage) => {
  const pages = Math.ceil(numRecipes / recipesPerPage);
  let button;
  if (page === 1 && pages > 1) {
    button = createButton(page, 'next');
  } else if (page < pages) {
    button = `
      ${createButton(page, 'prev')}
      ${createButton(page, 'next')}
    `;
  } else if (page === pages && pages > 1) {
    button = createButton(page, 'prev');
  }
  DOM.searchResultsPages().insertAdjacentHTML('afterbegin', button);
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
      <a class="results__link" href="#${recipe.recipe_id}">
          <figure class="results__fig">
              <img src="${recipe.image_url}" alt="Test">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${shortenRecipeTitle(recipe.title)}</h4>
              <p class="results__author">${recipe.publisher}</p>
          </div>
      </a>
  </li>`;
  DOM.searchResultsList().insertAdjacentHTML('beforeend', markup);
};
