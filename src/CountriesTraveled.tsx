const CountriesTraveled: React.FC = () => {
  return (
    <div>
      <img src={localStorage.getItem("imageFile")!} alt="" />
    </div>
  );
};

export default CountriesTraveled;
