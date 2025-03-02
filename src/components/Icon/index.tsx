import Image from 'next/image';
import ICONS from '@/components/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';

export type IconPropsType = { iconName: keyof typeof ICONS['black']; size?: { width: number; height: number } };

function Icon({ iconName, size = { width: 24, height: 24 } }: IconPropsType) {
    const theme = useSelector((state: RootState) => state.theme.mode);

    return (
        <Image
            src={ICONS?.[theme]?.[iconName]} // fix the types here
            alt={iconName}
            color="white"
            {...size}
        />
    );
}

export default Icon;
