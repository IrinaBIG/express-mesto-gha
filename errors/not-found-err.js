class NotFoundErr extends Error {
  constructor(message) {
    super(message);
    this.name = 'notFoundError';
    this.statusCode = 404;
  }
}

module.exports = NotFoundErr;
