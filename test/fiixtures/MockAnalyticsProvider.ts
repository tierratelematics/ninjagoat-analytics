import IAnalyticsProvider from "../../scripts/provider/IAnalyticsProvider";

export class MockAnalyticsProvider implements IAnalyticsProvider{

    pageview(path: string) {
    }

    event(params: Object)
    event(category: string, action: string, label: string, value: any)
    event(paramsOrCategory: Object|string, action?: string, label?: string, value?: any) {

    }
}