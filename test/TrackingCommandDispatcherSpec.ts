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
        commandDispatcher: TypeMoq.Mock<MockCommandDispatcher>,
        command: Object;

    beforeEach(() => {
        trackingManager = TypeMoq.Mock.ofType(MockTrackingManager);
        commandDispatcher = TypeMoq.Mock.ofType(MockCommandDispatcher);
        subject = new TrackingCommandDispatcher(trackingManager.object, commandDispatcher.object);

        commandDispatcher.setup(dispatcher => dispatcher.dispatch(TypeMoq.It.isAny())).returns(() => Promise.resolve("url"));
    });

    context("and a command to be tracked", () => {
        beforeEach(() => {
            command = new TrackedCommand();
            trackingManager.setup(t => t.forEventWith("testCategory", "testAction", "testLabel", TypeMoq.It.isValue(command)));
        });

        it("should track it", () => {
            return subject.dispatch(command).then(() => {
                trackingManager.verify(t => t.forEventWith("testCategory", "testAction", "testLabel", TypeMoq.It.isValue(command)), TypeMoq.Times.once());
                commandDispatcher.verify(dispatcher => dispatcher.dispatch(TypeMoq.It.isValue(command)), TypeMoq.Times.once());
            });
        });
    });

    context("and a command to not be tracked", () => {
        beforeEach(() => command = new UnTrackedCommand());

        it("should not track it", () => {
            return subject.dispatch(command).then(() => {
                trackingManager.verify(t => t.forEventWith(TypeMoq.It.isAnyString(),
                    TypeMoq.It.isAnyString(), TypeMoq.It.isAnyString(), TypeMoq.It.isAny()), TypeMoq.Times.never());
                commandDispatcher.verify(dispatcher => dispatcher.dispatch(TypeMoq.It.isValue(command)), TypeMoq.Times.once());
            });
        });
    });
});