const ERROR_CODE = 400; //  когда с запросом что-то не так;
const UNAUTHORIZED = 401; //  когда что-то не так при аутентификации или авторизации;
const FORBIDDEN = 403;
const NOT_FOUND = 404; //  например, когда мы не нашли ресурс по переданному _id;
const INTERNAL_SERVER_ERROR = 500;

module.exports = {
  ERROR_CODE,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  FORBIDDEN,
  UNAUTHORIZED,
};
