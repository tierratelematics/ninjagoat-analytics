import {CommandDecorators as command} from "ninjagoat-commands";
import {DoNotTrack} from "../../scripts/TrackingDecorators";

@command.Type("DefaultCommand")
@command.Endpoint("testEndpoint")
export class TrackedCommand {
    public foo:string = "bar";
}

@command.Type("DefaultCommand")
@command.Endpoint("testEndpoint")
@DoNotTrack()
export class UnTrackedCommand {
    public foo:string = "bar";
}
