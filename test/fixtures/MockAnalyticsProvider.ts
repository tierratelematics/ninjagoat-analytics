import IAnalyticsProvider from "../../scripts/interfaces/IAnalyticsProvider";

export class MockAnalyticsProvider implements IAnalyticsProvider {

    trackPage(path: string) {
    }

    trackEventOf(event: Object) {
    }

    trackEvent(category: string, action: string, label: string, value: any) {
    }

    initialize() {
    }
}