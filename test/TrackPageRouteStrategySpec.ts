import "reflect-metadata";
import expect = require("expect.js");
import * as TypeMoq from "typemoq";
import TrackPageRouteStrategy from "../scripts/TrackPageRouteStrategy";
import {RouterState} from "react-router";
import {TrackedViewModel, UntrackedViewModel} from "./fiixtures/ViewModels";
import {ITrackingManager} from "../scripts/interfaces/ITrackingManager";
import {MockTrackingManager} from "./fiixtures/MockTrackingManager";
import TestLocation from "./fiixtures/TestLocation";

describe("Given a TrackPageRouteStrategy", () => {
    let subject: TrackPageRouteStrategy,
        routerState: RouterState,
        trackingManager: TypeMoq.Mock<ITrackingManager>;

    beforeEach(() => {
        routerState = {location: new TestLocation(), routes: null, params: null, components: null};
        trackingManager = TypeMoq.Mock.ofType(MockTrackingManager);
        subject = new TrackPageRouteStrategy(trackingManager.object, null);
    });

    context("when a tracking of page is requested", () => {
        beforeEach(() => {
            trackingManager.setup(a => a.trackPage("/testLocation"));
        });

        it("should send a page view track", () => {
            subject.enter({
                construct: TrackedViewModel,
                id: null,
                observableFactory: null,
                parameters: null
            }, routerState);
            trackingManager.verify(a => a.trackPage("/testLocation"), TypeMoq.Times.once());
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
            trackingManager.verify(a => a.trackPage("/testLocation"), TypeMoq.Times.never());
        });
    });
});