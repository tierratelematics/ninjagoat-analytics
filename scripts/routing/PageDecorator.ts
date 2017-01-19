function Page() {
    return function (target: any) {
        Reflect.defineMetadata("ninjagoat:page", true, target);
        return target;
    }
}

export default Page;