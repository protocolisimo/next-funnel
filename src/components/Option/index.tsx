import Text from "@/components/Text"
import styles from './option.module.css'
import classNames from "classnames/bind"

type OptionProps = { title: string, onClickHandler: () => void, active?: boolean }

const cx = classNames.bind(styles);

const Option = ({ title, onClickHandler, active }: OptionProps) => {
    return (
        <button onClick={onClickHandler} className={cx('container', {active})}>
            <div className={styles.optionsContentWrapper}>
                <Text modificator={active ? ['alternate'] : undefined} type="optionText">{title}</Text>
            </div>
        </button>
    )
}

export default Option