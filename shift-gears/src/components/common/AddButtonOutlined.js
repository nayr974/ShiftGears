import { Space } from "antd";
import PropTypes from "app/prop-types";
import styles from "./AddButtonOutlined.module.css";
import { PlusCircleOutlined } from "@ant-design/icons";

const propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

const defaultProps = {
  label: "Add",
};

const AddButtonOutlined = (props) => (
  <div className={styles.add} onClick={props.onClick}>
    <Space>
      <PlusCircleOutlined />
      {props.label}
    </Space>
  </div>
);

AddButtonOutlined.propTypes = propTypes;
AddButtonOutlined.defaultProps = defaultProps;

export default AddButtonOutlined;
