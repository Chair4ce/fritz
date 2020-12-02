import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Switch } from 'react-router';
import { StyledHomePage } from './page/HomePage';
import { StyledMetricsPage } from './page/MetricsPage';
import { HomePageStore } from './page/HomePageStore';
import { UnicornStore } from './component/unicorn/store/UnicornStore';
import { UploadStore } from './component/form/upload/UploadStore';
import { CarouselStore } from './component/carousel/CarouselStore';

interface Props {
  carouselStore?: CarouselStore;
  unicornStore?: UnicornStore;
  uploadStore?: UploadStore;
  className?: string;
}

@observer
export class Routes extends React.Component<Props> {
  render() {
    return (
      <Switch>
        <Route
          exact={true}
          path={'/'}
          render={() =>
            <StyledHomePage
              homePageStore={
                new HomePageStore(
                  this.props.carouselStore!,
                  this.props.unicornStore!,
                  this.props.uploadStore!
                )
              }
            />
          }
        />
        <Route path={'/metrics'} render={() => <StyledMetricsPage/>}/>
      </Switch>
    );
  }
}

export const InjectedRoutes = inject(
  'carouselStore',
  'unicornStore',
  'uploadStore',
)(Routes);