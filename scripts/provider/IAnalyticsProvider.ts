import IPageViewArgs from "./IPageViewArgs";
import IEventArgs from "./IEventArgs";

interface IAnalyticsProvider {
    pageview(args: IPageViewArgs): void;
    event(args: IEventArgs): void;
}

export default IAnalyticsProvider;