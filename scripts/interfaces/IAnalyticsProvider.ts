interface IAnalyticsProvider {
    forPage(path: string);
    forEvent(category: string, action: string, label: string, value: any);
    initialize();
}

export default IAnalyticsProvider;