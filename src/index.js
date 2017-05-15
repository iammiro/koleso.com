import initMap from './globals/map'
import timer from './globals/commons'
import './blocks/index.sass';

require('offline-plugin/runtime').install();

window.initMap = initMap;

timer();