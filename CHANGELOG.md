# Change Log
## 1.1.2 - Developing
* DateInput now supports long & formatted string.
* changed name of *__validate** method as *validate* in **ValidationsComponent** to be callable as public method. 
* added validate method to all Input Components classes that are exist under the in **inputs/** folder.
* Locations of folders changed;
    * /samples to  /components/samples
    * /docs  to  /components/jsons
    * New site/docs folder now includes detailed documentation (Validation, Model, etc.) 
* DataGrid row css changed.
* Filter ComponentManager bug fixed.
* Now DateInput addon click triggers popup
* validationDisplay example added to ValidationSample
* FaIcon (fontawssome)
    * Assets deleted. Now we are taking icons from npm.
    * Sample page updated.
* React-Bootstrap link added to the showcase's navbar.

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