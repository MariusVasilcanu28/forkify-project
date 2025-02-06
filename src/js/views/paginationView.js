import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (numPages <= 1) return '';

    const prevButton = this._createButton(currentPage - 1, 'prev', 'left');
    const nextButton = this._createButton(currentPage + 1, 'next', 'right');

    if (currentPage === 1) {
      return nextButton;
    }

    if (currentPage === numPages) {
      return prevButton;
    }

    return `${prevButton}${nextButton}`;
  }

  _createButton(page, type, direction) {
    return `
      <button data-goto="${page}" class="btn--inline pagination__btn--${type}">
        ${direction === 'left' ? this._createIcon('left') : ''}
        <span>Page ${page}</span>
        ${direction === 'right' ? this._createIcon('right') : ''}
      </button>
    `;
  }

  _createIcon(direction) {
    return `
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-${direction}"></use>
      </svg>
    `;
  }
}

export default new PaginationView();
