/* eslint-disable no-unused-vars */

function createInput({name, type, status, parent, value, disabled}){

    const inputWrapper = document.createElement('div')
    inputWrapper.classList.add('input-wrapper')
    parent.appendChild(inputWrapper)


    const input = document.createElement('input')
    //const label = document.createElement('label')

    if(value !== undefined){
        input.value = 'default'
        
    }

    if(disabled == true){
        input.setAttribute('disabled', true)
    }

    input.placeholder = name

    //label.setAttribute('for', name)
    //label.textContent = name

    input.type = type
    input.name = name
    input.setAttribute(status, true)

    
    //inputWrapper.appendChild(label)
    inputWrapper.appendChild(input)
}