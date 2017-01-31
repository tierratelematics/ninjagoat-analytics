import {CommandDecorators as command} from "ninjagoat-commands";
import {DoNotTrack} from "../../scripts/TrackingDecorator";

@command.Type("DefaultCommand")
@command.Endpoint("testEndpoint")
class TrackedCommand {
    public foo:string = "bar";
}

@command.Type("DefaultCommand")
@command.Endpoint("testEndpoint")
@DoNotTrack()
class UnTrackedCommand {
    public foo:string = "bar";
}

