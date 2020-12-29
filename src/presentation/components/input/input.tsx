import React, { useContext } from 'react'
import Styles from './input-styles.scss'
import FormContext from '@/presentation/context/form-context/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(FormContext)
  const error = state[`${props.name}Error`]

  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const getStatus = (): string => {
    return error ? '❌' : '✅'
  }

  const getTitle = (): string => {
    return error || 'Tudo certo!'
  }

  return (
    <>
      <div className={Styles.inputWrap}>
        <input data-testid={props.name} { ...props } readOnly onFocus={enableInput} onChange={handleChange} />
        <span data-testid={`${props.name}-status`} className={Styles.status} title={getTitle()}>{getStatus()}</span>
      </div>
    </>
  )
}

export default Input
