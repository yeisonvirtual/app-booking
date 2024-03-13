import bgImg from "@/assets/images/img-banner.jpg"
import imgOwner from "@/assets/images/owner.jpg"

export const CardHorizontal = () => {
  return (
    <div className="max-w-sm w-full md:max-w-full px-[10px] md:px-[80px] md:flex md:justify-center my-[20px]">
      <div 
      className="h-48 md:h-auto md:w-48 flex-none bg-cover rounded-t md:rounded-t-none md:rounded-l text-center overflow-hidden"
      style={{ backgroundImage: `url('${bgImg.src}')` }}
      title="Woman holding a mug">
      </div>
      <div className="border-r border-b border-l border-gray-400 md:border-l-0 md:border-t md:border-gray-400 bg-white rounded-b md:rounded-b-none md:rounded-r p-[30px] flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">Somos tu mejor opción</div>
          <p className="text-gray-700 text-base">Vive una estancia propia de un cuento de hadas en el New King Resort, la residencia de 5 estrellas por excelencia, situada a la entrada de la ciudad de Lecheria.</p>
        </div>
        <div className="flex items-center">
          <a href="https://github.com/yeisonvirtual" className="flex items-center">
            <img className="w-10 h-10 rounded-full mr-4" src={imgOwner.src} alt="Avatar of Jonathan Reinink" />
            <div className="text-sm">
              <p className="text-gray-900 leading-none">Yeison Rojas</p>
              <p className="text-gray-600">13/03/2024</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
