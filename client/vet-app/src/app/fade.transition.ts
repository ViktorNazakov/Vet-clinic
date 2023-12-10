import {
  TransitionOptions,
  createAnimation,
  getIonPageElement,
} from '@ionic/angular';

export function pageTransition(_: HTMLElement, opts: TransitionOptions) {
  const DURATION = 200;

  // root animation with common setup for the whole transition
  const rootTransition = createAnimation()
    .duration(opts.duration || DURATION)
    .easing('cubic-bezier(0.3,0,0.66,1)');

  // ensure that the entering page is visible from the start of the transition
  const enteringPage = createAnimation()
    .addElement(getIonPageElement(opts.enteringEl))
    .beforeRemoveClass('ion-page-invisible');
  const leavingPage = createAnimation().addElement(
    /**@ts-ignore */
    getIonPageElement(opts.leavingEl)
  );
  // create animation for the leaving page

  // actual customized animation
  if (opts.direction === 'forward') {
    leavingPage.fromTo('opacity', '1', '0.0');
    enteringPage.fromTo('opacity', '0.0', '1');
  } else {
    enteringPage.fromTo('opacity', '0.0', '1');
    leavingPage.fromTo('opacity', '1', '0.0');
  }

  // include animations for both pages into the root animation
  rootTransition.addAnimation(enteringPage);
  rootTransition.addAnimation(leavingPage);
  return rootTransition;
}
