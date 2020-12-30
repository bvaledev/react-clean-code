import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import Input from './input'
import FormContext from '@/presentation/context/form-context/form-context'
describe('Input Component', () => {
  test('Should begin with readonly', () => {
    const { getByTestId } = render(
      <FormContext.Provider value={{ state: {} }}>
        <Input name="field" />
      </FormContext.Provider>
    )
    const input = getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })

  test('Should remove readonly on focus', () => {
    const { getByTestId } = render(
      <FormContext.Provider value={{ state: {} }}>
        <Input name="field" />
      </FormContext.Provider>
    )
    const input = getByTestId('field') as HTMLInputElement
    fireEvent.focus(input)
    expect(input.readOnly).toBe(false)
  })
})
