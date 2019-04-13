import { PaginationController } from "./pagination.controller";
import './pagination.component.scss';

export const PaginationComponent = {
  selector: 'pagination',
  bindings: {
    currentPage: '<',
    nextPage: '&',
    previousPage: '&'
  },
  template: require(`./pagination.template.html`),
  controller: PaginationController
};
