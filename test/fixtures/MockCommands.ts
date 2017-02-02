import {CommandDecorators as command} from "ninjagoat-commands";
import {Event} from "../../scripts/TrackingDecorators";

@command.Type("DefaultCommand")
@command.Endpoint("testEndpoint")
@Event("testCategory", "testAction", "testLabel")
export class TrackedCommand {
    public foo: string = "bar";
}

@command.Type("DefaultCommand")
@command.Endpoint("testEndpoint")
export class UnTrackedCommand {
    public foo: string = "bar";
}