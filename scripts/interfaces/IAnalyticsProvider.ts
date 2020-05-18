interface IAnalyticsProvider {
    forPage(path: string);
    forEvent(category: string, action: string, label: string, value: any, options?: any);
    initialize();
}

export default IAnalyticsProvider;