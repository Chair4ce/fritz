import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { UploadStore } from '../form/upload/UploadStore';
import { styled } from '../../../themes/default';

interface Props {
  uploadStore?: UploadStore;
  className?: string;
}

@observer
export class ProgressBar extends React.Component<Props> {

  css = {
    width: '0%',
  };

  componentDidMount() {
    let interval = setInterval(
      () => {
        let percent = this.props.uploadStore!.PercentConverted;
        let status = this.props.uploadStore!.processing;
        let ele = document.getElementById('progressBar') as HTMLElement;
        if (ele) {
          ele.style.width = percent + '%';
          ele.setAttribute('aria-valuenow', percent.toString());
        }
        if (status === false || !ele) {
          clearInterval(interval);
        }
      },
      100);
  }

  render() {
    return (
      <div
        className={this.props.className}
      >
        <div
          className="progress shadow"
        >
          <div
            id="progressBar"
            className="progress-bar bg-info"
            role="progressbar"
            style={this.css}
            aria-valuenow={0}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    );
  }
}

export const StyledProgressBar = inject('uploadStore')(styled(ProgressBar)`
  width: 75%;
  height: 19px;

  #status {
    color: ${(props) => props.theme.color.default};
    width: 100%;
  }
`);
