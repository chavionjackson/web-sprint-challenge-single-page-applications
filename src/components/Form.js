import React, { useState } from 'react';
import axios from 'axios';
import Pizza from './Neworder';
import * as yup from 'yup';
import Schema from './Schema';


const initialFormValues = {
    name: '',
    phone: '',
    textarea:'',
    size: '',
    sauce: '',
    pepperoni: false,
    sausage: false,
    jalepenos: false,
    greenPeppers: false,
    mushrooms: false,
    pineapple: false,
}

const initialFormErrors = {
    name: '',
    email: '',
    tetxtarea: '',
    phone: ''
}

function Form() {
    const [formValues, setFormValues]=useState(initialFormValues)
    const [formErrors, setFormErrors]=useState(initialFormErrors)
    const [newOrder, setNewOrder] = useState(initialFormValues)

    const postNewOrder = (newOrder) => {
        axios.post('https://reqres.in/api/user', newOrder)
        .then((res) => {
            console.log(res.data)
            setNewOrder(newOrder)
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        postNewOrder(formValues)
    };

    const onChange = (event) => {
        const { name, value, type, checked } = event.target;
        const valueToUse = type === 'checkbox' ? checked : value;
        inputChange(name, valueToUse);
    };

    const inputChange = (name, value) =>{
        yup
            .reach(Schema, name)
            .validate(value)
            .then(() => {
              setFormErrors({
                ...formErrors,
                [name]: "",
              })})
              .catch((err) => {
                setFormErrors({
                  ...formErrors,
                  [name]: err.errors[0],
                })});
           setFormValues({
            ...formValues,
            [name]: value, 
          });
        };

    return (
        <form id='pizza-form' onSubmit={onSubmit}>
        <div>
            <h5>Build A Pizza</h5>

            <label>Name
                <input value={formValues.name}
                       onChange={onChange}
                       id='name-input'
                       name='name'
                       type='text' />
            </label>

            <label>Email 
                <input value={formValues.email}
                       onChange={onChange}
                       name='email'
                       type='email' />
            </label>

            <label>Phone Number 
                <input value={formValues.phone}
                       onChange={onChange}
                       name='phone'
                       type='text' />
            </label>

            <label>
                <select id='size-dropdown' name='size' value={formValues.size} onChange={onChange}>
                    <option>--Select a size--</option>
                    <option value="xl">Extra Large</option> 
                    <option value="lg">Large</option>
                    <option value="med">Medium</option>
                    <option value="small">Small</option>
                    <option value='pan'>Personal Pan</option>
                </select>
            </label>

            <h2>Sauce it up</h2>
            <h4>Required</h4>

            <label>Red Sauce
                <input type='radio' name='sauce'
                       value='red' checked={formValues.sauce === 'red'}
                       onChange={onChange} />
            </label>

            <label>Garlic Ranch
                <input type="radio" name="sauce"
                       value="gr" checked={formValues.sauce === "gr"}
                       onChange={onChange} />
            </label>

            <label>Bbq Sauce
                <input type="radio" name="sauce"
                       value="bbq" checked={formValues.sauce === "bbq"}
                       onChange={onChange} />
            </label>

            <label>Alfredo
                <input type="radio" name="sauce"
                       value="af" checked={formValues.sauce === "af"}
                       onChange={onChange} />
            </label>

            <h2>Add Toppings</h2>
            <h4>Choose up to 6</h4>

            <div>
            <label>Pepperoni
                <input type='checkbox' name='pepperoni'
                       checked={formValues.pepperoni} 
                       onChange={onChange} />
            </label>

            <label>Sausage
                <input type='checkbox' name='sausage'
                       checked={formValues.sausage} 
                       onChange={onChange} />
            </label>

            <label>Jalepenos
                <input type='checkbox' name='jalepenos'
                       checked={formValues.jalepenos} 
                       onChange={onChange} />
            </label>

            <label>Green Peppers
                <input type='checkbox' name='greenPeppers'
                       checked={formValues.greenPeppers} 
                       onChange={onChange} />
            </label>

            <label>Mushrooms
                <input type='checkbox' name='mushrooms'
                       checked={formValues.mushrooms} 
                       onChange={onChange} />
            </label>

            <label>Pineapple
                <input type='checkbox' name='pineapple'
                       checked={formValues.pineapple}
                       onChange={onChange} />
            </label>
            </div>

            <h2>Special Instructions</h2>
                <textarea name='textarea' value={formValues.textarea}
                          onChange={onChange} id='special-text'
                          placeholder="Anything else you'd like to add?" rows ="4" cols="50"/>
            <div>
            <button id='order-button' onClick={(event) =>
                    event.preventDefault}>Add to order
            </button>
            </div>
            <Pizza newOrder={newOrder} />
            </div>
        </form>
    )
}

export default Form;