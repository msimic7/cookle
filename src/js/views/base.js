export const DOM = {
  searchForm: () => document.querySelector('.search'),
  searchInput: () => document.querySelector('.search__field'),
  searchResults: () => document.querySelector('.results'),
  searchResultsList: () => document.querySelector('.results__list'),
  recipe: () => document.querySelector('.recipe'),
  recipeServings: () => document.querySelector('.recipe__info-data--people'),
  recipeBtnAddToShoppingList: () => document.querySelector('.recipe__btn'),
  list: () => document.querySelector('.shopping__list'),
  likesList: () => document.querySelector('.likes__list'),
  likesMenu: () => document.querySelector('.likes__field'),
  sadNewsInfo: () => document.querySelector('.sad__news__info'),
  sadNewsBtn: () => document.querySelector('.sad__news__info__close'),
  appContainer: () => document.querySelector('.container')
};

export const renderLoader = parent => {
  const markup = `
  <div class="loader">
    <svg>
      <use href="img/icons.svg#icon-cw"></use>
    </svg>
  </div>
  `;
  parent.insertAdjacentHTML('afterbegin', markup);
};

export const clearLoader = () => {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.parentNode.removeChild(loader);
  }
};
