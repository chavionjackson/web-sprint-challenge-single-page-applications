import React from 'react';

const Pizza = (props) => {
    const { values, 
            submit, 
            change, 
            checkbox, 
            disabled, 
            errors } = props

    const onSubmit = evt => {
        evt.preventDefault()
        submit()
  }

    const onChange = evt => {
        const { name, value, type, checked } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value
        change(name, valueToUse)
  }

    return (
        <form onSubmit={onSubmit}>
            <div>
            <h1>Order Here!</h1>

            <button disabled={disabled} name='order-button'>Place Order</button>

            <div>
                <div>{errors.name}</div>
                <div>{errors.size}</div>
            </div>

                <h2>Order Form</h2>
            <label>Name:    
                <input 
                value={values.name}
                onChange={onChange}
                name='name'
                type='text'
                />
            </label>

            <label>Pizza Size:       
                <select 
                onChange={onchange}
                value={values.size}
                name='size-dropdown'
                >
                    <option value=''>- Select an option -</option>
                    <option value='8inch'>8 inch</option>
                    <option value='12inch'>12 inch</option>
                    <option value='16inch'>16 inch</option>
                </select>
            </label>
                
                <h3>Toppings:</h3>

            <label>Pepperoni     
                <input
                type='checkbox'
                name='pepperoni'
                checked={values.pepperoni}
                onchange={checkbox}
                />
            </label>

            <label>Sausage    
                <input
                type='checkbox'
                name='sausage'
                checked={values.sausage}
                onChange={checkbox}
                />
            </label>

            <label>Onions     
                <input
                type='checkbox'
                name='onions'
                checked={values.onions}
                onChange={checkbox}
                />
            </label>

            <label>Olives    
                <input
                type='checkbox'
                name='olives'
                checked={values.olives}
                onChange={checkbox}
                />
            </label>

            <label>Peppers     
                <input
                type='checkbox'
                name='peppers'
                checked={values.peppers}
                onChange={checkbox}
                />
            </label>

                <h3>Any more info for us?</h3>

            <label>Special Instructions:    
                <input 
                value={values.instructions}
                onchange={onChange}
                name='special-text'
                type='text'
                />
            </label>
        </div>
        </form>
    )
}

export default Pizza;