import "reflect-metadata";
import expect = require("expect.js");
import * as TypeMoq from "typemoq";
import {IRouteStrategy} from "ninjagoat";
import {RouterState} from "react-router";
import TrackPageRouteStrategy from "../scripts/TrackPageRouteStrategy";
import {TrackedViewModel, UntrackedViewModel} from "./fixtures/ViewModels";
import {ITrackingManager} from "../scripts/interfaces/ITrackingManager";
import {MockTrackingManager} from "./fixtures/MockTrackingManager";
import TestLocation from "./fixtures/TestLocation";
import {MockRouteStrategy} from "./fixtures/MockRouteStrategy";

describe("Given a TrackPageRouteStrategy and a page", () => {
    let subject: TrackPageRouteStrategy,
        routerState: RouterState,
        routeStrategy: TypeMoq.Mock<IRouteStrategy>,
        trackingManager: TypeMoq.Mock<ITrackingManager>;

    beforeEach(() => {
        routerState = {location: new TestLocation(), routes: null, params: null, components: null};
        trackingManager = TypeMoq.Mock.ofType(MockTrackingManager);
        routeStrategy = TypeMoq.Mock.ofType(MockRouteStrategy);
        subject = new TrackPageRouteStrategy(trackingManager.object, routeStrategy.object);

        routeStrategy.setup(router => router.enter(TypeMoq.It.isAny(), TypeMoq.It.isAny())).returns(() => Promise.resolve<string>("url"));
    });

    context("when the tracking of that page is enabled", () => {
        beforeEach(() => {
            trackingManager.setup(tracker => tracker.forPage("/testLocation"));
        });

        it("should send a page view", () => {
            return subject.enter({
                construct: TrackedViewModel,
                id: null,
                source: null,
                parameters: null
            }, routerState).then(() => {
                trackingManager.verify(tracker => tracker.forPage("/testLocation"), TypeMoq.Times.once());
            });
        });
    });

    context("when the tracking of that page is not enabled", () => {
        it("should not send a page view", () => {
            return subject.enter({
                construct: UntrackedViewModel,
                id: null,
                source: null,
                parameters: null
            }, routerState).then(() => {
                trackingManager.verify(tracker => tracker.forPage("/testLocation"), TypeMoq.Times.never());
            });
        });
    });
});