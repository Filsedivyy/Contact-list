interface ErrorPageProps {}

const ErrorPage: React.FC<ErrorPageProps> = () => {
  console.log("error");
  return (
    <div className="w-full flex items-center flex-col  pt-[100px]">
      <h1 className="text-[25px] text-[#5DD661] font-bold">Error</h1>
      <p>Kontakt buďto neexistuje, nebo je zadaná špatná URL</p>
    </div>
  );
};
export default ErrorPage;
