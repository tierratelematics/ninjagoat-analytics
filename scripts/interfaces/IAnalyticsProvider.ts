interface IAnalyticsProvider {
    trackPage(path: string);
    trackEventOf(event: Object);
    trackEvent(category: string, action: string, label: string, value: any);
    initialize();
}

export default IAnalyticsProvider;