import { trigger, state, style, transition, animate } from '@angular/core';
export const flyInOut = trigger('flyInOut', [
    state('*', style({ opacity: 1, transform: 'translateX(0)' })),
    transition(':enter', [
        style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }),
      animate('0.4s ease-in')
    ]),
    transition(':leave', [
        //after the element leaves, no styles will be applied, however the styles can be applied during the animation progress
        animate('0.4s 10 ease-out', style({
            opacity: 0,
            transform: 'translateX(100%)'
        }))
    ])
]);