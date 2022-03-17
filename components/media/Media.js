import { useContext } from "react";
import { Tabs } from "antd";
import UploadFile from "./UploadFile";
import MediaLibrary from "./MediaLibrary";

const { TabPane } = Tabs;

const Media = () => {
  return (
    <>
      <Tabs type="card">
        <TabPane tab="Upload Files" key="1">
          <UploadFile />
        </TabPane>
        <TabPane tab="Media Library" key="2">
          <MediaLibrary />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Media;
