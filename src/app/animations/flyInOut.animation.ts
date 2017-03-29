import { trigger, state, style, transition, animate } from '@angular/animations';
export const flyInOut = trigger('flyInOut', [
    state('*', style({ transform: 'translateX(0)' })),
    transition(':enter', [
        style({
        transform: 'translateX(-100%)'
      }),
      animate('0.5s ease-in')
    ]),
    transition(':leave', [
        //after the element leaves, no styles will be applied, however the styles can be applied during the animation progress
        animate('0.5s 10 ease-out', style({
            transform: 'translateX(100%)'
        }))
    ])
]);