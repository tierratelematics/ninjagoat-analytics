import * as History from "history";

class TestLocation {
    pathname: History.Pathname = "/testLocation";
    search: History.Search;
    query: History.Query;
    state: History.LocationState;
    action: History.Action;
    key: History.LocationKey;
    basename?: string;
}

export default TestLocation;