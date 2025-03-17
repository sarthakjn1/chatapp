class BaseRepository {
    constructor(model) {
      this.model = model;
    }
  
    // Create a new record
    async create(data) {
      return this.model.create(data);
    }
  
    // Find a record by ID
    async findById(id) {
      return this.model.findByPk(id);
    }
  
    // Find all records (with optional query conditions)
    async findAll(conditions = {}) {
      return this.model.findAll({ where: conditions });
    }
  
    // Update a record by ID
    async update(id, data) {
      const record = await this.model.findByPk(id);
      if (!record) {
        throw new Error('Record not found');
      }
      return record.update(data);
    }
  
    // Delete a record by ID
    async delete(id) {
      const record = await this.model.findByPk(id);
      if (!record) {
        throw new Error('Record not found');
      }
      return record.destroy();
    }
  }
  
  module.exports = BaseRepository;