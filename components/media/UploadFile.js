import React, { useContext } from "react";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { AuthContext } from "../../context/auth";
import { MediaContext } from "../../context/media";
import { useRouter } from "next/router";

const UploadFile = ({ redirectToLibrary = false, page = "admin" }) => {
  // hooks
  const router = useRouter();
  // state
  const [auth, setAuth] = useContext(AuthContext);
  const [media, setMedia] = useContext(MediaContext);

  const props = {
    name: "file",
    action: `${process.env.NEXT_PUBLIC_API}/upload-image-file`,
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        //   console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        // console.log("############ UPLOADED ============> ", info.file.response);
        if (redirectToLibrary) {
          setMedia({
            images: [info.file.response, ...media.images],
            selected: info.file.response,
            showMediaModal: false,
          });
          router.push(`/${page}/media/library`);
        } else {
          setMedia({
            images: [info.file.response, ...media.images],
            selected: info.file.response,
            showMediaModal: false,
          });
        }

        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <Upload {...props} maxCount={1} accept="image/*">
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default UploadFile;
