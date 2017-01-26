interface IAnalyticsProvider {
    trackPage(path: string);

    trackEvent(params: Object);
    trackEvent(category: string, action: string, label: string, value: any);
    trackEvent(paramsOrCategory: Object | string, action?: string, label?: string, value?: any);

    initialize();
}

export default IAnalyticsProvider;