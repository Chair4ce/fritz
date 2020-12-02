import { configure } from '@storybook/react';
import 'bootstrap';

// automatically import all files ending in *.stories.js
const req = require.context(
  '../stories',
  true,
  /.stories.tsx$/
);
function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
