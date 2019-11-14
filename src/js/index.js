import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import { DOM, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

const state = {};

const searchControl = async () => {
  const query = searchView.getIpnut();
  if (query) {
    //Create Search object and add to state
    state.search = new Search(query);
    //Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(DOM.searchResults());
    //Search for recipes
    await state.search.getRecipes();
    //Render results on UI
    searchView.clearInput();
    clearLoader(DOM.searchResults());
    searchView.renderResults(state.search.recipes);
  }
};

DOM.searchForm().addEventListener('submit', e => {
  e.preventDefault();
  searchControl();
});

const recipeControler = async () => {
  const id = window.location.hash.substring(1);

  if (id) {
    //Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(DOM.recipe());
    //Create Recipe object and add to state
    state.recipe = new Recipe(id);

    try {
      //Get recipe data
      await state.recipe.getRecipe();
      clearLoader(DOM.recipe());
      state.recipe.calcRecipeTime();
      state.recipe.calcServings();

      //Render recipe
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch (error) {
      console.log(error);
      alert('Recipe id invalid!');
    }
  }
};

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, recipeControler)
);

window.addEventListener('load', () => {
  DOM.sadNewsBtn().addEventListener('click', () => {
    DOM.sadNewsInfo().remove();
    DOM.appContainer().classList.remove('sad__news');
  });
  state.likes = new Likes();
  state.likes.readData();
  likesView.toggleLikeMenu(state.likes.getNumOfLikes());

  state.likes.likes.forEach(like => likesView.renderLike(like));
});

DOM.recipe().addEventListener('click', e => {
  if (e.target.matches('.recipe__btn, .recipe__btn *')) {
    listControler();
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    likesControler();
  }
});

DOM.list().addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;
  //Delete an item
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    //Delete from state
    state.list.deleteItem(id);
    //Delete from UI
    listView.deleteItem(id);
  }
});

const listControler = () => {
  if (!state.list) {
    state.list = new List();
  }

  state.recipe.ingredients.forEach(ing => {
    const item = state.list.addItem(ing);
    listView.renderItem(item);
  });
};

const likesControler = () => {
  if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.recipeID;

  if (!state.likes.isLiked(currentID)) {
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );
    likesView.renderLike(newLike);
    likesView.toggleLikeBtn(true);
  } else {
    state.likes.deleteLike(currentID);

    likesView.toggleLikeBtn(false);

    likesView.deleteLike(currentID);
  }

  likesView.toggleLikeMenu(state.likes.getNumOfLikes());
};
