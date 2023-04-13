/*
 * @Author: losting
 * @Date: 2022-04-01 16:05:12
 * @LastEditTime: 2022-11-14 17:19:27
 * @LastEditors: thelostword
 * @Description: 
 * @FilePath: \timeline\src\main.ts
 */

import type {
  Area,
  DrawArgs,
  ScaleHeight,
  TimeLineOption
} from './type';
import mitt from 'mitt';
import throttle from 'lodash.throttle';
import { dateTime } from './utils/time';
import { drawHelper } from './draw-helper';


// 默认配置
const defaultOptions = {
  fill:false,
  bgColor: 'rgba(0,0,0,0.5)',
  textColor: '#ffffff',
  scaleColor: '#ffffff',
  areaBgColor: '#ffffff55',
  pointColor: '#00aeec',
  pointWidth: 3,
  scaleSpacing: 7,
  fps: 30,
  zoom: 2,
  maxZoom: 8,
  minZoom: 1,
}

class TimeLine {
  $canvas: HTMLCanvasElement; // canvas 元素
  canvasContext: CanvasRenderingContext2D; // canvas context,

  #emitter: any;

  private currentTime: number; // 当前时间
  private areas?: Area; // 阴影区域

  #timeSpacingMap: number[]; // 5 10 30 60 120 300 取值范围
  #timeSpacing: number; // 5 10 30 60 120 300 取值范围
  scaleSpacing: number; // 刻度间距

  bgColor: string;

  // 刻度高度
  #scaleHeight: ScaleHeight;
  // 当前时间指针宽度
  pointWidth: number;
  // 当前指针颜色
  pointColor: string;
  // 文字颜色
  textColor: string;
  // 刻度颜色
  scaleColor: string;
  // 阴影区颜色
  areaBgColor: string;

  // 是否在拖拽中
  #isDraging: boolean;

  // fps
  fps: number;

 

  constructor(id: string, options: TimeLineOption) {
    if (!id) {
      throw new Error('canvas id is required!');
    }
    this.$canvas = document.getElementById(id) as HTMLCanvasElement;
    this.canvasContext = this.$canvas.getContext('2d') as CanvasRenderingContext2D;

    // 获取配置项
    const { fill, width, height, bgColor, textColor, scaleColor, areaBgColor, pointColor, pointWidth, scaleSpacing, fps, zoom, maxZoom, minZoom } = { ...defaultOptions, ...options };

    // 检查zoom参数是否合法
    if (zoom < minZoom || zoom > maxZoom || zoom % 1 !== 0) {
      throw new Error(`zoom must be minZoom ~ maxZoom(${minZoom} ~1 ${maxZoom}), and must be an integer`);
    }
    if (maxZoom < 1 || maxZoom > 7 || maxZoom % 1 !== 0) {
      throw new Error('maxZoom must be 1 ~ 7, and must be an integer');
    }
    if (minZoom < 1 || minZoom > 7 || minZoom % 1 !== 0) {
      throw new Error('minZoom must be 1 ~ 7, and must be an integer');
    }
    if (maxZoom < minZoom) {
      throw new Error('maxZoom must be greater than minZoom');
    }
    
    // 判断使用父元素宽高
    if (fill) {
      // 获取父元素
      const $canvasParent = this.$canvas.parentElement as HTMLElement;
      // 将canvas 宽高设为父元素宽高
      this.$canvas.width = $canvasParent.clientWidth;
      this.$canvas.height = $canvasParent.clientHeight;
      // resize observer
      const parentResizeObserver = new ResizeObserver(throttle(this._onParentResize.bind(this), 200));
      // 监听父元素resize
      parentResizeObserver.observe($canvasParent);
    } else {
      if (width) this.$canvas.width = width;
      if (height) this.$canvas.height = height;
    }

    this.#isDraging = false;
    this.#emitter = mitt();

    this.currentTime = 0;
    
    const timeSpacingMap = [1, 10, 30, 60, 120, 300, 600];
    this.#timeSpacingMap = [];
    for (let i = minZoom - 1; i < maxZoom; i++) {
      this.#timeSpacingMap.push(timeSpacingMap[i]);
    }
    
    // this.#timeSpacing = 60; // 时间间距
    this.#timeSpacing = timeSpacingMap[zoom - 1];
    this.scaleSpacing = scaleSpacing; // 默认刻度间距7px
    

    // 刻度高度
    this.#scaleHeight = {
      height6: this.$canvas.height / 2, // 1/2高度
      height5: this.$canvas.height / 3, // 1/3高度
      height4: this.$canvas.height / 4, // 1/4高度
      height3: this.$canvas.height / 5, // 1/5高度
      height2: this.$canvas.height / 8, // 1/8高度
      height1: this.$canvas.height / 10, // 1/10高度
    }

    // canvas 背景颜色
    this.bgColor = bgColor;
    // 当前时间指针宽度
    this.pointWidth = pointWidth;
    // 当前指针颜色
    this.pointColor = pointColor;
    // 文字颜色
    this.textColor = textColor;
    // 刻度颜色
    this.scaleColor = scaleColor;
    // 阴影区颜色
    this.areaBgColor = areaBgColor;
    // fps
    this.fps = fps;
  }

  // 绘制时间轴
  draw ({currentTime, areas, _privateFlag}: DrawArgs = {}): void {
    // console.time('draw');
    // 拖拽中禁止外部调用,防止冲突
    if (this.#isDraging && !_privateFlag) {
      return;
    }
    
    // 获取参数
    this.currentTime = currentTime || Math.floor(0);
    this.areas = areas || [];

    // 当前屏可绘制刻度数量
    const screenScaleCount = Math.ceil(this.$canvas.width / this.scaleSpacing);
    // 当前屏显示秒数
    const screenSecondCount = screenScaleCount * this.#timeSpacing;

    // 开始时间
    const startTime = this.currentTime - screenSecondCount / 2;
    // 结束时间
    const endTime = this.currentTime + screenSecondCount / 2;

    // canvas X轴中心点（当前时间指示刻度）
    const xCenterPoint = this.$canvas.width / 2;

    // 每1px所占时间单位（秒）
    const timePerPixel = screenSecondCount / this.$canvas.width;


    // 清空画布及事件
    this.clear();

    // 填充背景
    this.drawArea(0, 0, this.$canvas.width, this.$canvas.height, this.bgColor);

    // 绘制阴影区域
    this.areas.forEach(item => {
      const startX = item.startTime < startTime ? 0 : Math.floor((item.startTime - startTime) / timePerPixel);
      const endX = item.endTime > endTime ? this.$canvas.width : Math.floor((item.endTime - startTime) / timePerPixel);
      this.drawArea(startX, 0, endX, this.$canvas.height, item.bgColor || this.areaBgColor);
    });

    // 绘制刻度
    drawHelper.bind(this)({
      pointWidth: this.pointWidth,
      timePerPixel,
      scaleHeight: this.#scaleHeight,
      scaleSpacing: this.scaleSpacing,
      timeSpacing: this.#timeSpacing,
      screenScaleCount,
      startTime,
      drawLine: this.drawLine.bind(this),
      drawText: this.drawText.bind(this),
    });

    // 绘制比例尺
    this.drawTimelineScale(this.#timeSpacing);

    // 绘制当前时间指针
    this.drawLine(xCenterPoint - this.pointWidth / 2, this.$canvas.height, this.pointWidth, this.pointColor);
    this.drawArea(xCenterPoint - 54, 4, xCenterPoint + 54, 18, this.pointColor);
    this.drawText(xCenterPoint, 6, `${dateTime(this.currentTime, 'HH:mm:ss')}`, this.textColor, 'center', 'top');

    // 鼠标滚轮事件
    this.$canvas.onwheel = this._onZoom.bind(this);
    // 拖拽事件
    this.$canvas.onmousedown = this._onDrag.bind(this);
    // console.timeEnd('draw');
  }
  
  // 拖拽
  private _onDrag({ clientX }: MouseEvent) {
    this.#isDraging = true;
    let prexOffset = 0;
    document.onmousemove = throttle((moveEvent) => {
      const curxOffset = moveEvent.clientX - clientX;
      let currentTime = this.currentTime - this.#timeSpacing / this.scaleSpacing * (curxOffset - prexOffset);
      currentTime = Math.max(currentTime,0);
      prexOffset = curxOffset;

      this.draw({
        currentTime: Math.round(currentTime),
        areas: this.areas,
        _privateFlag: true,
      });
    }, this.#timeSpacing === 1 ? 100 : 1000 / this.fps);

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      this.#isDraging = false;
      this.emit('timeUpdate', this.currentTime);
    };
  }
  // 缩放
  private _onZoom(e: WheelEvent) {
    e.preventDefault();
    const currentIndex = this.#timeSpacingMap.findIndex(item => item === this.#timeSpacing);
    if (e.deltaY < 0 && currentIndex > 0) {
      this.#timeSpacing = this.#timeSpacingMap[currentIndex - 1];
      this.draw({
        currentTime: this.currentTime,
        areas: this.areas,
        _privateFlag: true,
      });
    } else if (e.deltaY > 0 && currentIndex < this.#timeSpacingMap.length - 1) {
      this.#timeSpacing = this.#timeSpacingMap[currentIndex + 1];
      this.draw({
        currentTime: this.currentTime,
        areas: this.areas,
        _privateFlag: true,
      });
    }
  }

  // 父元素size变化
  private _onParentResize() {
    const $canvasParent = this.$canvas.parentNode as HTMLElement;
    if (!$canvasParent) {
      return;
    }
    this.$canvas.width = $canvasParent.clientWidth;
    this.$canvas.height = $canvasParent.clientHeight;
    // 刻度高度
    this.#scaleHeight = {
      height6: this.$canvas.height / 2, // 1/2高度
      height5: this.$canvas.height / 3, // 1/3高度
      height4: this.$canvas.height / 4, // 1/4高度
      height3: this.$canvas.height / 5, // 1/5高度
      height2: this.$canvas.height / 8, // 1/8高度
      height1: this.$canvas.height / 10, // 1/10高度
    }
    this.draw({
      currentTime: this.currentTime,
      areas: this.areas,
    });
  }

  // 清空画布
  private clear() {
    if(this.canvasContext) {
      this.canvasContext.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    }
    if (this.$canvas) {
      this.$canvas.onwheel = null;
      this.$canvas.onmousedown = null;
    }
  }
  // 绘制比例尺
  private drawTimelineScale(timespacing: number) {
    // [1, 10, 30, 60, 120, 300];
    let text = '';
    switch (timespacing) {
      case 1:
        text = '1s';
        break;
      case 10:
        text = '10s';
        break;
      case 30:
        text = '30s';
        break;
      case 60:
        text = '1min';
        break;
      case 120:
        text = '2min';
        break;
      case 300:
        text = '5min';
        break;
      case 600:
        text = '10min';
        break;
      default:
        break;
    }
    this.drawText(this.scaleSpacing + 12, 9, `${text}`, this.textColor, 'left', 'middle');

    this.canvasContext.beginPath();
    this.canvasContext.moveTo(5, 6);
    this.canvasContext.lineTo(5, 10);
    this.canvasContext.lineTo(this.scaleSpacing + 7, 10);
    this.canvasContext.lineTo(this.scaleSpacing + 7, 6);
    this.canvasContext.strokeStyle = this.scaleColor;
    this.canvasContext.lineWidth = 1.5;
    this.canvasContext.stroke();
  }

  // 绘制线条
  private drawLine(x: number, y: number, width: number = 1, color: string = this.scaleColor): void {
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(x, this.$canvas.height);
    this.canvasContext.lineTo(x, this.$canvas.height - y);
    this.canvasContext.closePath();
    this.canvasContext.strokeStyle = color;
    this.canvasContext.lineWidth = width;
    this.canvasContext.stroke();
  }

  // 绘制文字
  private drawText(x: number, y: number, text: string, color: string = this.textColor, align: CanvasTextAlign = 'center', baseLine: CanvasTextBaseline ='alphabetic'): void {
    this.canvasContext.beginPath();
    this.canvasContext.font = '11px Arial';
    this.canvasContext.fillStyle = color;
    this.canvasContext.textAlign = align;
    this.canvasContext.textBaseline = baseLine;
    this.canvasContext.fillText(text, x, y);
  }

  // 绘制区域
  private drawArea(startX: number, startY: number, endX: number, endY: number, bgColor: string) {
    this.canvasContext.beginPath();
    this.canvasContext.rect(startX, startY, endX - startX, endY - startY);
    this.canvasContext.fillStyle = bgColor;
    this.canvasContext.fill();
  }
  
  on(name: 'timeUpdate', listener: Function) {
		this.#emitter.on(name, listener);
	}

  off(name: 'timeUpdate', listener: Function) {
		this.#emitter.off(name, listener);
	}

	private emit(...args: unknown[]) {
		this.#emitter.emit(...args);
	}
}


export default TimeLine
