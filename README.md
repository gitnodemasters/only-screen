## Only For Screen Directive and Demo

This structural directive will show/hide element by screensize.

### Requirements
 
 In independent module implement directive `onlyForScreen` that renders element when width of the screen is in certain range. Browser width can change after application starts up.
 
 Service that tracks current browser width should receive configuration during initialization with threshold values (lowest value from which device starts).
 
 Example of usage:
 ```
 <span *onlyForScreen="'desktop'">shown on big screens</span>
 <span *onlyForScreen="'tablet'">shown on tablet screens</span>
 <span *onlyForScreen="'mobile'">shown on small screens</span>
 ```
 
 Please take performance into consideration (page can have hundreds of elements that use this directive).
 
 ```
 interface IConfig {
   mobile: number;
   tablet: number;
 }
 
 mobile: viewportWidth < config.mobile
 tablet: config.mobile <= viewportWidth < config.tablet
 desktop: config.tablet <= viewportWidth
 ```
 
 Submission should include sandbox app with usage examples of this directive.

### How to use?

* Import `OnlyForScreenModule.forRoot()` to targeted module
* You can pass some config values with module import
```
{
    mobile: number
    tablet: number
    debounce?: number
}
```
* Example
```
OnlyForScreenModule.forRoot({mobile: 300, tablet: 800, debounce: 100})
```

### Default config options
```
    mobile: 768 (px)
    tablet: 1366 (px)
    debounce: 40 (ms)
```

* `mobile` - Mobile screen width limit
* `tablet` - Tablet screen width limit
* `debounce` - Synchronization timer (performance) (optional) 
