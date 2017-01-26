import "reflect-metadata";
import expect = require("expect.js");
import * as TypeMoq from "typemoq";
import {ITrackingManager} from "../scripts/interfaces/ITrackingManager";
import {MockAnalyticsProvider} from "./fiixtures/MockAnalyticsProvider";
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
        it("every provider should track it", () => {
            subject.trackPage("/testLocation");
            analyticsProvider.verify(p => p.trackPage("/testLocation"), TypeMoq.Times.once());
        });
    });

    context("when tracking a event", () => {
        beforeEach(() => event = {category: "testCategory", label: "testLabel"});

        it("every provider should track it", () => {
            subject.trackEventOf(event);
            analyticsProvider.verify(p => p.trackEventOf(TypeMoq.It.isValue(event)), TypeMoq.Times.once());
        });
    });

});