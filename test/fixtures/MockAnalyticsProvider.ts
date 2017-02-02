import IAnalyticsProvider from "../../scripts/interfaces/IAnalyticsProvider";

export class MockAnalyticsProvider implements IAnalyticsProvider {

    forPage(path: string) {
    }

    forEvent(event: Object) {
    }

    forEventWith(category: string, action: string, label: string, value: any) {
    }

    initialize() {
    }
}