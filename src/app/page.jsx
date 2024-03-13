import { Banner } from "@/components/Banner"
import bgImg from "@/assets/images/img-banner.jpg"

import { CardHorizontal } from "@/components/CardHorizontal"

const HomePage = () => {
  return (
    <section className='min-h-[calc(100vh-56px)] pt-[80px]'>
      <div className='h-full flex justify-center items-center flex-col'>
        <Banner
        bgImg={bgImg}
        title="New king resort"
        text="¡Haz que la magia dure día y noche!"
        bVisible={true}
        bText={"Login"}
        bLink={"/auth/login"}
        />
        <CardHorizontal />
      </div>
    </section>
  )
}

export default HomePage