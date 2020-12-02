import * as React from 'react';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { InjectedRoutes } from './Routes';
import { StyledHeader } from './component/header/Header';
import styled, { ThemeProvider } from 'styled-components';
import * as classNames from 'classnames';
import { theme } from '../themes/default';

export const WrappedRoutes = withRouter((InjectedRoutes as any));

interface Prop {
  className?: string;
}

@observer
export class App extends React.Component<Prop> {

  css = {
    height: 'auto',
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className={classNames('ParentAppBody', this.props.className)}>
          <div className="ParentHeader" style={{height: 80}}>
            <StyledHeader/>
          </div>
          <div className="ParentWrappedRoutes" style={this.css}>
            <WrappedRoutes/>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export const InjectedApp = styled(App)`
  display: flex;
  flex-flow: column;
  height: 100%;
  * {
    box-sizing: border-box;
    font-family: "Helvetica Neue", sans-serif;
  }
    
  .ParentWrappedRoutes {
    flex: 1 1 auto;
    display: flex;
    flex-flow: column;
    overflow-y: auto;
    align-items: center;
  }
`;
