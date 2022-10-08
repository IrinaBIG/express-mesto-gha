class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = "NoFound";
    this.statusCode = 404;
  }
}

module.exports = NotFound;
