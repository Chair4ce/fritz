import * as React from 'react';
import { observer } from 'mobx-react';
import { styled } from '../../../themes/default';

interface Props {
  classification?: string;
  className?: string;
}

@observer
export class ClassificationBanner extends React.Component<Props> {
  renderCss() {
    let css;
    switch (this.props.classification) {
      default: {
        css = {
          color: 'white',
          background: 'green'
        };
        return css;
        break;
      }
      case 'DYNAMIC CLASSIFICATION UP TO SECRET//NOFORN': {
        css = {
          color: 'white',
          background: 'red'
        };
        return css;
        break;
      }
      case 'DYNAMIC CLASSIFICATION UP TO TOP SECRET//SI/TK//NOFORN': {
        css = {
          color: 'black',
          background: 'yellow'
        };
        return css;
        break;
      }
    }
  }

  render() {
    return (
      <div
        className={this.props.className}
        style={this.renderCss()}
      >
        {this.props.classification}
      </div>
    );
  }
}

export const StyledClassificationBanner = styled(ClassificationBanner)`
  text-align: center;
  font-weight: bold;
  font-size: 11px;
`;