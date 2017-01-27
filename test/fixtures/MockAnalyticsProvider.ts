import IAnalyticsProvider from "../../scripts/interfaces/IAnalyticsProvider";

export class MockAnalyticsProvider implements IAnalyticsProvider {

    forPage(path: string) {
    }

    forEventOf(event: Object) {
    }

    forEvent(category: string, action: string, label: string, value: any) {
    }

    initialize() {
    }
}