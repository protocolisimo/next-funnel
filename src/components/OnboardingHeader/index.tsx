import styles from './onboardingHeader.module.css';
import Icon from '../Icon';

export type OnboardingHeaderPropsType = { onBackClickHandler: () => void };

const OnboardingHeader = ({ onBackClickHandler }: OnboardingHeaderPropsType) => {
    return (
        <header>
            <div className={styles.headerBox}>
                {onBackClickHandler && (
                    <div className={styles.backButtonBox}>
                        <button onClick={onBackClickHandler} className={styles.backButton}>
                            <Icon iconName="back" />
                        </button>
                    </div>
                )}
                <Icon iconName="logo" />
            </div>
        </header>
    );
};

export default OnboardingHeader;
