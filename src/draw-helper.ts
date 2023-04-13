/*
 * @Author: losting
 * @Date: 2022-05-10 11:30:36
 * @LastEditTime: 2022-11-14 17:26:11
 * @LastEditors: thelostword
 * @Description: 
 * @FilePath: \timeline\src\draw-helper.ts
 */
import type { DrawHelperOption } from './type'
import { dateTime } from './utils/time';

export function drawHelper({
  pointWidth,
  timePerPixel,
  timeSpacing,
  screenScaleCount,
  scaleSpacing,
  scaleHeight,
  startTime,
  drawLine,
  drawText,
}: DrawHelperOption) {
  // 密度为1s时

  console.log("startTime",startTime);

  if (timeSpacing === 1) {
    for(let i = 0; i < screenScaleCount; i++) {
      const x = i * scaleSpacing + pointWidth / 2;
      const time = Math.ceil(startTime + i * timeSpacing);
      if(time <=0 ){
        continue;
      }
      // 10s刻度
      if (time % 10 === 0) {
        drawLine(x, scaleHeight.height5);
        drawText(x, scaleHeight.height5 + 13, `${dateTime(time, 'HH:mm:ss')}`);
        continue;
      }
      // 5s 刻度
      if (time % 5 === 0) {
        drawLine(x, scaleHeight.height3);
        continue;
      }
      // 1秒刻度
      if (time % 1 === 0) {
        drawLine(x, scaleHeight.height1);
        continue;
      }
    }
    return;
  }

  // 密度为10s时
  if (timeSpacing === 10) {
    const timeOffset: number = +dateTime(startTime, 's') % 10;
    const xOffset: number = timeOffset / timePerPixel;

    for(let i = 0; i < screenScaleCount; i++) {
      const x = i * scaleSpacing - xOffset - pointWidth / 2;
      const time = Math.ceil(startTime + i * timeSpacing - timeOffset);
      if(time <=0 ){
        continue;
      }
      // 1分钟刻度
      if (time % 60 === 0) {
        drawLine(x, scaleHeight.height4);
        drawText(x, scaleHeight.height5 + 13, `${dateTime(time, 'HH:mm')}`);
        continue;
      }
      // 10秒刻度
      if (time % 10 === 0) {
        drawLine(x, scaleHeight.height1);
        continue;
      }
    }
    return;
  }

  // 密度为30s时
  if (timeSpacing === 30) {
    const timeOffset: number = +dateTime(startTime, 's') % 30;
    const xOffset: number = timeOffset / timePerPixel;

    for(let i = 0; i < screenScaleCount; i++) {
      const x = i * scaleSpacing - xOffset - pointWidth / 2;
      const time = Math.ceil(startTime + i * timeSpacing - timeOffset);
      if(time <=0 ){
        continue;
      }
      // 5分钟刻度
      if (time % (60 * 5) === 0) {
        drawLine(x, scaleHeight.height4);
        drawText(x, scaleHeight.height5 + 13, `${dateTime(time, 'HH:mm')}`);
        continue;
      }
      // 30秒刻度
      if (time % 30 === 0) {
        drawLine(x, scaleHeight.height1);
        continue;
      }
    }
    return;
  }

  // 密度为1min时
  if (timeSpacing === 60) {
    const timeOffset: number = +dateTime(startTime, 's') % 60;
    const xOffset: number = timeOffset / timePerPixel;
    
    for(let i = 0; i < screenScaleCount; i++) {
      const x = i * scaleSpacing - xOffset - pointWidth / 2;
      const time = Math.ceil(startTime + i * timeSpacing - timeOffset);
      if(time <=0 ){
        continue;
      }
      // 小时刻度
      if (time % (60 * 60) === 0) {
        drawLine(x, scaleHeight.height5);
        drawText(x, scaleHeight.height5 + 13, `${dateTime(time)}`);
        continue;
      }
      // 5分钟刻度
      if (time % (60 * 5) === 0) {
        drawLine(x, scaleHeight.height3);
        if (time % (60 * 10) === 0) {
          drawText(x, scaleHeight.height5 + 13, `${dateTime(time, 'HH:mm')}`);
        }
        continue;
      }
      // 1分钟刻度
      if (time % 60 === 0) {
        drawLine(x, scaleHeight.height1);
        continue;
      }
    }
    return;
  }

  // 密度为2min时
  if (timeSpacing === 120) {
    const timeArr = dateTime(startTime, 'm:s').split(':');
    const timestamp = +timeArr[0] * 60 + +timeArr[1];
    const timeOffset: number = timestamp % 120;
    const xOffset: number = timeOffset / timePerPixel;

    for(let i = 0; i < screenScaleCount; i++) {
      const x = i * scaleSpacing - xOffset - pointWidth / 2;
      const time = Math.ceil(startTime + i * timeSpacing - timeOffset);
      if(time <=0 ){
        continue;
      }
      // 30分钟刻度
      if (time % (60 * 30) === 0) {
        drawLine(x, scaleHeight.height5);
        drawText(x, scaleHeight.height5 + 13, `${dateTime(time)}`);
        continue;
      }
      // 10分钟刻度
      if (time % (60 * 10) === 0) {
        drawLine(x, scaleHeight.height3);
        continue;
      }
      // 2分钟刻度
      if (time % (60 * 2) === 0) {
        drawLine(x, scaleHeight.height1);
        continue;
      }
    }
    return;
  }

  // 密度为5min时
  if (timeSpacing === 300) {
    const timeArr = dateTime(startTime, 'm:s').split(':');
    const timestamp = +timeArr[0] * 60 + +timeArr[1];
    const timeOffset: number = timestamp % 300;
    const xOffset: number = timeOffset / timePerPixel;

    for(let i = 0; i < screenScaleCount; i++) {
      const x = i * scaleSpacing - xOffset - pointWidth / 2;
      const time = Math.ceil(startTime + i * timeSpacing - timeOffset);
      if(time <=0 ){
        continue;
      }
      // 小时刻度
      if (time % (60 * 60) === 0) {
        drawLine(x, scaleHeight.height5);
        drawText(x, scaleHeight.height5 + 13, `${dateTime(time)}`);
        continue;
      }
      // 30分钟刻度
      if (time % (60 * 30) === 0) {
        drawLine(x, scaleHeight.height3);
        continue;
      }
      // 5分钟刻度
      if (time % (60 * 5) === 0) {
        drawLine(x, scaleHeight.height1);
        continue;
      }
    }
    return;
  }
  if (timeSpacing === 600) {
    const timeArr = dateTime(startTime, 'm:s').split(':');
    const timestamp = +timeArr[0] * 60 + +timeArr[1];
    const timeOffset: number = timestamp % 600;
    const xOffset: number = timeOffset / timePerPixel;

    for(let i = 0; i < screenScaleCount; i++) {
      const x = i * scaleSpacing - xOffset - pointWidth / 2;
      const time = Math.ceil(startTime + i * timeSpacing - timeOffset);
      if(time <=0 ){
        continue;
      }
      // 小时刻度
      if (time % (60 * 60) === 0) {
        drawLine(x, scaleHeight.height5);
        drawText(x, scaleHeight.height5 + 13, `${dateTime(time)}`);
        continue;
      }
      // 30分钟刻度
      if (time % (60 * 30) === 0) {
        drawLine(x, scaleHeight.height3);
        continue;
      }
      // 5分钟刻度
      if (time % (60 * 5) === 0) {
        drawLine(x, scaleHeight.height1);
        continue;
      }
    }
    return;
  }
}
