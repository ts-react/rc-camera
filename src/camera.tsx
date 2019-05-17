import React from 'react';
import classNames from 'classnames';
import { playClickAudio } from './utils/utils';
import './camera.less';

export interface ICameraProps {
  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties;
  videoWidth?: number;
  onPhotograph: (image: string) => void;
}

const Camera: React.FC<ICameraProps> = (props) => {
  const {
    prefixCls,
    className,
    style,
    videoWidth,
    onPhotograph
  } = props;
  const videoEl = React.useRef(null);
  const canvasEl = React.useRef(null);
  const [width, setWidth] = React.useState<number>(0);
  const [height, setHeight] = React.useState<number>(0);

  React.useEffect(() => {
    if (navigator.getUserMedia) {
      navigator.getUserMedia({
        audio: false,
        video: true
      }, (stream) => {
        const video: HTMLVideoElement = videoEl.current;
        video.srcObject = stream;
        video.play();
      }, (error) => {
        console.log(error);
      })
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const video: HTMLVideoElement = videoEl.current;
    const canvas: HTMLCanvasElement = canvasEl.current;
    // 处理为图片
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, width, height);
    // 获取图片base64
    const image = canvas.toDataURL('image/jpeg');
    // 播放拍照音频
    playClickAudio();
    onPhotograph && onPhotograph(image);
  };

  // 获取Video标签宽高
  const handleLoadedMetadata = () => {
    const video: HTMLVideoElement = videoEl.current;

    if (video) {
      setWidth(video.offsetWidth);
      setHeight(video.offsetHeight);
    }
  };

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={{
        ...style,
        width: videoWidth
      }}
    >
      <div
        className={`${prefixCls}__container`}
        style={{
          width,
          height
        }}
      >
        <video
          width={videoWidth}
          onLoadedMetadata={handleLoadedMetadata}
          ref={videoEl}
        />
        <canvas
          height={height}
          width={width}
          ref={canvasEl}
        />
      </div>
      <div className={`${prefixCls}__operation`}>
        <button onClick={handleClick} />
      </div>
    </div>
  )
};

Camera.defaultProps = {
  prefixCls: 'rc-camera',
  videoWidth: 700
};

export default Camera;
