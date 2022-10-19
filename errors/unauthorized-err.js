class UnauthorizedErr extends Error {
  constructor(message) {
    super(message);
    this.name = 'unauthorizedErr';
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedErr;
