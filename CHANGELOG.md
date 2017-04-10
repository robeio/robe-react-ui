# Change Log

## 1.1.37 -- Developing...

## 1.1.36
* downgraded version of react-router from 4.0.0 to 3.0.0.

## 1.1.35
* robe-react-commons version upgraded
* function type not supported in IE bug fixed
* function.name not supported in IE bug fixed

## 1.1.34
* robe-react-commons version upgraded

## 1.1.33
* Package files upgraded

## 1.1.32 
* searchbox listener removed at SearchBox component when component unmounted.
* added the disable property in select input
* added the disable property props in select input

## 1.1.31
* Fixed bug in SideMenu
* Comment added to methods in Toast

## 1.1.30
* removed retainless value from .babelrc
* added DisplayAsText to the field model of DataGrid.

## 1.1.29
* Listeners removed at Slider component when component unmounted.
* An error that caused the label to remain on the Slider component has been fixed.
* Menu tree support provided

## 1.1.28
* charts bug fixed.
* toast bug fixed.

## 1.1.27
* Bug fixed the Legend for Chart's components.
* Toast added icon and changed fonts.

## 1.1.26
* New prop "onAfterChange" added to Slider component.
* Rating style problem fixed at setState.

## 1.1.25
* New prop "unit" added to Slider component.
* Slider "resize" problem fixed.
* Slider now returns "event" in the onChange function.
* In PieChart, if the depth is greater than 1, the center round is added.

## 1.1.24
* Updating the datagrid when the props are updated.
* Slider component added.

## 1.1.23
* Rating component added.
* Changed test tools as mocha & electron-mocha.

## 1.1.22
* Wizard and Step bug fixed.
*
## 1.1.21
* Screen Keyboard component added.
* Wizard component redeveloped.
* changed version of webpack from 1 to 2 beta.
* changed all configuration by webpack 2 beta.
* PieChat bug fixed.
* Wizard bug fixed.

## 1.1.20
* Chart and Toast components test rewrited, Charts props updated.
* Chart bug fixed.
* [#51](https://github.com/robeio/robe-react-ui/issues/51) fixed.
* [#57](https://github.com/robeio/robe-react-ui/issues/57) fixed.
* [#55](https://github.com/robeio/robe-react-ui/issues/55) fixed.

## 1.1.19
* Code preview for the HtmlEditor.
* Toast
    - Refactored
    - Now supports multi-line #45
* TextInput onChange-focus bug fixed.
* Toast close on click
* DataForm 1 field enter reload bug fixed.
* Added new SelectInput component
* An error fixed in the name of the prop in the sample code at ReCaptcha.
* LazyImage added.
* DateInput bugs fixed
* FileInput validation fixed.
* Delay for server requests in search and filtering at DataGrid Component. Search animation added.
* Countdown component added.
* Chart components added.
* [#54](https://github.com/robeio/robe-react-ui/issues/54) fixed.
* [#50](https://github.com/robeio/robe-react-ui/issues/50) fixed.
* [#46](https://github.com/robeio/robe-react-ui/issues/46) fixed.

## 1.1.18
* upgrade robe-react-commons library. 
    - fixed 'js-criteria' module not found problem in LocalEndPoint.js class.
* removed js-criteria from robe-react-ui ( Reason: js-criteria is defined in robe-react-commons library ) .

## 1.1.17
* Dependencies updated.
* Multi-lang changed. Now it can change default props on the fly. #38
* Application mounts &unmounts after language change. #38

## 1.1.16
* Added new Toast
* Navbar click bugs in the Showcase #36
* Showcase refresh bug fixed.0

## 1.1.15
* Showcase refresh bug fixed.0
* BaseInput now forwards bsSize property.
* FileUploadInput bugs fixed
* All components are using i18n now. #11
* Application component added as a wrapper component for all of the application and managing global settings (forex. language) #19
* robe-react.commons upgraded. #19

## 1.1.14
* string refs -> callback refs #29
* FileUploadInput bugs fixed

## 1.1.13
* FileUploadInput bugs fixed and design developed
* DateInput bugs fixed and FileUploadInput design developed

## 1.1.12
* fixed npmignore problems.

## 1.1.11
* changed  *upload* method of MultierImpl at server side.
* rewritten **inputs/upload/FileUploadInput** 
* added new **DragDropLayout** layout to use as Parent React Component.
* added new **EventLayout** layout to use as Parent React Component.
* added new **ThumbnailGroup** and **ThumbnailItem** layouts to use as Parent React Component.
* added **util/css/ClassName** utility class which provides some operations on classname attribute of DOM Element.
* added **util/css/Style** utility class which provides some operations on classname attribute of DOM Element.
* rewritten **util/FileManager** test because of **FileUploadInput** component changed.
* added **util/Files** which provides some operations about the "FILE".
* upgraded **robe-react-commons** library.
* fixed manuel upload of **FileUploadInput**
* fixed manuel delete of **FileUploadInput**
* fixed CSS module not found problem. changed path of CSS utils class as util/css
* DateInput bug fixed
* Progress sample modified for better experience
* upgraded dependencies. 
* removed some dependencies which defined in robe-react-commons project.
* Modal close bug fixed at DateInput
* Fixed drag leave animation of DragDropLayout problem.
* provided to drag and drop in DragDropLayout for all children.
* added Sample for DragDropLayout.


## 1.1.10
* DataGridSample is more compact and clear now.
* DatePicker bugs fixed.
* Button component added for issue #12.

## 1.1.8
* robe-react-commons updated
* Added Copy Button to Highlight
* update style in SelectInput
* Dependencies updated
* Sample Projects added to the showcase
* DateInput bugs fixed.

## 1.1.7
* robe-react-commons updated
* Bug fixed in DateInput

## 1.1.6
* Bug fixed in DateInput
* ReCaptcha component added.
* added **RadiusGroup** element
* added **ThumbnailGroup** and **ThumbnailItem**
* added **EventLayout** element.
* Bug fixed in CheckTree
* The Action Buttons style in DataGrid has been fixed
* GoogleMap component added.
* zoom prop added to GoogleMap sample
* Dependencies Updated.

## 1.1.5 
* was update RadioInput css.
* was update Tree style.
* chart api added.
* CheckTree bugs fixed.
    * textField, valueField, childrenValue props forwarding.
    * parent selection duplicate child state fixed.
* Added Single File Test Support & Test Debuging.
* Showcase url-state sync fixed.
* Auto increment feature added to DateInput
* Bug fixed in DateInput

## 1.1.4 
* fixed style in site
* DatePicker bug fixed.
* Dependencies updated.
* bug fix childrenField in CheckTree 

## 1.1.3
* change DataForm Sample
* fixed DataForm defaultValues problem.
* fixed DataForm Sample async change DataForm problem.
* CheckTree
    * 2 methods added getSelectedItems and getUnselectedItems
    * Parent click now modifies children state.
    * Reimplemented with Tree component.
    * Tests are modified.
* Tree component added. You can use with custom item renderers.

## 1.1.2
* Upgraded **robe-react-commons** library
* Changed DataForm and added Samples to **DataForm Sample**.
* DateInput now supports long & formatted string.
* changed name of *__validate** method as *validate* in **ValidationsComponent** to be callable as public method. 
* added validate method to all Input Components classes that are exist under the in **inputs/** folder.
* Locations of folders changed;
    * /samples to  /components/samples
    * /docs  to  /components/jsons
    * New site/docs folder now includes detailed documentation (Validation, Model, etc.) 
* DataGrid row css changed.
* Filter ComponentManager bug fixed.
* DateInput
    * Addon click triggers popup
    * field will not call props.onChange until the value is valid. 
* validationDisplay example added to ValidationSample
* FaIcon (fontawesome)
    * Assets deleted. Now we are taking icons from **npm**.
    * Sample page updated.
* React-Bootstrap link added to the showcase's navbar.
* All input field samples updated with better event handling (e.target.name)
* HtmlEditor css fixed. (corners rounded)
* Config Structure changed. 
* Added docs for Ajax Request.
* Added docs for Remote Endpoint.
* Added docs for Store.
* Was changed name  docs/samples/endpoint/RemoteEndPoint to docs/samples/endpoint/RemoteEndpoint

## 1.1.1
* fixed duplicate call onchange problem in **DataForm** .

## 1.1.0
- Validation has a new display option. **validationDisplay** property will take *"block"* or *"overlay"*  to decide how to show messages. All inputs refactored to work like that.
- DataForm and ModalDataForm will forward **validationDisplay** property to all fields defined inside.
- Tests and Showcase modified according to the new usage.


## 1.0.58
* Focus bug on input fields fixed.
* Validation bug on first key press fixed.
* Dependencies updated.

## 1.0.57
* ComponentManager structure changed.
* upgraded npm package.

## 1.0.56
* upgraded npm package.

## 1.0.53
* upgraded **robe-react-commons** library version from *1.0.61* to *1.0.62*

## 1.0.52
* Fixed null problem of Multi SelectInput
* Fixed changing the problem of DataFormSample's state. *render* method of DataFormSample will called after change state. 
* Changed priority of *propsOfFields* property of **DataForm**. After that, the *propsOfFields* property has priority over the *fields* property.
* Updared robe-react-common library version. 
* Changed source-map configuration of webpack for development mode. 

## 1.0.51
* npmignore updated.
* robe-react-commons version changed.
* version updated.