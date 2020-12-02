import * as React from 'react';
import { observer } from 'mobx-react';
import { StyledProgressBar } from '../../progressBar/ProgressBar';
import { styled } from '../../../../themes/default';
import * as classNames from 'classnames';

interface Props {
  className?: string;
}

const FritzLoadingLogo = require('../../../../icon/LoadingLogo.svg');

@observer
export class LoadingScreen extends React.Component<Props> {
  render() {
    return (
      <div className={classNames('loadingScreen', this.props.className)}>
        <div className={'loadingMessage'}>
          <span>One moment, Fritz is uploading and converting your mission storyboard...</span>
        </div>
        <div className={'loadingImage'}>
          <img src={FritzLoadingLogo}/>
        </div>
        <StyledProgressBar/>
      </div>
    );
  }
}

export const StyledLoadingScreen = styled(LoadingScreen)`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  align-items: center;
  justify-content: space-evenly;
  
  #progressBar {
    background-image: linear-gradient(to left, #15deec, #00818c);
  }

  .loadingMessage {
    text-align: center;
    font-size: 40px;
    font-weight: 300;
    font-family: ${(props) => props.theme.labelFontFamily};
    color: ${(props) => props.theme.color.default};
    font-stretch: normal;
    letter-spacing: normal;
  }

  .loadingImage {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  img {
    height: 75%;
  }
`;