class BadRequestErr extends Error {
  constructor(message) {
    super(message);
    this.name = 'badRequestError';
    this.statusCode = 400;
  }
}

module.exports = BadRequestErr;
