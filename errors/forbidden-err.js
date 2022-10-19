class ForbiddenErr extends Error {
  constructor(message) {
    super(message);
    this.name = 'forbiddenError';
    this.statusCode = 403;
  }
}

module.exports = ForbiddenErr;
