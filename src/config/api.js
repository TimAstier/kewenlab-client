let API_URL = '';

switch(process.env.NODE_ENV) {
  case 'development':
    API_URL = 'http://localhost:8080';
    break;
  case 'production':
    API_URL = 'https://damp-shelf-57274.herokuapp.com';
    break;
  default:
    API_URL = 'undefined';
}

export default API_URL;