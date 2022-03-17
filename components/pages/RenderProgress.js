import { Progress } from "antd";
import CountTo from "react-count-to";
import Link from "next/link";

const RenderProgress = ({ number, name, link = "#" }) => (
  <Link href={link}>
    <a>
      <Progress
        type="circle"
        strokeColor={{
          "0%": "#666",
          "50%": "#fff",
          "100%": "#111",
        }}
        percent={100}
        format={() => <CountTo to={number} speed={number * 100} />}
      />
      <p style={{ marginTop: 18, color: "#666" }}> {name.toUpperCase()}</p>
    </a>
  </Link>
);

export default RenderProgress;
