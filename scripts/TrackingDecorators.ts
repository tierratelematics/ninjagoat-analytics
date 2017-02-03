function Page() {
    return function (target: any) {
        Reflect.defineMetadata("ninjagoat:page", true, target);
        return target;
    }
}
function Event(category: string, action?: string, label?: string) {
    return function (target: any) {
        Reflect.defineMetadata("ninjagoatAnalytics:category", category, target);
        Reflect.defineMetadata("ninjagoatAnalytics:action", action || "", target);
        Reflect.defineMetadata("ninjagoatAnalytics:label", label || "", target);
        return target;
    }
}

export {Page};
export {Event};