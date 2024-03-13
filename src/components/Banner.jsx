
export const Banner = ({bgImg, title='title', text='text', bVisible=false, bText='bText', bLink='#'}) => {
  return (
    <section 
        className="w-full h-[640px] lg:h-[480px] bg-center bg-cover bg-no-repeat text-center"
        style={{ backgroundImage: `url('${bgImg.src}')` }}
      >
        <div className="w-full h-[640px] lg:h-[480px]" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <div className="flex h-full items-center justify-center">
            <div className="text-white mx-[20px] lg:mx-[200px]">
              <h1 className="mb-4 text-[25px] sm:text-[50px] uppercase">{ title }</h1>
              <p className="mb-6 text-[15px] sm:text-[30px]">{ text }</p>
              <a
                className={`
                ${ bVisible ? '' : 'hidden' }
                text-[14px] uppercase 
                border border-white text-white font-semibold rounded-md
                hover:bg-white hover:text-black
                focus:bg-white focus:text-primary focus:outline-none
                transition duration-150 ease-in-out
                px-7 pb-[8px] pt-[10px]
                `}
                href={bLink}
                data-te-ripple-init
                data-te-ripple-color="light">
                {bText}
              </a>
            </div>
          </div>
        </div>
      </section>
  )
}
