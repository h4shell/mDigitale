/* eslint-disable no-unused-vars */

function createInput({name, type, status, parent, value, disabled}){

    const inputWrapper = document.createElement('div')
    inputWrapper.classList.add('input-wrapper')
    parent.appendChild(inputWrapper)


    const input = document.createElement('input')
    const label = document.createElement('label')

    if(value !== undefined){
        input.value = 'default'
    }

    if(disabled == true){
        input.setAttribute('disabled', true)
    }

    label.setAttribute('for', name)
    label.textContent = name

    input.type = type
    input.name = name
    input.setAttribute(status, true)

    
    parent.appendChild(label)
    parent.appendChild(input)
}