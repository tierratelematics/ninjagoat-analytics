import "reflect-metadata";
import expect = require("expect.js");
import * as TypeMoq from "typemoq";
import {ITrackingManager} from "../scripts/interfaces/ITrackingManager";
import {MockAnalyticsProvider} from "./fixtures/MockAnalyticsProvider";
import TrackingManager from "../scripts/TrackingManager";
import IAnalyticsProvider from "../scripts/interfaces/IAnalyticsProvider";

describe("Given a TrackingManager", () => {
    let subject: ITrackingManager,
        analyticsProvider: TypeMoq.Mock<IAnalyticsProvider>,
        event: Object;

    beforeEach(() => {
        analyticsProvider = TypeMoq.Mock.ofType(MockAnalyticsProvider);
        subject = new TrackingManager([analyticsProvider.object]);
    });

    context("when tracking a page", () => {
        it("should call the page tracking method of every provider registered", () => {
            subject.forPage("/testLocation");
            analyticsProvider.verify(p => p.forPage("/testLocation"), TypeMoq.Times.once());
        });
    });

    context("when tracking a standard event", () => {
        it("should call the standard event tracking method of every provider registered", () => {
            subject.forEvent("testCategory", "testAction", "testLabel", null);
            analyticsProvider.verify(p => p.forEvent("testCategory", "testAction", "testLabel", null), TypeMoq.Times.once());
        });
    });

});