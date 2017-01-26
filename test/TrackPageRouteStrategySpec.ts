import "reflect-metadata";
import expect = require("expect.js");
import * as TypeMoq from "typemoq";
import TrackPageRouteStrategy from "../scripts/TrackPageRouteStrategy";
import {RouterState} from "react-router";
import MockTestLocation from "./fiixtures/MockLocation";
import IAnalyticsProvider from "../scripts/interfaces/IAnalyticsProvider";
import {MockAnalyticsProvider} from "./fiixtures/MockAnalyticsProvider";
import {TrackedViewModel, UntrackedViewModel} from "./fiixtures/ViewModels";
import {Location} from "history";

describe("Given a TrackPageRouteStrategy", () => {
    let subject: TrackPageRouteStrategy,
        routerState: RouterState,
        location: TypeMoq.Mock<Location>,
        analyticsProvider: TypeMoq.Mock<IAnalyticsProvider>;

    beforeEach(() => {
        location = TypeMoq.Mock.ofType(MockTestLocation);
        routerState = {location: location.object, routes: null, params: null, components: null};
        analyticsProvider = TypeMoq.Mock.ofType(MockAnalyticsProvider);
        subject = new TrackPageRouteStrategy(analyticsProvider.object, null);
    });

    context("when a tracking of page is requested", () => {
        beforeEach(() => {
            analyticsProvider.setup(a => a.trackPage("/testLocation"));
        });

        it("should send a page view track", () => {
            subject.enter({
                construct: TrackedViewModel,
                id: null,
                observableFactory: null,
                parameters: null
            }, routerState);
            analyticsProvider.verify(a => a.trackPage("/testLocation"), TypeMoq.Times.once());
        });
    });

    context("when a tracking of page is not requested", () => {
        it("should not send a page view track", () => {
            subject.enter({
                construct: UntrackedViewModel,
                id: null,
                observableFactory: null,
                parameters: null
            }, routerState);
            analyticsProvider.verify(a => a.trackPage("/testLocation"), TypeMoq.Times.never());
        });
    });
});