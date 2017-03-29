import { trigger, state, animate, transition, style } from '@angular/animations';

export const shrinkInOut = trigger('shrinkInOut', [
    state('in', style({ height: '*' })),
    transition(':enter', [
        style({ height: 0 }),
        animate(250, style({ height: '*' }))
    ]),
    transition(':leave', [
        style({ height: '*' }),
        animate(250, style({ height: 0 }))
    ])
]);