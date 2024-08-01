import NavbarLanding from "./_components/NavbarLanding"

const LandingLayout = async ({children}) => {


  return (
    <>
      <NavbarLanding />
      <main className=" pt-[80px] h-full">
        {children}
      </main>
  </>
  )
}

export default LandingLayout