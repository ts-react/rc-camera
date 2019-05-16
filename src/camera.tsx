import React from 'react';
import classNames from 'classnames';
import './camera.less';

export interface ICameraProps {
  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties;
  onPhotograph: (image: string) => void;
}

const Camera: React.FC<ICameraProps> = (props) => {
  const {
    prefixCls,
    className,
    style,
    onPhotograph
  } = props;
  const containerEl = React.useRef(null);
  const videoEl = React.useRef(null);
  const canvasEl = React.useRef(null);
  const [width, setWidth] = React.useState<number>(0);
  const [height, setHeight] = React.useState<number>(0);

  React.useEffect(() => {
    const container: HTMLElement = containerEl.current;

    if (container) {
      setWidth(container.offsetWidth);
      setHeight(container.offsetHeight);
    }

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
    console.log(image);
    onPhotograph && onPhotograph(image);
  };

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
    >
      <div
        ref={containerEl}
        className={`${prefixCls}__container`}
      >
        <video
          height={height}
          width={width}
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
  prefixCls: 'rc-camera'
};

export default Camera;
