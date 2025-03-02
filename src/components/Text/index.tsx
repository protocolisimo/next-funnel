import classNames from "classnames/bind";
import styles from "./text.module.css";

type TextTypes = 'title' | 'subtitle' | 'buttonText' | "optionText";
type ModificatorType = 'bold' | 'italic' | 'underline' | 'alternate';

type TextProps = {
    children: React.ReactNode;
    as?: keyof React.JSX.IntrinsicElements;
    type?: TextTypes;
    modificator?: ModificatorType[];
    mb?: number;
}

const cx = classNames.bind(styles);
const Text = ({ as: Tag = "p", children, type, modificator }: TextProps) => {
    return <Tag className={cx('base',[type], modificator)}>{children}</Tag>
}

export default Text
