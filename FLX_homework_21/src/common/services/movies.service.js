export class MoviesService {
  constructor($http) {
    this.$http = $http;
    this.limit = null;
    this.total = null;
  }

  findMovieById(id) {
    return Promise.resolve(this.$http.get(`https://reactjs-cdp.herokuapp.com/movies/${id}`))
      .then(result => result.data)
  }

  getMovies(limit, offset) {
    return Promise.resolve(this.$http.get(`https://reactjs-cdp.herokuapp.com/movies?limit=${limit}&offset=${offset}`))
      .then(result => result.data.data)
  }
}

MoviesService.serviceName = 'moviesService';
MoviesService.$inject = ['$http'];
