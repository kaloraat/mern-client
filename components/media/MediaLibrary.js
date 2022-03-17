import React, { useContext, useEffect, useState } from "react";
import { Upload, message, Image, Badge } from "antd";
import { InboxOutlined, CloseCircleFilled } from "@ant-design/icons";
import { AuthContext } from "../../context/auth";
import { MediaContext } from "../../context/media";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const { Dragger } = Upload;

const MediaLibrary = ({ page = "admin" }) => {
  // context
  const [auth, setAuth] = useContext(AuthContext);
  const [media, setMedia] = useContext(MediaContext);
  const [showPreview, setShowPreview] = useState(false); // to show image preview on click or not
  // hooks
  const router = useRouter();
  console.log("router in media library => ", router);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const { data } = await axios.get("/media");
        // console.log(data);
        setMedia((prev) => ({ ...prev, images: data }));
      } catch (err) {
        console.log(err);
      }
    };
    // execute
    fetchMedia();
  }, []);

  const props = {
    name: "file",
    multiple: true,
    action: `${process.env.NEXT_PUBLIC_API}/upload-image-file`,
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status === "done") {
        // console.log("############ ============> ", info.file.response);
        setMedia({
          images: [info.file.response, ...media.images],
          showMediaModal: true,
          // selected: info.file.response,
        });
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleImageDelete = async (imageId) => {
    try {
      const { data } = await axios.delete(`/media/${imageId}`);
      console.log(data);
      if (data.ok) {
        setMedia((prev) => ({
          ...prev,
          images: prev.images.filter((image) => image._id !== imageId),
          selected: null,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Dragger {...props} accept="image/*">
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
      </Dragger>

      <div style={{ textAlign: "center" }}>
        {media?.images?.map((image) => (
          <Badge>
            <Image
              preview={showPreview}
              onClick={() => {
                // if user is on '/admin/media/library' page, show preview
                if (router.pathname === "/admin/media/library") {
                  setShowPreview(true);
                } else {
                  // else set media and set as selected
                  setMedia({ ...media, selected: image });
                  toast.success("Selected");
                }
              }}
              style={{
                paddingTop: 5,
                paddingRight: 10,
                height: "100px",
                width: "100px",
                objectFit: "cover",
              }}
              src={image.url}
            />
            <br />
            {page === "author" && image.postedBy?._id === auth.user?._id ? (
              <CloseCircleFilled
                style={{ marginRight: 10, color: "#f5222d" }}
                onClick={() => handleImageDelete(image._id)}
              />
            ) : page === "admin" ? (
              <CloseCircleFilled
                style={{ marginRight: 10, color: "#f5222d" }}
                onClick={() => handleImageDelete(image._id)}
              />
            ) : (
              ""
            )}
          </Badge>
        ))}
      </div>
    </>
  );
};

export default MediaLibrary;
