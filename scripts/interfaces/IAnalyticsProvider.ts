interface IAnalyticsProvider {
    forPage(path: string);
    forEventOf(event: Object);
    forEvent(category: string, action: string, label: string, value: any);
    initialize();
}

export default IAnalyticsProvider;