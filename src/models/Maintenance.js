function totalPrice(tools, services) {
    const toolsPrice = tools ?
        tools.reduce((accumulator, tool) => {
            return accumulator + tool.price;
        }) :
        0;

    const servicesPrice = services ?
        services.reduce((accumulator, service) => {
            return accumulator + service.preco;
        }) :
        0;

    return toolsPrice + servicesPrice;
}

export default class Maintenance {
    constructor(date, mechanic, office, tools, services, truck) {
        this.date = date;
        this.mechanic = mechanic;
        this.office = office;
        this.tools = tools;
        this.services = services;
        this.truck = truck;
        this.totalPrice = totalPrice(tools, services);
    }
}