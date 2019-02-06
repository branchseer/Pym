import { h, Component } from 'preact';

import { bind, linkRef, Fileish } from '../../lib/initial-util';
import '../custom-els/LoadingSpinner';

import logo from './imgs/logo.svg';
import * as style from './style.scss';
import SnackBarElement from '../../lib/SnackBar';

const { platform } = window.deskgap;

interface Props {
  onFile: (file: File | Fileish) => void;
  showSnack: SnackBarElement['showSnackbar'];
}
interface State {
  fetchingDemoIndex?: number;
}

export default class Intro extends Component<Props, State> {
  state: State = {};
  private fileInput?: HTMLInputElement;

  @bind
  private onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;
    this.props.onFile(file);
  }

  @bind
  private onButtonClick() {
    this.fileInput!.click();
  }

  render({ }: Props, { fetchingDemoIndex }: State) {
    return (
      <div class={style.intro} data-deskgap-drag>
        {
          platform === 'darwin' ?
          <h1 class={style.title}>Pym</h1>
          : null
        }
        <img src={logo} class={style.logo} alt="Squoosh" decoding="async" />
        <p class={style.openImageGuide}>
          Drag &amp; drop or{' '}
          <button
            data-deskgap-no-drag
            class={style.selectButton}
            onClick={this.onButtonClick}
          >
            select an image
          </button>
          <input
            class={style.hide}
            ref={linkRef(this, 'fileInput')}
            type="file"
            onChange={this.onFileChange}
          />
        </p>
      </div>
    );
  }
}
