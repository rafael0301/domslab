class BaseRepository {
    constructor(model) {
        this.model = model;
        this.items = [];
        this.nextId = 1;
    }

    async findAll() {
        return this.items;
    }

    async findById(id) {
        return this.items.find(item => item.id === id);
    }

    async create(data) {
        const newItem = new this.model(this.nextId++, ...Object.values(data));
        this.items.push(newItem);
        return newItem;
    }

    async update(id, data) {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            Object.assign(this.items[index], data);
            return this.items[index];
        }
        return null;
    }

    async delete(id) {
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }
}