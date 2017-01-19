interface IEventArgs extends Object {
    ec: string, //event category
    ea: string, //event action
    el?: string, //event label
    ev?: any, //event value
    dp?: Object //params
}

export default IEventArgs