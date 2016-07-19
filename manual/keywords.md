## keywords

#### types - PropTypes

* `number`:  `React.PropTypes.number` refer integer values
* `boolean`: `React.PropTypes.bool` refer boolean type
* `string`: `React.PropTypes.string` refer string type 
* `Date` : refer Date type
* `Map`: `React.PropTypes.object` json or object types which not include any function.
* `Array`: `React.PropTypes.array` refer Array types
* `any`: `React.PropTypes.any` // refer all tpyes

#### fieldNames

* `items`: array data
* `item`: Map object
* `key`: key of map object
* `value`: value of map object

#### props 

* `value`: React.PropTypes.any // selected value or values
* `style`: React.PropTypes.object // Style map for the component.
* `label`: React.PropTypes.string // Label for the form control.
* `items`: React.PropTypes.array // map array of options to render.
* `multi`: React.PropTypes.bool multi select value
* `valueField`: React.PropTypes.any // key of given map array `items`
* `textField`: React.PropTypes.string // presented text of give map array `items`
* `placeHolder`: React.PropTypes.string // displayed when there's no value
* `onChange`: React.PropTypes.func // callback function when selected values changed
* `onClick`: React.PropTypes.func // callback function when component clicked
* `validations`: React.PropTypes.object // Validations for the component
* `noResultsText`: React.PropTypes.string // presented message if any result not shown.
* `disabled`: React.PropTypes.bool // disabled
* `searchable`: React.PropTypes.bool // whether to enable searching feature or not