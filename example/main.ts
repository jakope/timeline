/*
 * @Author: thelostword
 * @Date: 2022-11-14 16:54:04
 * @LastEditors: thelostword
 * @LastEditTime: 2022-11-14 16:56:25
 * @FilePath: \timeline\example\main.ts
 */
import MoeTimeline from '../src/main';

const timeline = new MoeTimeline('timeline', {
  fill: true,
  //width: 1000,
  height: 60,
  // bgColor: 'rgba(0,0,0,0.5)',
  // textColor: '#000',
  // pointColor: '#000',
  // centerTimePointColor: '#000',
  // centerTimePointWidth: 5,
  scaleSpacing: 7,
  maxZoom: 7,
  minZoom: 2,
  zoom: 2,
});

timeline.draw({
  currentTime: 0,
  areas: [{
    startTime: 0,
    endTime: 100,
    // bgColor: '#00AEEC'
  }]
});

// setInterval(() => {
//   timeline.draw()
// }, 1000);

timeline.on('timeUpdate', (e: number) => {
  console.log(e, 'currentTime change');
})

console.log(timeline);
