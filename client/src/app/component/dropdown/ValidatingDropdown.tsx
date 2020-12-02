import * as React from 'react';
import { observer } from 'mobx-react';
import { badLabelCSS, badReleasabilityCSS, goodCSS, styled } from '../../../themes/default';
import { DropdownOption, StyledDropdown } from './Dropdown';
import * as classNames from 'classnames';

interface Props {
  validator: boolean;
  options: DropdownOption[];
  defaultValue: string;
  value: string;
  callback: (s: any) => void;
  id?: string;
  label?: string;
  errorMessage?: string;
  className?: string;
}

@observer
export class ValidatingDropdown extends React.Component<Props> {
  render() {
    return (
      <div className={classNames(this.props.className, 'controlUnit')}>
        <label
          className="Label"
          style={
            this.props.validator
              ? goodCSS
              : badLabelCSS
          }
        >
          {this.props.label}
        </label>
        <StyledDropdown
          options={this.props.options}
          value={this.props.value}
          defaultValue={this.props.defaultValue}
          callback={this.props.callback}
          style={this.props.validator ? goodCSS : badReleasabilityCSS}
        />
        {
          !this.props.validator &&
          <div className="errorMessage">
            {this.props.errorMessage}
          </div>
        }
      </div>
    );
  }
}

export const StyledValidatingDropdown = styled(ValidatingDropdown)`
  width: 100%;
  display: block;

  label {
    width: 100%;
  }
 
 .errorMessage {
    position: absolute;
    color: #e46373;
  }
`;