import * as React from 'react';
import { observer } from 'mobx-react';
import { DropdownOption, StyledDropdown } from './Dropdown';
import * as classNames from 'classnames';
import { styled } from '../../../themes/default';

interface Props {
  label: string;
  message: string;
  className?: string;
}

@observer
export class StaticMessageDropdown extends React.Component<Props> {
  render() {
    return (
      <StyledDropdown
        className={classNames('staticMessageDropdown', this.props.className)}
        callback={() => {
          return;
        }}
        defaultValue={this.props.label}
        options={[new DropdownOption('', this.props.message)]}
        value={''}
      />
    );
  }
}

export const StyledStaticMessageDropdown = styled(StaticMessageDropdown)`
  li {
    height: auto;
    padding: 12px 10px;
    line-height: 1.1rem;
    
    :hover, :active, :focus-within {
      background-color: inherit !important;
      color: ${(props) => props.theme.color.blueGrey} !important;
    }
  }
  
  .dropdown-item {
    color: ${(props) => props.theme.color.blueGrey};
    font-family: ${(props) => props.theme.labelFontFamily};
    font-style: italic;
    letter-spacing: 0.57px;
    text-align: center;
    font-size: 16px !important;
    white-space: normal;
    
    :hover, :active, :focus {
      font-weight: inherit !important;
      color: inherit !important;
      background-color: inherit !important;
    }
  }
`;