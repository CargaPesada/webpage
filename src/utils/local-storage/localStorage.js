class LocalStorage {
    constructor() {
        localStorage.maintenances = new Set();
    }

    addMaintenance(...maintenances) {
        localStorage.maintenances.add(maintenances);
    }

    deleteMaintenance(...maintenances) {
        localStorage.maintenances.delete(maintenances);
    }

    getAllMaitenance() {
        return localStorage.maintenances;
    }
}

// Singleton class
const localStorageInstance = new LocalStorage();
Object.freeze(localStorageInstance);

export default localStorageInstance;
