import * as React from 'react';
import { CSSProperties } from 'react';
import { observer } from 'mobx-react';
import * as classNames from 'classnames';
import { styled } from '../../../themes/default';

interface Props {
  options: DropdownOption[];
  callback: (s: any) => void;
  value: string;
  defaultValue: string;
  style?: CSSProperties;
  className?: string;
}

export class DropdownOption {
  constructor(
    public id: string,
    public display: string
  ) {
  }
}

@observer
export class Dropdown extends React.Component<Props> {
  optionSelect = (e: any, option: any) => {
    if (e) {
      e.preventDefault();
    }
    this.props.callback(option);
  };

  renderOptions() {
    return this.props.options ? this.props.options.map((option, i) => {
        return (
          <li key={i}>
            <button
              className={'dropdown-item'}
              onClick={(e: any) => {
                this.optionSelect(e, option);
              }}
            >
              {option.display}
            </button>
          </li>
        );
      })
      : <div/>;
  }

  render() {
    return (
      <div
        className={classNames(this.props.className, 'bootstrap-dropdown')}
        style={this.props.style}
      >
        <div className={'dropdown'}>
          <button
            id={'dropdownBtn'}
            className={'btn btn-primary dropdown-toggle'}
            type={'button'}
            data-toggle={'dropdown'}
          >
            <span
              className={classNames('li-label', (this.props.value ? '' : 'default'))}
            >
              {this.props.value ? this.props.value : this.props.defaultValue}
            </span>
            <span className={'caret'}/>
          </button>
          <ul className={'dropdown-menu'}>
            {this.renderOptions()}
          </ul>
        </div>
      </div>
    );
  }
}

export const StyledDropdown = styled(Dropdown)`
  font-family: ${(props) => props.theme.labelFontFamily};
  height: 44px;

  .dropdown {
    height: inherit;
    background-color: #151524;
    border-radius: 4px;
    cursor: pointer;
  }

  button {
    cursor: pointer;
    height: 100%;
    width:  100%;
    background-color: rgba(0, 0, 0, 0) !important;
    outline: none;
    border: none;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .default {
      opacity: 0.4;
    }
    
    span {
      color: #fff;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      
      :first-child {
        margin-right: 12px;
      }
    }
    
    ::after {
      margin: 0; 
    }
    
    :hover, :active, :focus {
      background-color: rgba(0, 0, 0, 0) !important;
    }
  }
  
  ul {
    text-align: center;
    width: calc(100% + 23px);
    border-radius: 4px;
    background: #151524;
    z-index: 125;
    font-weight: 300;
    min-width: unset;
    max-height: 189px;
    overflow-y: auto;
    
    ::-webkit-scrollbar {
      width: 10px;
    }
    
    /* Track */
    ::-webkit-scrollbar-track {
      display: none; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #5C667D; 
    }
    
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #5C667D; 
    }
  }
  
  li {
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.5s ease;
    height: 36px;
    color: #fff;


    :hover, :active, :focus-within {
      background-color: #2b303c;
    }

    .dropdown-item {
      font-size: 20px;
      letter-spacing: 0.7px;
      font-weight: 300;

      :hover, :active, :focus {
        font-weight: bold;
        color: #fff;
        background-color: #2b303c;
      }
    }
  }
`;