class LocalStorage {
    constructor() {
        this.maintenances = [];
    }

    addMaintenance(maintenance) {
        this.maintenances.push(maintenance);
    }

    deleteMaintenance(maintenance) {
        this.maintenances = this.maintenances.filter(maint => {
            return maint.date.getTime() !== maintenance.date.getTime();
        });
    }

    getAllMaitenance() {
        return this.maintenances;
    }
}

const localStorageInstance = new LocalStorage();
export default localStorageInstance;
