import styled from "@emotion/styled";
import { FC } from "react";
import { Colors, TextSizes } from "@/types/theme";

interface ITypographyProps {
    text: string,
    color: Colors,
    textSize: TextSizes,
    bold?: boolean,
}

const Typography: FC<ITypographyProps> = ({ text, bold, color, textSize }) => {
    return <Text color={color} size={textSize} bold={bold}>{text}</Text>
}

export default Typography;

interface TextProps {
    color: Colors;
    size: TextSizes;
    bold?: boolean;
}

const getTextColor = (color: string) => {
    switch(color) {
        case "purple":
            return "#3D3DC1";
        case "purple_light":
            return "#6666D9";
        case "purple_light2":
            return "#988FFF";
        case "red":
            return "#D94C4C";
        case "red_light":
            return "#FF7373";
        case "green":
            return "#5BB380";
        case "mint_green":
            return "#80E3A1";
        case "olive_green": 
            return "#659459";
        case "olive_green_light":
            return "#85BF73";
        case "yellow":
            return "#D98E32";
        case "yellow_light":
            return "#FFC073";
        case "grey":
            return "#C9CACA";
        case "grey_light":
            return "#EFEFEF";
        case "black": 
            return "#000000";
        case "white":
            return "#FFFFFF";
        default:
            return null;
    }
}

const getTextSize = (size: TextSizes) => {
    switch(size) {
        case "xs":
            return "1rem";
        case "sm":
            return "1.2rem";
        case "md":
            return "1.4rem";
        case "lg":
            return "1.6rem";
        case "xl":
            return "1.8rem";
        case "xxl":
            return "2rem";
        case "xxxl": 
            return "2.4rem";
        default:
            return null;
    } 
}

const Text = styled.p<TextProps>`
    color: ${({ color }) => getTextColor(color)};
    font-size: ${({ size }) => getTextSize(size)};
    font-weight: ${({ bold }) => (bold?'bold':'')};
`;