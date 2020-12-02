import { CSSProperties } from 'react';
import baseStyled, { ThemedStyledInterface } from 'styled-components';

export const theme = {
  fontFamily: 'Roboto, Arial, Helvetica, sans-serif, Helvetica Neue',
  fontWeight: '300',
  fontSize: '16px',
  fontColor: '#fff',
  background: 'linear-gradient(360deg,#1E222A 0%,#39414E 100%)',
  inputHeight: '38px',
  labelFontFamily: 'Helvetica Neue',
  labelMarginBottom: '8px',
  backgroundTranslucentGray: 'rgba(43, 48, 60, 0.557886)',
  color: {
    default: '#fff',
    beige: '#fbfbfb',
    paleGray: '#eaf3ff',
    silver: '#d4d6db',
    lightGreyBlue: '#88a6d6',
    blueGrey: '#6c7f9c',
    slate: '#5C667D',
    lightningBlue: '#15deec',
    teal: '#00818c',
    blackTea: '#191e2a',
    deepPurple: '#151524',
  }
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;

export const badLabelCSS: CSSProperties = {
  color: '#e46373'
};

export const badInputCSS: CSSProperties = {
  border: '1px solid #e46373'
};

export const goodCSS: CSSProperties = {};

export const badCallsignCSS: CSSProperties = {
  border: '1px solid #ae4754',
  borderRadius: '7px'
};

export const badReleasabilityCSS: CSSProperties = {
  borderWidth: '1px 1px 1px 0',
  borderRadius: '0 4px 4px 0',
  borderStyle: 'solid',
  borderColor: '#ae4754'
};

export const badClassificationCSS: CSSProperties = {
  borderWidth: '1px 0px 1px 1px',
  borderRadius: '4px 0 0 4px',
  borderStyle: 'solid',
  borderColor: '#ae4754'
};