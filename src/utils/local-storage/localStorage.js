class LocalStorage {
    constructor() {
        this.maintenances = new Set();
    }

    addMaintenance(...maintenances) {
        this.maintenances.add(maintenances);
    }

    deleteMaintenance(...maintenances) {
        this.maintenances.delete(maintenances);
    }

    getAllMaitenance() {
        return this.maintenances;
    }
}

// Singleton class
const localStorageInstance = new LocalStorage();
Object.freeze(localStorageInstance);

export default localStorageInstance;
