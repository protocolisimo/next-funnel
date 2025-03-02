import Option from '@/components/Option';
import styles from './optionBox.module.css';

export type OptionBoxProps = {
    optionList: string[]; // add specific type
    changeListChandler: (option: string[]) => void;
    pageType: string;
    values: string[];
};

const OptionBox = ({ optionList, changeListChandler, pageType, values }: OptionBoxProps) => {
    const handleChange = (data: string) => {
        if (pageType === 'single_choice') {
            changeListChandler?.([data]);
        } else {
            if (Array.isArray(values) && values?.includes(data)) {
                changeListChandler(values?.filter((i) => i !== data));
            } else {
                changeListChandler([...values, data]);
            }
        }
    };

    const getIsSelected = (value: string) => {
        if (values && Array.isArray(values)) {
            return values.includes(value);
        } else {
            return values === value;
        }
    };

    return (
        <ul className={styles.container}>
            {optionList?.map((option, index) => (
                <li key={index}>
                    <Option active={getIsSelected(option)} onClickHandler={() => handleChange(option)} title={option} />
                </li>
            ))}
        </ul>
    );
};

export default OptionBox;
