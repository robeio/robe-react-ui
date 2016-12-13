## Robe React Store Architech


### BaseStore

#### BaseStore.register(component)

* Bir **Component** **Store**'a register edileceği zaman `store.register(component)` methodu çağrılır.
* StoreComponent extend etmiş tüm componentler co`componentDidMount()`
* Register işleminden sonra `Component` triggerChange methodu çağrılarak store değişikliği component'e bildirilir.  

#### BaseStore.unRegister(component)
	* Bir `Component` `Store`'dan çıkarılacağı zaman `unRegister` işlemi kullanılır.
