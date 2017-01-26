import {ObservableViewModel} from "ninjagoat";
import Page from "../../scripts/routing/PageDecorator";

@Page()
export class TrackedViewModel extends ObservableViewModel<void> {
    onData(data: void) {

    }
}

export class UntrackedViewModel extends ObservableViewModel<void> {
    onData(data: void) {

    }
}