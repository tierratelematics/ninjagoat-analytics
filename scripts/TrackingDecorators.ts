function Page() {
    return function (target: any) {
        Reflect.defineMetadata("ninjagoat:page", true, target);
        return target;
    }
}

function DoNotTrack(){
    return function(target: any){
        Reflect.defineMetadata("ninjagoatAnalytics:NotTrack", true, target);
        return target;
    }
}

export {Page};
export {DoNotTrack};