const BaseRepository = require('./baseRepository');
const { File } = require('../models');

class FileRepository extends BaseRepository {
  constructor() {
    super(File);
  }
}

module.exports = FileRepository;