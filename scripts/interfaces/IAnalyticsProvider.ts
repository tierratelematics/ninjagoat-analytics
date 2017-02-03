interface IAnalyticsProvider {
    forPage(path: string);
    forEvent(event: Object);
    forEventWith(category: string, action: string, label: string, value: any);
    initialize();
}

export default IAnalyticsProvider;