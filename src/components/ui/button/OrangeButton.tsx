'use client';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type OrangeBtnProps = {
  label: string;
} & ComponentProps<'button'>;

const OrangeButton = ({ label, ...props }: OrangeBtnProps) => {
  // console.log(label);
  const style = twMerge(
    'bg-orange drop-shadow-md hover:saturate-150 active:drop-shadow-none active:shadow-inner hover:bg-depp-orange active:bg-depp-orange active:translate-y-0.5 text-white rounded-xl p-2 w-40 h-auto text-lg',
    props.className
  );
  return (
    <div>
      <button {...props} className={style}>
        {label}
      </button>
    </div>
  );
};

export default OrangeButton;
