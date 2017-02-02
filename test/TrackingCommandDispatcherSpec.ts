import "reflect-metadata";
import expect = require("expect.js");
import {ICommandDispatcher} from "ninjagoat-commands";
import * as TypeMoq from "typemoq";
import {ITrackingManager} from "../scripts/interfaces/ITrackingManager";
import {MockCommandDispatcher} from "./fixtures/MockCommandDispatcher";
import {MockTrackingManager} from "./fixtures/MockTrackingManager";
import TrackingCommandDispatcher from "../scripts/TrackingCommandDispatcher";
import {TrackedCommand, UnTrackedCommand} from "./fixtures/MockCommands";
import * as Promise from "bluebird";

describe("Given a trackingCommandDispatcher", () => {

    let subject: ICommandDispatcher,
        trackingManager: TypeMoq.Mock<ITrackingManager>,
        commandDispatcher: TypeMoq.Mock<MockCommandDispatcher>;

    beforeEach(() => {
        trackingManager = TypeMoq.Mock.ofType(MockTrackingManager);
        commandDispatcher = TypeMoq.Mock.ofType(MockCommandDispatcher);
        subject = new TrackingCommandDispatcher(trackingManager.object, commandDispatcher.object);

        commandDispatcher.setup(dispatcher => dispatcher.dispatch(TypeMoq.It.isAny())).returns(() => Promise.resolve(""));
    });

    context("and a command that i want to track", () => {
        it("i should track it", () => {
            subject.dispatch(new TrackedCommand());
            trackingManager.verify(t => t.trackEvent(), TypeMoq.Times.once());
        });
    });

    context("and a command that i want't to track", () => {
        it("i should not track it", () => {
            subject.dispatch(new UnTrackedCommand());
            trackingManager.verify(t => t.trackEvent(), TypeMoq.Times.never());
        });
    });
});