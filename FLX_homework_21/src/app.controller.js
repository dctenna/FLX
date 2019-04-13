import {MoviesService} from "./common/services/movies.service";

export class AppController {
  constructor(moviesService) {

    this.button = null;
    this.currentPage = 0;
    this.limit = 10;
    this.offset = 0;
    this.user = {};
    this.movies = [];
    this.moviesService = moviesService;
  }

  nextPage() {
    this.currentPage += 1;
    this.offset = this.currentPage * this.limit;

    this.moviesService.getMovies(this.limit, this.offset).then((result) => {
      this.movies = result;
    })
  }

  previousPage() {
    this.currentPage -= 1;
    this.offset = this.currentPage * this.limit;

    this.moviesService.getMovies(this.limit, this.offset).then((result) => {
      this.movies = result;
    })
  }

  $onInit() {
    this.button = "Logout";
    this.user = {
      email: "user@email.com",
      password: "3%2f43#}54f[st31"
    };
    this.moviesService.getMovies(this.limit, this.offset).then((result) => {
      this.movies = result;
    });

  }

  logout(event) {
    // Make a service call or simmilar...
    if (event.userEmail === this.user.email) {
      console.log(">>>User has been logged out: ", {email: event.userEmail});
    }
  }
}

AppController.$inject = [MoviesService.serviceName];
