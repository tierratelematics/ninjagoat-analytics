# Ninjagoat-analytics

This module can be used to include analytics tools inside [ninjagoat](https://github.com/tierratelematics/ninjagoat) powered applications. 

## Installation

`
$ npm install ninjagoat-analytics
`

Add this code to the bootstrapper.ts file:

```typescript
import {AnalyticsModule} from "ninjagoat-analytics";

let application = new LocalizedApplication();
application.register(new AnalyticsModule());
```

Set the google analytics account id in one of your modules.

```typescript
import {ITranslationsConfig} from "ninjagoat-translations"

container.bind<IAnalyticsConfig>("IAnalyticsConfig").toConstantValue({
   "analytics" : {
     "accountID":"UA-XXXXXXXXX-X"
   }
 });

```

## Usage

To track a page inside a viewmodel use a Page Decorator.

```typescript
@Page()
class MyViewModel extends ObservableViewModel<MyModel> {
}
```

To track an event inside a command use an Event Decorator.

```typescript
@Event("myCategory")
export class MyCommand {
    
}
```

### Custom Analytics Provider

By default the module implements a Google Analytics Provider.
If you need a different Analytics Provider you can implement your own IAnalyticsProvider and register it.   

```typescript
class MyAnalyticsProvider implements IAnalyticsProvider {
    forPage(path: string){
        
    }

    forEvent(event: Object){
        
    }

    forEventWith(category: string, action: string, label: string, value: any){
        
    }

    initialize(){
        
    }
}

container.bind<IAnalyticsProvider>("IAnalyticsProvider").to(MyAnalyticsProvider).inSingletonScope();
```

## License

Copyright 2016 Tierra SpA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.