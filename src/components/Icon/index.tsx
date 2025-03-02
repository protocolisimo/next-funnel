import Image from 'next/image'
import ICONS from '@/components/icons'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/index'

export type IconPropsType = { iconName: keyof typeof ICONS, size?: { width: number, height: number } }

function Icon ({ iconName, size = { width: 24, height: 24 } }: IconPropsType) {
    const theme = 'black' // get the theme from the store



    const theme2 = useSelector((state: RootState) => state.theme.mode);
    
    console.log({theme2})

    
    return (
        <Image
            src={ICONS?.[theme2]?.[iconName]} // fix the types here
            alt={iconName}
            color='white'
            {...size}
        />
    )
}

export default Icon