import * as React from 'react';
import { observer } from 'mobx-react';
import { styled } from '../../../../themes/default';

interface Props {
  className?: string;
}

@observer
export class UnicornMissionLoading extends React.Component<Props> {
  render() {
    return (
      <div className={this.props.className + ' loading'}>
        <div>Neigh, Neigh! UNICORN is on the way!</div>
        <div>
          <div className="spinner">
            <em/><em/><em/><em/><em/><em/><em/><em/><em/><em/><em/><em/>
          </div>
        </div>
      </div>
    );
  }
}

export const StyledUnicornMissionLoading = styled(UnicornMissionLoading)`

.loading {
    width: 650px;
    height: 150px;
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-family: "Helvetica Neue", sans-serif;
    font-weight: bold;
    font-size: 32px;
}


.spinner {
    right: 43%;
    top: 85px;
    position: relative;
    height: 80px;
    width: 80px;
    margin: -50px auto 0;
    animation: spin 1s steps(12, end) infinite;
}

.spinner:first-child {
    margin-right: 50px;
}

.spinner em {
    height: 20px;
    width: 6px;
    margin-left: -3px;
    display: block;
    transition: height 1s;
    position: absolute;
    left: 50%;
    transform-origin: center 40px;
    background: #15DEEC;
    box-shadow: 0 0 3px rgba(255, 255, 255, 0.7);
    border-radius: 3px;
}

.spinner:nth-child(2) i {
    height: 6px;
}

.spinner:hover em {
    height: 6px;
}

.spinner:hover:nth-child(2) em {
    height: 30px;
}

.spinner em:nth-child(1) {
    opacity: 0.08;
}

.spinner em:nth-child(2) {
    transform: rotate(30deg);
    opacity: 0.167;
}

.spinner em:nth-child(3) {
    transform: rotate(60deg);
    opacity: 0.25;
}

.spinner em:nth-child(4) {
    transform: rotate(90deg);
    opacity: 0.33;
}

.spinner em:nth-child(5) {
    transform: rotate(120deg);
    opacity: 0.4167;
}

.spinner em:nth-child(6) {
    transform: rotate(150deg);
    opacity: 0.5;
}

.spinner em:nth-child(7) {
    transform: rotate(180deg);
    opacity: 0.583;
}

.spinner em:nth-child(8) {
    transform: rotate(210deg);
    opacity: 0.67;
}

.spinner em:nth-child(9) {
    transform: rotate(240deg);
    opacity: 0.75;
}

.spinner em:nth-child(10) {
    transform: rotate(270deg);
    opacity: 0.833;
}

.spinner em:nth-child(11) {
    transform: rotate(300deg);
    opacity: 0.9167;
}

.spinner em:nth-child(12) {
    transform: rotate(330deg);
    opacity: 1;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;