function totalPrice(tools, services) {
    const toolsPrice = tools.reduce((accumulator, tool) => {
        return accumulator + tool.price;
    });

    const servicesPrice = services.reduce((accumulator, service) => {
        return accumulator + service.preco;
    });

    return toolsPrice + servicesPrice;
}

export default class Maintenance {
    constructor(date, mechanic, office, tools, services) {
        this.date = date;
        this.mechanic = mechanic;
        this.office = office;
        this.tools = tools;
        this.services = services;
        this.totalPrice = totalPrice(tools, services);

    }
}