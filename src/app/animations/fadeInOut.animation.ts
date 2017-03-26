import { trigger, state, animate, transition, style } from '@angular/core';

export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [
        style({ opacity: 0}),
        animate('300ms ease-in-out', style({ opacity: 1 }))
    ]),
    transition(':leave', [
        animate('300ms ease-in-out', style({ opacity: 0 }))
    ])
]);