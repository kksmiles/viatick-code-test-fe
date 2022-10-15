import { useParams } from "react-router-dom";

export default function Show() {
  const { deviceSlug } = useParams();
  console.log(deviceSlug);
  return <div>Show device {deviceSlug}</div>;
}
