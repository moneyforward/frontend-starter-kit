import { PureComponent } from 'react'

class FormErrorMessage extends PureComponent<{ message?: string; showError?: boolean }> {
  render() {
    const { message, showError } = this.props
    return showError && message && <div className="form-error-message">{message}</div>
  }
}

export default FormErrorMessage
