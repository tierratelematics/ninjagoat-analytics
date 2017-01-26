import IAnalyticsProvider from "../../scripts/interfaces/IAnalyticsProvider";

export class MockAnalyticsProvider implements IAnalyticsProvider{

    pageview(path: string) {
    }

    event(params: Object)
    event(category: string, action: string, label: string, value: any)
    event(paramsOrCategory: Object|string, action?: string, label?: string, value?: any) {

    }
}