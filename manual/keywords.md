## keywords

#### types - PropTypes

* `number`:  `PropTypes.number` refer integer values
* `boolean`: `PropTypes.bool` refer boolean type
* `string`: `PropTypes.string` refer string type 
* `Date` : refer Date type
* `Map`: `PropTypes.object` json or object types which not include any function.
* `Array`: `PropTypes.array` refer Array types
* `any`: `PropTypes.any` // refer all tpyes

#### fieldNames

* `items`: array data
* `item`: Map object
* `key`: key of map object
* `value`: value of map object

#### props 

* `value`: PropTypes.any // selected value or values
* `style`: PropTypes.object // Style map for the component.
* `label`: PropTypes.string // Label for the form control.
* `items`: PropTypes.array // map array of options to render.
* `multi`: PropTypes.bool multi select value
* `valueField`: PropTypes.any // key of given map array `items`
* `textField`: PropTypes.string // presented text of give map array `items`
* `placeHolder`: PropTypes.string // displayed when there's no value
* `onChange`: PropTypes.func // callback function when selected values changed
* `onClick`: PropTypes.func // callback function when component clicked
* `validations`: PropTypes.object // Validations for the component
* `noResultsText`: PropTypes.string // presented message if any result not shown.
* `disabled`: PropTypes.bool // disabled
* `searchable`: PropTypes.bool // whether to enable searching feature or not