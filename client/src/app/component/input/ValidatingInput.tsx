import * as React from 'react';
import { observer } from 'mobx-react';
import { badInputCSS, badLabelCSS, goodCSS, styled } from '../../../themes/default';
import { observable } from 'mobx';
import * as classNames from 'classnames';

interface Props {
  placeholder: string;
  listener: (e: any) => void;
  id: string;
  validator?: boolean;
  value?: string | null;
  label?: string;
  errorMessage?: string;
  defaultValue?: string;
  type?: string;
  onlyValidateOnExit?: boolean;
  className?: string;
  tabIndex?: number;
  badStyle?: any;
  reference?: any;
  keyDown?: (e: any) => void;
}

@observer
export class ValidatingInput extends React.Component<Props> {
  @observable private exited: boolean = false;

  shouldDisplayValidation(): boolean {
    if (
      !this.props.onlyValidateOnExit
      && !this.props.validator
    ) {
      return true;
    } else if (
      this.props.onlyValidateOnExit
      && this.exited
      && !this.props.validator
    ) {
      return true;
    }
    return false;
  }

  validateInput() {
    return this.shouldDisplayValidation()
      ? this.props.badStyle || badInputCSS
      : goodCSS;
  }

  validateLabel() {
    return this.shouldDisplayValidation()
      ? badLabelCSS
      : goodCSS;
  }

  renderErrorMessage() {
    if (this.shouldDisplayValidation()) {
      return (
        <div className="errorMessage">
          {this.props.errorMessage}
        </div>
      );
    } else {
      return (
        <div className={'spacerWithoutErrorMessage'}/>
      );
    }
  }

  render() {
    return (
      <div className={classNames(this.props.className, 'validatingInput')}>
        {
          this.props.label &&
            <label
              className={'validatingInputLabel'}
              style={this.validateLabel()}
            >
              {this.props.label}
            </label>
        }
        <input
          id={this.props.id}
          type={this.props.type ? this.props.type : 'text'}
          placeholder={this.props.placeholder}
          onChange={this.props.listener}
          style={this.validateInput()}
          defaultValue={this.props.defaultValue}
          value={this.props.value ? this.props.value : ''}
          onBlur={() => this.exited = true}
          onFocus={() => this.exited = false}
          tabIndex={this.props.tabIndex ? this.props.tabIndex : 0}
          ref={this.props.reference}
          onKeyDown={this.props.keyDown}
        />
        {this.renderErrorMessage()}
      </div>
    );
  }
}

export const
  StyledValidatingInput = styled(ValidatingInput)`
  display: flex;
  flex-direction: column;
  align-items: start;
  font-family: ${(props) => props.theme.labelFontFamily};
  
  label {
    color: #fff;
    margin-bottom: 8px;
  }
  
  input::placeholder {
    font-size: 16px;
  }
  
  input {
    box-sizing: border-box;
    padding-left: 16px;
    width: 100%;
    color: #eaf3ff;
    background-color:rgba(0, 0, 0, 0);
    height: 38px;
    border: 1px solid #cccccc;
    border-radius: 4px;    
  }
  
  input:focus {
    background-color:rgba(0, 0, 0, 0);
    color: #fff;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(21, 222, 236);
  }
  
  .errorMessage, .spacerWithoutErrorMessage {
    height: 16px;
    color: #e46373;
  }
`;