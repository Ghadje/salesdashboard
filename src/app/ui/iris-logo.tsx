import Image from 'next/image';

export default function IrisLogo() {
  return (
    <div
      className='flex flex-row items-center leading-none text-white'
    >
      <Image
        src="/iris-logo-white.svg"
        width={250}
        height={100}
        className="hidden md:block"
        alt="Iris logo"
      />
       <Image
        src="/iris-logo-white.svg"
        width={100}
        height={50}
        className="block md:hidden"
        alt="Iris logo mobile"
      />
    </div>
  );
}
