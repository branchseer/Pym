import { h, render } from 'preact';
import './lib/fix-pmc';
import './style';
import App from './components/App';

const { platform, asyncNode, messageUI } = window.deskgap;

document.body.classList.add(`platform-${platform}`);

(async () => {
  const nodeDeskgap = await asyncNode.require('deskgap');

  messageUI.on('dark-mode-toggled', (e, inDarkMode) => {
    document.body.classList.toggle('dark', inDarkMode);
  });

  document.body.classList.toggle(
    'dark',
    await nodeDeskgap.prop('systemPreferences').invoke('isDarkMode').value(),
  );

})();

// Find the outermost Element in our server-rendered HTML structure.
let root = document.getElementById('app_root') as Element;

// "attach" the client-side rendering to it, updating the DOM in-place instead of replacing:
root = render(<App />, document.body, root);
root.setAttribute('id', 'app_root');

if (process.env.NODE_ENV !== 'production') {
  // Enable support for React DevTools and some helpful console warnings:
  require('preact/debug');

  // When an update to any module is received, re-import the app and trigger a full re-render:
  module.hot.accept('./components/App', () => {
    // The linter doesn't like the capital A in App. It is wrong.
    // tslint:disable-next-line variable-name
    import('./components/App').then(({ default: App }) => {
      root = render(<App />, document.body, root);
    });
  });
}
