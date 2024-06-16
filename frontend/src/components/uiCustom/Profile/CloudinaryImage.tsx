// cloudinaryConfig.js
import { Cloudinary } from "@cloudinary/url-gen";
import {fill} from "@cloudinary/url-gen/actions/resize";
const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUD_NAME
  },
  url: {
    secure: true // force https, set to false to force http
  }
});
interface CloudinaryImageProps {
  publicId: string;
  width?: number;
  height?: number;
  className?:string
  [key: string]: any; // Allow any other props for img tag
}
export const CloudinaryImage = (props:CloudinaryImageProps) => {
  // Create a Cloudinary image instance
  const myImage = cld.image(props.publicId)
  const src = myImage.resize(fill().width(props.width||24).height(props.height||24)).toURL()
 

  return (
    <>
      {/* <AdvancedImage cldImg={myImage} /> */}
      <img className={props.className|| "rounded-full"} alt="models" src={src}  />
    </>
  );
};


