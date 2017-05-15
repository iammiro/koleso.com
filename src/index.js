import initMap from './globals/map'
import timer from './globals/commons'
import './blocks/index.sass';
import {TweenMax, Power2, TimelineLite} from "gsap";
require('offline-plugin/runtime').install();
window.initMap = initMap;
timer();