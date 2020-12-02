import { action, computed, observable } from 'mobx';

export class CarouselStore {
  @observable private _isVisible: boolean = false;
  @observable private _activeItemIndex: number = 0;
  @observable private _animating: string = '';
  @observable private _itemCount: number = 0;

  @computed
  get isVisible() {
    return this._isVisible;
  }

  @computed
  get activeItemIndex(): number {
    return this._activeItemIndex;
  }

  @computed
  get itemCount(): number {
    return this._itemCount;
  }

  @computed
  get animating(): string {
    return this._animating;
  }

  setItemCount(count: number) {
    this._itemCount = count;
  }

  @action.bound
  setActiveItemIndex(index: number) {
    this._activeItemIndex = index;
  }

  @action.bound
  setVisibility(isVisible: boolean) {
    this._isVisible = isVisible;
  }

  @action.bound
  setAnimating(value: string) {
    this._animating = value;
  }

  @action.bound
  increaseActiveIndex() {
    if (this._activeItemIndex === this._itemCount - 1) {
      this._activeItemIndex = 0;
    } else {
      this._activeItemIndex++;
    }
  }

  @action.bound
  decreaseActiveIndex() {
    if (this.activeItemIndex === 0) {
      this._activeItemIndex = this._itemCount - 1;
    } else {
      this._activeItemIndex--;
    }
  }

  @action.bound
  decreaseItemCount() {
    this.setItemCount(this._itemCount - 1);
  }

  @computed
  get nextActiveIndex(): number {
    if (this._activeItemIndex === this._itemCount - 1) {
      return 0;
    } else {
      return this._activeItemIndex + 1;
    }
  }

  @computed
  get previousActiveIndex(): number {
    if (this.activeItemIndex === 0) {
      return this._itemCount - 1;
    } else {
      return this._activeItemIndex - 1;
    }
  }
}