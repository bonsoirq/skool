import { ChangeEvent, ChangeEventHandler, Component, FormEvent, ReactNode } from "react";
import { isNullish } from "../../util/function";
import { isEmptyObject, omit } from "../../util/object";

interface IProps<TValues> {
  initialValues: TValues,
  validations: Validations
  children: (values: RenderingValues) => ReactNode
}

type RenderingValues = {
  values: Values,
  errors: Errors,
  validate: () => Promise<void>,
  isValid: boolean,
  handleInputBlur: ChangeEventHandler<HTMLInputElement>,
  handleInputChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>,
  handleInputFocus: ChangeEventHandler<HTMLInputElement>,
  handleSubmit: (event: FormEvent, successHandler: () => void) => void,
  restoreInitialValues: () => void
  setValues: (updater: (prevValues: Values) => Values) => void
}

type ValidationResult = string | null

type Validations = {
  [key: string]: (value: any) => any
}

type Errors = {
  [key: string]: string
}

type Values = {
  [key: string]: any
}

interface IState {
  values: Values,
  validations: Validations,
  errors: Errors,
}

export class Form<TValues> extends Component<IProps<TValues>, IState> {
  state: IState = {
    values: { ...this.props.initialValues },
    validations: { ...this.props.validations },
    errors: {},
  }

  render () {
    const { values, errors } = this.state
    const {
      handleInputBlur,
      handleInputChange,
      handleInputFocus,
      validate,
      restoreInitialValues,
      handleSubmit,
      setValues,
    } = this
    return this.props.children({
      values: {...values},
      errors: {...errors},
      handleInputBlur,
      handleInputChange,
      handleInputFocus,
      handleSubmit,
      isValid: isEmptyObject(this.state.errors),
      validate,
      restoreInitialValues,
      setValues,
    })
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    this.setState(s => ({ values: { ...s.values, [name]: value } }))
  }

  handleInputFocus = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target
    this.setState(s => ({ errors: omit(s.errors, name) as Errors }))
  }

  handleInputBlur = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const error = await this._getError(name, value)
    if (error != null) {
      this.setState(s => ({
        errors: { ...s.errors, [name]: error },
      }))
    }
  }

  handleSubmit = async (e: FormEvent, onSuccess: () => void) => {
    e.preventDefault()
    await this.validate()
    if (await this.isValid()) {
      return onSuccess()
    }
  }

  private isValid = async () => isEmptyObject(await this._getErrors())

  validate = async () => {
    const errors = await this._getErrors()
    this.setState(() => ({ errors }))
  }
  restoreInitialValues = () => this.setState(() => ({ values: {...this.props.initialValues}}))

  setValues = (updater: (prevValues: Values) => Values) => {
    this.setState(s => ({ values: {...s.values, ...updater(s.values)}}), () => {
      this.validate()
    })
  }

  private _getErrors = async () => {
    const errors: Errors = {}
    for (const key of Object.keys(this.state.validations)) {
      const error = await this._getError(key, this.state.values[key])
      if (error != null) {
        errors[key] = error
      }
    }
    return errors
  }

  private _getError = async (name: string, value: any): Promise<ValidationResult> => {
    const { validations } = this.state
    const validationFunction = validations[name]
    if (isNullish(validationFunction)) return null
    const result = validationFunction(value)
    return await result
  }
}
