class ServiceLocator {
    static instance = null;
    services = {};

    static getInstance() {
        if (!ServiceLocator.instance) {
            ServiceLocator.instance = new ServiceLocator();
        }
        return ServiceLocator.instance;
    }

    register(name, service) {
        this.services[name] = service;
    }

    get(name) {
        return this.services[name];
    }
}