import { DOM } from './base';
import { shortenRecipeTitle } from './searchView';

export const toggleLikeBtn = isLiked => {
  document
    .querySelector('.recipe__love use')
    .setAttribute(
      'href',
      `img/icons.svg#${isLiked ? 'icon-heart' : 'icon-heart-outlined'}`
    );
};

export const toggleLikeMenu = numOfLikes => {
  DOM.likesMenu().style.visibility = numOfLikes > 0 ? 'visible' : 'hidden';
};

export const renderLike = like => {
  const markup = `
  <li>
    <a class="likes__link" href="#${like.id}">
      <figure class="likes__fig">
        <img src="${like.img}" alt="Test">
      </figure>
      <div class="likes__data">
        <h4 class="likes__name">${shortenRecipeTitle(like.title)}</h4>
        <p class="likes__author">${like.author}</p>
      </div>
    </a>
  </li>
  `;

  DOM.likesList().insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = id => {
  const el = document.querySelector(`.likes__link[href*="${id}"]`)
    .parentElement;
  if (el) el.parentElement.removeChild(el);
};
