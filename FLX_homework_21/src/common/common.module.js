import angular from 'angular';
import {MoviesComponent} from "./components/movies/movies.component";
import {FreshMovieDirective} from './directives/fresh-movie.directive';
import {MoviesService} from "./services/movies.service";

// components
import {AppNavComponent} from './components/app-nav/app-nav.component';
import {MovieInfoComponent} from "./components/movie-info/movie-info.component";
import {PaginationComponent} from './components/pagination/pagination.component'

// styles
import './components/app-nav/app-nav.component.scss';

const MODULE_NAME = 'common';
const MODULE_IMPORTS = [];

export const CommonModule = angular
  .module(MODULE_NAME, MODULE_IMPORTS)
  .component(AppNavComponent.selector, AppNavComponent)
  .component(MoviesComponent.selector, MoviesComponent)
  .directive(FreshMovieDirective().name, FreshMovieDirective)
  .service(MoviesService.serviceName, MoviesService)
  .component(MovieInfoComponent.selector, MovieInfoComponent)
  .component(PaginationComponent.selector, PaginationComponent)
  .name;
