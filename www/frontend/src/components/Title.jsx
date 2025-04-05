const Title = ({ text1, text2,lenght }) => {
  return (
    <div className="mb-6">
      <p className="text-3xl  font-lyon font-light text-gray-800">
        {text1} <span className="font-medium font-sans">{text2}{" "}({lenght})</span>
      </p>
    </div>
  );
};

export default Title;
