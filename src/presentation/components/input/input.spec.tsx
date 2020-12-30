import React from 'react'
import { render } from '@testing-library/react'
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
})
