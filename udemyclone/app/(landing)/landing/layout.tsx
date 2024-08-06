import NavbarLanding from "./_components/NavbarLanding"

const LandingLayout = async ({children}:{children: React.ReactNode}) => {


  return (
    <>
      <NavbarLanding />
      <main className=" pt-[80px] h-full overflow-x-hidden ">
        {children}
      </main>
  </>
  )
}

export default LandingLayout