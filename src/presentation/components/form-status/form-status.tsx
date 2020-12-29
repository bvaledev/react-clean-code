import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import { Spinner } from '@/presentation/components'
import FormContext from '@/presentation/context/form-context/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const FormStatus: React.FC<Props> = (props: Props) => {
  const { state } = useContext(FormContext)
  const { isLoading, mainError } = state
  return (
    <>
      <div data-testid="error-wrap" className={Styles.errorWrap}>
        { isLoading && <Spinner className={Styles.spinner} />}
        { mainError && <span className={Styles.error}>{mainError}</span>}
      </div>
    </>
  )
}

export default FormStatus
