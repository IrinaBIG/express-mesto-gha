class ConflictErr extends Error {
  constructor(message) {
    super(message);
    this.name = 'conflictErr';
    this.statusCode = 409;
  }
}

module.exports = ConflictErr;
