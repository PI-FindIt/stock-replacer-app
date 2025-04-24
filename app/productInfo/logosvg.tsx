import { View } from "react-native";
import A from "../../assets/images/nutriscore/A.svg";
import B from "../../assets/images/nutriscore/B.svg";
import C from "../../assets/images/nutriscore/C.svg";
import D from "../../assets/images/nutriscore/D.svg";
import E from "../../assets/images/nutriscore/E.svg";
import { Nutriscore } from "@/types/enum/Nutriscore";

type SVGComponent = React.FC<React.SVGProps<SVGSVGElement>>;

const logos: Record<Nutriscore, SVGComponent> = {
  [Nutriscore.A]: A as SVGComponent,
  [Nutriscore.B]: B as SVGComponent,
  [Nutriscore.C]: C as SVGComponent,
  [Nutriscore.D]: D as SVGComponent,
  [Nutriscore.E]: E as SVGComponent,
};

interface LogoSVGProps {
  name: Nutriscore;
  width?: number;
  height?: number;
}

export const LogoSVG = ({ name, width = 24, height = 24 }: LogoSVGProps) => {
  const SvgComponent = logos[name];
  if (!SvgComponent) {
    return <View />;
  }
  return (
    <View>
      <SvgComponent width={width} height={height} />
    </View>
  );
};

export default logos;
