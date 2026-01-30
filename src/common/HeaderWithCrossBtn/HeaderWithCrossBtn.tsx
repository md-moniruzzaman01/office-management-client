import { icons } from '../../shared/libs/Icons';
import Button from '../Button';
import { HeaderWithCrossBtnProps } from './type';

const HeaderWithCrossBtn: React.FC<HeaderWithCrossBtnProps> = ({ name }) => {
  const previous = () => {
    window.history.back();
  };

  return (
    <div>
      <div className="flex w-full">
        <Button
          sizeClass="text-2xl text-shadeOfOrange"
          onClick={previous}
          transparent
        >
          {icons.back}
        </Button>
        <h1 className="font-medium text-2xl text-center w-full text-shadeOfGray dark:text-shadeOfOrange ">
          {name}
        </h1>
      </div>
      <hr className="border-b bg-borderColor mt-3 " />
    </div>
  );
};

export default HeaderWithCrossBtn;
