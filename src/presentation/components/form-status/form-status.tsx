import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import { Spinner } from '@/presentation/components'
import FormContext from '@/presentation/context/form-context/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const FormStatus: React.FC<Props> = (props: Props) => {
  const { isLoading, errorMessage } = useContext(FormContext)
  return (
    <>
      <div data-testid="error-wrap" className={Styles.errorWrap}>
        { isLoading && <Spinner className={Styles.spinner} />}
        { errorMessage && <span className={Styles.error}>{errorMessage}</span>}
      </div>
    </>
  )
}

export default FormStatus
